import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit/react';
import type { ReactNode } from 'react';
import { ErrorContent } from '../ErrorContent/ErrorContent';
import Spinner from '../Spinner/Spinner';

type Props = {
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  children: ReactNode;
};

export const QueryStateWrapper = ({ isLoading, error, children }: Props) => {
  if (error) {
    return <ErrorContent error={error} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return children;
};
