export const environment = {
  produtction: false,
};

export const SpotifyConfiguration = {
  clientId: '70dbbecb457042a58daa86167a083db9',
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
