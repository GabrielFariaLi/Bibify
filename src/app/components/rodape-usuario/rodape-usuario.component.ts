import { Component } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from 'src/app/Interfaces/IUsuario';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss'],
})
export class RodapeUsuarioComponent {
  sairIcone = faSignOut;
  usuario: IUsuario | undefined;

  constructor(private SpotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.usuario = this.SpotifyService.usuario;
  }

  logOut() {
    this.SpotifyService.logout();
  }
}
