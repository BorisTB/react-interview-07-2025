import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Playlist } from '@/lib/features/playlists/playlist';
import { Video } from '@/lib/features/videos/video';

export enum ApiTagTypes {
  VIDEO = 'Video',
  PLAYLIST = 'Playlist'
}

interface PlaylistData {
  playlist: { id: string; localized: { title: string } };
  playlistVideos: Array<{
    id: string;
    title: string;
    thumbnails: { medium: { url: string } };
    description: string;
  }>;
}

interface PlaylistResponse {
  playlist: PlaylistData;
}

interface PlaylistsResponse {
  playlists: PlaylistData[];
}

const transformPlaylist = ({
  playlist,
  playlistVideos
}: PlaylistData): Playlist => {
  return {
    id: playlist.id,
    title: playlist.localized.title,
    playlistVideos: playlistVideos.map<Video>((video) => ({
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnails.medium.url,
      description: video.description
    }))
  };
};

// Define a service using a base URL and expected endpoints
export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: [ApiTagTypes.PLAYLIST, ApiTagTypes.VIDEO],
  endpoints: (build) => ({
    getPlaylists: build.query<Playlist[], void>({
      query: () => `/playlists`,
      providesTags: (result) =>
        result
          ? [
              ...result.flatMap(({ id, playlistVideos }) => [
                {
                  type: ApiTagTypes.PLAYLIST,
                  id
                },
                ...(playlistVideos || []).map((vid) => ({
                  type: ApiTagTypes.VIDEO,
                  id: vid.id
                }))
              ]),
              ApiTagTypes.PLAYLIST
            ]
          : [ApiTagTypes.PLAYLIST],
      transformResponse: ({ playlists }: PlaylistsResponse) =>
        playlists.map(transformPlaylist)
    }),
    getPlaylist: build.query<Playlist, string>({
      query: (playlistId) => `/playlists/${playlistId}`,
      providesTags: (result, error, id) => [
        { type: ApiTagTypes.PLAYLIST, id },
        ...(result?.playlistVideos || []).map((vid) => ({
          type: ApiTagTypes.VIDEO,
          id: vid.id
        }))
      ],
      transformResponse: ({ playlist }: PlaylistResponse) =>
        transformPlaylist(playlist)
    }),
    addPlaylist: build.mutation<Playlist, string>({
      query: (playlistId) => ({
        method: 'POST',
        url: `/playlists/${playlistId}/add`
      }),
      invalidatesTags: [ApiTagTypes.PLAYLIST],
      transformResponse: ({ playlist }: PlaylistResponse) =>
        transformPlaylist(playlist)
    }),
    removePlaylist: build.mutation<Playlist, string>({
      query: (playlistId) => ({
        method: 'DELETE',
        url: `/playlists/${playlistId}`
      }),
      async onQueryStarted(playlistId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          playlistApi.util.updateQueryData(
            'getPlaylists',
            undefined,
            (draft) => {
              return draft?.filter((item) => item.id !== playlistId);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, id) => [
        { type: ApiTagTypes.PLAYLIST, id }
      ]
    })
  })
});

export const {
  useGetPlaylistQuery,
  useGetPlaylistsQuery,
  useRemovePlaylistMutation,
  useAddPlaylistMutation
} = playlistApi;
