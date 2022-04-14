import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArtista } from 'src/app/interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {

  topAtistas: IArtista[] = [];
  subs: Subscription[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas() {
    const artistas = await  this.spotifyService.buscarTopArtistas(5);

    this.topAtistas = artistas;
  }

  irParaPlaylist(artistaId: string) {
    this.router.navigateByUrl(`player/lista/artista/${artistaId}`);
  }
}
