import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/Interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss'],
})
export class PainelEsquerdoComponent implements OnInit {
  menuSelecionado: string | undefined = 'Home';

  playlists: IPlaylist[] | undefined = [];

  // icones
  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;
  playlistIcone = faMusic;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.buscarPlaylists();
  }

  botaoClick(botao: string | undefined) {
    this.menuSelecionado = botao;

    this.router.navigateByUrl(`/player/${botao?.toLowerCase()}`);
    console.log(`/player/${botao?.toLowerCase()}`);
  }

  async buscarPlaylists() {
    this.playlists = await this.spotifyService.buscarPlaylistUsuario();

    console.log('buscarPlaylists logs: Playlists aqui -> ', this.playlists);
  }
}
