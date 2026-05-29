import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit/react';
import { getErrorMessage } from '../../api/getErrorMessage';

type Props = {
  error: FetchBaseQueryError | SerializedError;
};

export const ErrorContent = ({ error }: Props) => {
  return (
    <div className="text-fuchsia-400 font-bold text-lg">
      {getErrorMessage(error)}
    </div>
  );
};
