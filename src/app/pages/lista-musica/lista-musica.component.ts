import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TipoConsulta } from 'src/app/common/tipo-consulta.enum';
import { newMusica } from 'src/app/common/util.factory';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-lista-musica',
  templateUrl: './lista-musica.component.html',
  styleUrls: ['./lista-musica.component.scss']
})
export class ListaMusicaComponent implements OnInit, OnDestroy {

  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();

  bannerImagemUrl = '';
  bannerTexto = '';
  playIcone = faPlay;

  subs: Subscription[] = [];
  title = '';

  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
   this.subs.forEach(sub => sub.unsubscribe());
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => this.musicaAtual = musica);
    this.subs.push(sub);
  }

  obterMusicas() {
    const sub = this.activedRoute.paramMap
      .subscribe(async params =>{
        const tipo = params.get('tipo');
        const id = params.get('id');
        await this.obterDadosDaPagina(tipo, id);
      })

    this.subs.push(sub);
  }

  async obterDadosDaPagina(tipo: string, id: string) {
    if(TipoConsulta.ARTISTA === tipo) {
      await this.obterDadosArtista(id);
    } else {
      await this.obterDadosPlaylist(id);
    }
  }

  async obterDadosPlaylist(playlistId: string) {
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);

    this.definirDadosDaPagina(playlistMusicas.nome, playlistMusicas.imageUrl, playlistMusicas.musicas);
    this.title = `Playlist ${playlistMusicas.nome}`;
  }

  async obterDadosArtista(artistaId: string) {
    const artistaMusicas = await this.spotifyService.buscarMusicasArtista(artistaId);

    this.definirDadosDaPagina(artistaMusicas.nome, artistaMusicas.imagemUrl, artistaMusicas.musicas);
    this.title = artistaMusicas.nome;
  }

  definirDadosDaPagina(bannerTexto: string, bannerImage: string, musicas: IMusica[]) {
    this.bannerImagemUrl = bannerImage;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
  }

  obterArtista(musica: IMusica) {
    return musica.artistas.map(a => a.nome).join(', ');
  }

  async executarMusica(musica: IMusica) {
    this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }
}
