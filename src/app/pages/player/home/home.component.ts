import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IMusica } from 'src/app/Interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  musicas: IMusica[] | undefined = [];
  musicaAtual: IMusica | undefined;

  subs: Subscription[] | undefined;

  playIcone = faPlay;
  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub.unsubscribe());
  }

  async obterMusicas() {
    this.musicas = await this.spotifyService.buscarMusicas();
    console.log(this.musicas);
  }

  obterMusicaAtual() {
    //sempre que a variavel musicaAtual sofrer alteração a linha de codigo presente no subscribe sera executada
    // nesse caso sempre que a musicaAtual sofrer alteração alteramos nossa variavel para ser igual a nova musicaAtual
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musicaAtual = musica;
      //console.log('musica atuall', this.musicaAtual);
    });

    this.subs?.push(sub);
  }

  obterArtistas(musica: IMusica) {
    return musica.artistas?.map((artista) => artista.nome).join(',');
  }

  async executarMusica(musica: IMusica) {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }
}
