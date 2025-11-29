export const environment = {
  produtction: false,
};

export const SpotifyConfiguration = {
  clientId: '791a841385f34851a1b6649e8d208547',
  clientSecret: 'fbebc80f4432403c84c0349650f67994',
  authEndPoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'https://bibify.vercel.app/login/',
  scopes: [
    'user-read-currently-playing', // musica tocando agora.
    'user-read-recently-played', // ler musicas tocadas recentemente
    'user-read-playback-state', // ler estado do player do usuario
    'user-top-read', // top artistas e musicas do usuario
    'user-modify-playback-state', // alterar do player do usuario.
    'user-library-read', // ler biblioteca dos usuarios
    'playlist-read-private', // ler playlists privads
    'playlist-read-collaborative', // ler playlists colaborativas
  ],
};
