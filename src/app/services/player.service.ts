import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IMusica } from '../Interfaces/IMusica';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  // subject é um objeto que se inscreve(subscrive) a um outro objeto e a cada alteração que esse objeto sofrer alteração uma ação vai ser executada
  // faremos isso para ouvir em todos os componentes quando a musica é tocada
  musicaAtual = new BehaviorSubject<IMusica>({
    id: 'string',
    titulo: 'string',

    album: {
      id: 'string',
      nome: 'string',
      imagemUrl: 'string',
    },
    tempo: 'string',
  });

  timerId: any = null;
  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual();
  }

  async obterMusicaAtual() {
    clearTimeout(this.timerId);
    const musica = await this.spotifyService.obterMusicaAtual();
    if (musica !== undefined) {
      this.definirMusicaAtual(musica);
      this.timerId = setInterval(async () => {
        await this.obterMusicaAtual();
      }, 3000);
    }
  }

  definirMusicaAtual(musica: IMusica) {
    this.musicaAtual.next(musica);
  }
}
