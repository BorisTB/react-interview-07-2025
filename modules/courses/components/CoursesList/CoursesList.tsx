'use client';
import CoursesListItem from './CoursesListItem';
import {
  useGetPlaylistsQuery,
  useRemovePlaylistMutation
} from '@/lib/store/api.service';
import Spinner from '@/components/Spinner';
import { ErrorInfo } from '@/components/ErrorInfo/ErrorInfo';

const CoursesList: React.FC = () => {
  const { data, error, isLoading } = useGetPlaylistsQuery();

  const [removePlaylist] = useRemovePlaylistMutation();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorInfo error={error} />;
  }

  return (
    <ul>
      {data?.map((item) => (
        <CoursesListItem
          key={item.id}
          title={item.title}
          onRemove={() => removePlaylist(item.id)}
        />
      ))}
    </ul>
  );
};

export default CoursesList;
