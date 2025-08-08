import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export interface ErrorInfoProps {
  title?: string;
  error: FetchBaseQueryError | SerializedError;
}

export const ErrorInfo = ({ title, error }: ErrorInfoProps) => {
  const name =
    (error as FetchBaseQueryError).status ?? (error as SerializedError).name;
  const message =
    (error as FetchBaseQueryError).data ?? (error as SerializedError).message;

  return (
    <div>
      {title && <div>{title}</div>}
      <div>
        {name} {JSON.stringify(message)}
      </div>
    </div>
  );
};
