import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  obterPaginaDeLogin() {
    window.location.href = this.spotifyService.obterUrlLogin();
  }

  verificarTokenUrlCallback() {
    const token = this.spotifyService.obterTokenUrlCallBack();
    if(token) {
      this.spotifyService.definirAccessToken(token);
    }
  }
}
