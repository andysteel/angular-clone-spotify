import { IArtista } from "../interfaces/IArtista";

export function newArtista(): IArtista {
  return {
    id: '',
    nome: '',
    imagemUrl: ''
  }
}
