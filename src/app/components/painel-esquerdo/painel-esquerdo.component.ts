import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  menuSelecionado = 'Home';
  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;
  playListIcone = faMusic;
  playlists: IPlaylist[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.spotifyService.buscarPlaylistUsuario()
    .then(p => this.playlists = p);
  }

  botaoClick(descricao: string) {
    this.menuSelecionado = descricao;
    this.router.navigateByUrl(`player/${descricao.toLowerCase()}`);
  }

  irParaPlaylist(playlistId: string) {
    this.menuSelecionado = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`);
  }
}
