import { IArtista } from "../interfaces/IArtista";
import { IMusica } from "../interfaces/IMusica";

export function newArtista(): IArtista {
  return {
    id: '',
    nome: '',
    imagemUrl: ''
  }
}

export function newMusica(): IMusica {
  return {
    id: '',
    album: {
      id: '',
      nome: '',
      imagemUrl: ''
    },
    artistas: [],
    tempo: '',
    titulo: ''
  }
}
