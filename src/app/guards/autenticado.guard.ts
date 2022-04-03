import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanLoad {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService
    ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = sessionStorage.getItem('spotify-clone-token')

    if(!token) {
      return this.naoAutenticado();
    }
    return new Promise(async (res) => {
      const usuarioCriado = await this.spotifyService.inicializarUsuario();
      if(usuarioCriado) {
        res(true)
      } else {
        res(this.naoAutenticado())
      }
    })
  }

  naoAutenticado() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
