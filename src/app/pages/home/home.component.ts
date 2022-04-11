import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusica } from 'src/app/interfaces/IMusica';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';
import { newMusica } from 'src/app/common/util.factory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  musicas: IMusica[] = [];
  playIcone = faPlay;
  musicaAtual: IMusica = newMusica();
  subs: Subscription[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async obterMusicas() {
    const musicas = await this.spotifyService.buscarMusicas();
    this.musicas = musicas;
  }

  obterArtista(musica: IMusica) {
    return musica.artistas.map(a => a.nome).join(', ');
  }

  async executarMusica(musica: IMusica) {
    this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    })

    this.subs.push(sub);
  }
}
