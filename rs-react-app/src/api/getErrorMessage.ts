import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): string | null => {
  if (!error) return null;

  if ('status' in error) {
    switch (error.status) {
      case 'PARSING_ERROR':
        return `${error.originalStatus}: ${error.data}`;

      case 'FETCH_ERROR':
      case 'TIMEOUT_ERROR':
      case 'CUSTOM_ERROR':
        return error.error;

      default:
        return `Request failed (${error.status})`;
    }
  }

  return error.message ?? 'An unexpected error occurred';
};
