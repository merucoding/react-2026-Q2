import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit/react';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): string => {
  if (!error) {
    return 'Unknown error';
  }

  if ('status' in error) {
    if (error.status === 'PARSING_ERROR') {
      return `${error.originalStatus}: ${error.data}`;
    }

    if (typeof error.status === 'number') {
      return (
        (error.data as { message?: string })?.message || `Error ${error.status}`
      );
    }

    return error.error;
  }

  return error.message || 'Something went wrong';
};
