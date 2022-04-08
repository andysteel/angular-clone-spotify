import { Component, OnInit } from '@angular/core';
import { IMusica } from 'src/app/interfaces/IMusica';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  musicas: IMusica[] = [];
  playIcone = faPlay;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.obterMusicas()
  }

  async obterMusicas() {
    const musicas = await this.spotifyService.buscarMusicas();
    this.musicas = musicas;
    console.log(this.musicas);
  }

  obterArtista(musica: IMusica) {
    return musica.artistas.map(a => a.nome).join(', ');
  }

  async executarMusica(musica: IMusica) {
    this.spotifyService.executarMusica(musica.id);
  }
}
