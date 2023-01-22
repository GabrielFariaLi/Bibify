import { addMilliseconds, format } from 'date-fns';
import { IArtista } from '../Interfaces/IArtista';
import { IMusica } from '../Interfaces/IMusica';
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

export function SpotifyArtistaParaArtista(
  artista: SpotifyApi.ArtistObjectFull
): IArtista {
  return {
    id: artista.id,
    imagemUrl: artista.images
      ?.sort((a, b) =>
        a.width !== undefined && b.width !== undefined ? a.width - b.width : 0
      )
      ?.pop()?.url,
    nome: artista.name,
  };
}

export function SpotifyTrackParaMusica(
  track: SpotifyApi.TrackObjectFull
): IMusica {
  if (!track)
    return {
      id: 'string',
      titulo: 'string',

      album: {
        id: 'string',
        nome: 'string',
        imagemUrl: 'string',
      },
      tempo: 'string',
    };
  const msParaMinutos = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  };
  return {
    id: track.uri,

    titulo: track.name,
    album: {
      id: track.id,
      imagemUrl: track.album.images.shift()?.url,
      nome: track.album.name,
    },
    artistas: track.artists.map((artista) => ({
      id: artista.id,
      nome: artista.name,
    })),
    tempo: msParaMinutos(track.duration_ms),
  };
}
