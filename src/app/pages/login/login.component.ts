import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private spotifyService: SpotifyService, private router: Router) {}
  ngOnInit(): void {
    this.veririficarTokenUrlCallback();
  }

  veririficarTokenUrlCallback() {
    const token = this.spotifyService.obterTokenUrlCallBack();
    if (!!token) {
      this.spotifyService.definirAcessToken(token);

      this.router.navigate(['/player/home']);
    }
  }
  abrirPaginaLogin() {
    window.location.href = this.spotifyService.obterUrlLogin();
  }
}
