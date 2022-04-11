import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { newMusica } from '../common/util.factory';
import { IMusica } from '../interfaces/IMusica';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicaAtual = new BehaviorSubject<IMusica>(newMusica());
  time: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual();
  }

  async obterMusicaAtual() {
    clearTimeout(this.time);

    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(musica);

    this.time = setInterval(async () => {
      await this.obterMusicaAtual();
    }, 5000);
  }

  definirMusicaAtual(musica: IMusica) {
    this.musicaAtual.next(musica);
  }

  async voltarMusica(){
    await this.spotifyService.voltarMusica();
  }

  async proximaMusica() {
    await this.spotifyService.proximaMusica();
  }

  async pausaMusica() {
    await this.spotifyService.pausaMusica();
  }

  async tocaMusica() {
    await this.spotifyService.tocaMusica();
  }
}
