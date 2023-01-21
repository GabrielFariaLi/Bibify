import { IPlaylist } from '../Interfaces/IPlaylist';
import { IUsuario } from '../Interfaces/IUsuario';

export function SpotifyUserParaUsuario(
  user: SpotifyApi.CurrentUsersProfileResponse | undefined
): IUsuario {
  return {
    id: user?.id,
    nome: user?.display_name,
    imagemUrl: user?.images?.pop()?.url,
  };
}

export function SpotifyPlaylistparaPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified | undefined
): IPlaylist {
  return {
    id: playlist?.id,
    nome: playlist?.name,
    imagemUrl: playlist?.images?.pop()?.url,
  };
}
