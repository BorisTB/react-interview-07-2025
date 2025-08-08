import { Video } from '..//videos/video';

export interface Playlist {
  id: string;
  title: string;
  playlistVideos?: Video[];
}
