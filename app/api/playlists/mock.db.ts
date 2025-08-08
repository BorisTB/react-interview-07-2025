import java from './java.json';
import freeCodeCamp from './free-code-camp.json';
import tenDaysOfJavascript from './ten-days-of-javascript.json';
import fk2024e from './fk-2024-e.json';
import fk2024p from './fk-2024-p.json';
import fk2024f from './fk-2024-f.json';

const playlists = [
  java,
  freeCodeCamp,
  tenDaysOfJavascript,
  fk2024e,
  fk2024p,
  fk2024f
];

export const mockDb = new Map(
  playlists.map((playlist) => [playlist.playlist.id, playlist])
);
