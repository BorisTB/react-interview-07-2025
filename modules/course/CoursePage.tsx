'use client';
import React, { useCallback, useRef } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Container from '@/components/Container';
import { Video as PlaylistVideo } from '@/lib/features/videos/video';
import VideoFilter from './components/VideoFilter';
import Video from '@/modules/course/components/Video';
import { useVideosUiState } from '@/lib/features/videos/videos.slice';

export interface CoursePageProps {
  id: string;
  title: string;
  playlistVideos: PlaylistVideo[];
}

export const CoursePage = ({
  id: playlistId,
  title,
  playlistVideos
}: CoursePageProps) => {
  const listRef = useRef<List>(null);
  const videosUiState = useVideosUiState();

  const getItemSize = useCallback(
    (index: number) => {
      console.log(
        'XXXX',
        videosUiState,
        videosUiState[playlistVideos[index].id]
      );
      return videosUiState[playlistVideos[index].id]?.opened === true
        ? 540
        : 140;
    },
    [videosUiState]
  );

  const toggleOpen = useCallback((index: number) => {
    console.log('aaa', listRef.current);
    listRef.current?.resetAfterIndex(index);
  }, []);

  const Row = ({ index, style, toggleOpenCallback }) => {
    return (
      <div style={style}>
        <Video
          key={playlistVideos[index].id}
          index={index}
          playlistId={playlistId}
          id={playlistVideos[index].id}
          title={playlistVideos[index].title}
          thumbnail={playlistVideos[index].thumbnail}
          description={playlistVideos[index].description}
          toggleOpenCallback={toggleOpen}
        />
      </div>
    );
  };

  return (
    <article>
      <Container>
        <VideoFilter />
        <h1>{title}</h1>
        {playlistVideos.length > 0 && (
          <div style={{ height: '60vh' }}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={listRef}
                  height={height}
                  itemCount={playlistVideos.length}
                  itemSize={getItemSize}
                  width={width}>
                  {Row}
                </List>
              )}
            </AutoSizer>
          </div>
        )}
      </Container>
    </article>
  );
};

export default CoursePage;
