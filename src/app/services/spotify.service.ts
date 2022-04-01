import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyUserParaUsuario } from '../common/spotify.helper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs;
  usuario: IUsuario;

  constructor() {
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
}
