import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.scss';

type Props = {
  url: string;
  /** Called when media finishes playing **/
  onEnded?: () => void;
};

const VideoPlayer: React.FC<Props> = ({ url, onEnded }) => {
  return (
    <div className={styles['video-player']}>
      <ReactPlayer
        src={url}
        onEnded={onEnded}
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
