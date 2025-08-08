'use client';

import React, { useCallback } from 'react';
import Collapse from '@/components/Collapse';
import styles from './Video.module.scss';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import {
  useIsVideoCompleted,
  useIsVideoOpened,
  useMarkCompleted,
  useToggleOpen
} from '@/lib/features/videos/videos.slice';

const Video = ({
  playlistId,
  index,
  id,
  title,
  description,
  thumbnail,
  toggleOpenCallback
}) => {
  const opened = useIsVideoOpened(id);
  const completed = useIsVideoCompleted(id);
  const toggleOpen = useToggleOpen(id);
  const markCompleted = useMarkCompleted(id);

  const handleToggleOpen = useCallback(() => {
    toggleOpen();
    toggleOpenCallback?.(index);
  }, [toggleOpen, toggleOpenCallback, index]);

  return (
    <>
      {
        <div className={styles['video']}>
          <label className={styles['video__completed']}>
            <input
              className={styles['video__completed-checkbox']}
              type="checkbox"
              checked={completed ? 1 : 0}
              onChange={markCompleted}
            />
          </label>
          <div className={styles['video__content']}>
            <h2 className={styles['video__title']}>{title}</h2>
            {opened && (
              <Collapse open={opened}>
                <VideoPlayer
                  url={`https://www.youtube.com/watch?v=${id}`}
                  onEnded={markCompleted}
                />
                <p className={styles['video__description']}>{description}</p>
              </Collapse>
            )}
            <button onClick={handleToggleOpen} type="button">
              {opened ? 'show less' : 'show more'}
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default React.memo(Video);
