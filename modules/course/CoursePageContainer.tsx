'use client';
import { useGetPlaylistQuery } from '@/lib/store/api.service';
import Spinner from '@/components/Spinner';
import { ErrorInfo } from '@/components/ErrorInfo/ErrorInfo';
import CoursePage from '@/modules/course/CoursePage';

export interface CoursePageContainerProps {
  playlistId: string;
}

const CoursePageContainer = ({ playlistId }: CoursePageContainerProps) => {
  const { data, isLoading, error } = useGetPlaylistQuery(playlistId);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorInfo title="Error loading playlist" error={error} />;
  }

  return <CoursePage {...data} />;
};

export default CoursePageContainer;
