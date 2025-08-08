'use client';
import { useCallback } from 'react';
import { useAddPlaylistMutation } from '@/lib/store/api.service';

type Props = {};

const AddCourseForm: React.FC<Props> = ({}) => {
  const [addPlaylist] = useAddPlaylistMutation();

  const handleSubmit = useCallback(
    (formData: FormData) => {
      const playlistId = formData.get('playlistId')?.toString();
      if (!playlistId) {
        return;
      }
      addPlaylist(playlistId);
    },
    [addPlaylist]
  );
  return (
    <form action={handleSubmit}>
      <h2>Add a new course</h2>
      <label>
        youtube playlist id:
        <input name="playlistId" type="text" />
      </label>
      <button type="submit">Add course</button>
    </form>
  );
};

export default AddCourseForm;
