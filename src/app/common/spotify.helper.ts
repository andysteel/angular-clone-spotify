import { IArtista } from "../interfaces/IArtista";
import { IMusica } from "../interfaces/IMusica";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IUsuario } from "../interfaces/IUsuario";
import { newMusica } from "./util.factory";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {

  return {
    id: user.id,
    nome: user.display_name,
    imagemUrl: user.images.pop().url
  }
}

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {

  return {
    id: playlist.id,
    nome: playlist.name,
    imageUrl: playlist.images.pop().url
  }
}

export function SpotifyArtistaParaArtista(artista: SpotifyApi.ArtistObjectFull): IArtista {

  return {
    id: artista.id,
    nome: artista.name,
    imagemUrl: artista.images.sort((a,b) => a.width - b.width).pop().url
  }
}

export function SpotifyMusicaParaMusica(musica: SpotifyApi.TrackObjectFull): IMusica {

  if(!musica) {
    return newMusica();
  }

  return {
    id: musica.uri,
    album: {
      id: musica.album.id,
      nome: musica.album.name,
      imagemUrl: musica.album.images.shift().url
    },
    artistas: musica.artists.map(a => ({id: a.id, nome: a.name})),
    tempo: millisToMinutesAndSeconds(musica.duration_ms),
    titulo: musica.name
  }
}

function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
}
