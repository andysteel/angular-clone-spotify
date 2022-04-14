import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyArtistaParaArtista, SpotifyMusicaParaMusica, SpotifyPlaylistParaPlaylist, SpotifySingleArtistaParaArtista, SpotifySinglePlaylistParaPlaylist, SpotifyUserParaUsuario } from '../common/spotify.helper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtista } from '../interfaces/IArtista';
import { IMusica } from '../interfaces/IMusica';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs;
  usuario: IUsuario;

  constructor(
    private router: Router,
    private httpClient: HttpClient) {
    this.spotifyApi = new Spotify();
   }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientID}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return `${authEndpoint}${clientId}${redirectUrl}${scopes}${responseType}`;
  }

  obterTokenUrlCallBack() {
    if(!window.location.hash) {
      return '';
    }

    const params = window.location.hash.substring(1).split('&');

    return params[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    sessionStorage.setItem('spotify-clone-token', token);
  }

  async inicializarUsuario() {
    if(this.usuario) {
      return true;
    }

    const token = sessionStorage.getItem('spotify-clone-token');

    if(!token) {
      return false;
    }

    try {
      this.definirAccessToken(token);
      await this.obterUsuarioSpotify();

      return !!this.usuario;
    } catch (error) {
      return false;
    }
  }

  async obterUsuarioSpotify() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlist = await this.spotifyApi.getUserPlaylists(this.usuario.id, {offset, limit});

    return playlist.items.map(SpotifyPlaylistParaPlaylist)
  }

  async buscarTopArtistas(limit = 10): Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({limit})

    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]> {
    const musicas = await this.spotifyApi.getMyTopTracks({offset, limit});
    return musicas.items.map(SpotifyMusicaParaMusica);
  }

  async executarMusica(musicaId: string) {
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusica> {
    const musica = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyMusicaParaMusica(musica.item)
  }

  async voltarMusica(){
    await this.spotifyApi.skipToPrevious();
  }

  async proximaMusica() {
    await this.spotifyApi.skipToNext();
  }

  async pausaMusica() {
    await this.spotifyApi.pause();
  }

  async tocaMusica() {
    await this.spotifyApi.play();
  }

  async cadastrarPlayer() {
    await this.spotifyApi.transferMyPlayback([`${SpotifyConfiguration.clientID}`], {play: true});
  }

  async obterDispositivos() {
    const devices = await this.spotifyApi.getMyDevices();
    return devices;
  }

  async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if(!playlistSpotify) {
      return null;
    }

    const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify);

    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit })

    playlist.musicas = musicasSpotify.items.map(musica => SpotifyMusicaParaMusica(musica.track as SpotifyApi.TrackObjectFull));

    return playlist;
  }

  async buscarMusicasArtista(artistaId: string, offset = 0, limit = 50) {
    const artistaSpotify = await this.spotifyApi.getArtist(artistaId);

    if(!artistaSpotify) {
      return null;
    }

    const artista = SpotifySingleArtistaParaArtista(artistaSpotify);

    const musicasArtista = await lastValueFrom(this.httpClient.get<SpotifyApi.ArtistsTopTracksResponse>(`https://api.spotify.com/v1/artists/${artista.id}/top-tracks`, {
      headers: new HttpHeaders( {'Authorization': `Bearer ${sessionStorage.getItem('spotify-clone-token')}`})
      .set('Accept','application/json')
      .set('Content-Type', 'application/json'),
      params: new HttpParams().set('market', 'BR')
    }));

    artista.musicas =  musicasArtista.tracks.map(musica => SpotifyMusicaParaMusica(musica))

    return artista;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
