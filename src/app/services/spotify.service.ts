import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../Interfaces/IUsuario';
import {
  SpotifyPlaylistparaPlaylist,
  SpotifyUserParaUsuario,
} from '../Common/spotifyHelper';
import { IPlaylist } from '../Interfaces/IPlaylist';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs | undefined;
  usuario: IUsuario | undefined;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    //se tiver usuario ja inicializado
    if (!!this.usuario) return true;

    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      this.definirAcessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;
    } catch (error) {
      console.log('inicializarUsuario error', error);
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi?.getMe();
    console.log(userInfo);
    this.usuario = SpotifyUserParaUsuario(userInfo);
    console.log(this.usuario);
  }

  obterUrlLogin() {
    const authEndPoint = `${SpotifyConfiguration.authEndPoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }
  //login efetuado com sucesso agora usaremos o token gerado pelo spotify
  obterTokenUrlCallBack() {
    if (!window.location.hash) {
      return '';
    }
    const params = window.location.hash.substring(1).split('&');
    //console.log(params[0].split('=')[1]);
    return params[0].split('=')[1];
  }

  definirAcessToken(token: string) {
    this.spotifyApi?.setAccessToken(token);
    localStorage.setItem('token', token);
    //this.spotifyApi?.skipToNext();
  }

  async buscarPlaylistUsuario(
    offset = 0,
    limit = 50
  ): Promise<IPlaylist[] | undefined> {
    const playlists = await this.spotifyApi?.getUserPlaylists(
      this.usuario?.id,
      { offset: offset, limit: limit }
    );

    return playlists?.items?.map((x) => SpotifyPlaylistparaPlaylist(x));
  }
}
