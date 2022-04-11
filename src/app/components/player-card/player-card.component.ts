import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/util.factory';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: IMusica = newMusica();
  subs: Subscription[] = [];
  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;
  playIcone = faPlay;
  pauseIcone = faPause;
  isTocando: boolean = false;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => sub.unsubscribe());
  }

  obterMusicaTocando() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      if(musica.id !== '') {
        this.isTocando = true;
      } else {
        this.isTocando = false;
      }
      this.musica = musica;
    })

    this.subs.push(sub);
  }

  obterNomeArtistas(): string {
    if(this.musica.artistas.length > 0) {
      return this.musica.artistas.map(artista => artista.nome).join("-")
    }
    return '';
  }

  voltarMusica(){
    this.playerService.voltarMusica();
  }

  proximaMusica(){
    this.playerService.proximaMusica();
  }

  async pausaMusica() {
    await this.playerService.pausaMusica();
    this.isTocando = false;
  }

  async tocaMusica() {
    await this.playerService.tocaMusica();
    this.isTocando = true;
  }
}
