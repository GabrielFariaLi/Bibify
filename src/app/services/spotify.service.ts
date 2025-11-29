import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../Interfaces/IUsuario';
import {
  SpotifyArtistaParaArtista,
  SpotifyPlaylistparaPlaylist,
  SpotifyTrackParaMusica,
  SpotifyUserParaUsuario,
} from '../Common/spotifyHelper';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtista } from '../Interfaces/IArtista';
import { IMusica } from '../Interfaces/IMusica';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs | undefined;
  usuario: IUsuario | undefined;

  constructor(private router: Router) {
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
    const clientSecret = `client_secret=${SpotifyConfiguration.clientSecret}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=code&show_dialog=true`;
    return (
      authEndPoint +
      clientId +
      clientSecret +
      redirectUrl +
      scopes +
      responseType
    );
  }
  //login efetuado com sucesso agora usaremos o token gerado pelo spotify
  obterTokenUrlCallBack() {
    const search = window.location.search;
    if (!search) {
      return '';
    }

    const params = new URLSearchParams(search);
    console.log(
      '🚀 ~ SpotifyService ~ obterTokenUrlCallBack ~ params:',
      params
    );
    console.log(
      '🚀 ~ SpotifyService ~ obterTokenUrlCallBack ~ params:',
      params.get('code')
    );

    return params.get('code') ?? '';
  }

  definirAcessToken(token: string) {
    this.spotifyApi?.setAccessToken(token);
    const testeToken = this.spotifyApi?.getAccessToken();
    console.log('chegamos no token', token);
    console.log('chegamos no testeToken', testeToken);
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

  async buscarTopArtistas(limit = 10): Promise<IArtista[] | undefined> {
    const artistas = await this.spotifyApi?.getMyTopArtists({ limit: limit });
    console.log(artistas);
    return artistas?.items.map((x) => SpotifyArtistaParaArtista(x));
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[] | undefined> {
    const musicas = await this.spotifyApi?.getMySavedTracks({
      offset: offset,
      limit: limit,
    });
    /*     console.log(musicas?.items.map((x) => SpotifyTrackParaMusica(x.track)));
     */ return musicas?.items.map((x) => SpotifyTrackParaMusica(x.track));
  }

  async executarMusica(musicaId: string | undefined) {
    musicaId !== undefined && (await this.spotifyApi?.queue(musicaId));
    await this.spotifyApi?.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusica | undefined> {
    const musicaSpotify = await this.spotifyApi?.getMyCurrentPlayingTrack();
    if (musicaSpotify?.item !== undefined && musicaSpotify?.item !== null)
      return SpotifyTrackParaMusica(musicaSpotify.item);
    else return;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
