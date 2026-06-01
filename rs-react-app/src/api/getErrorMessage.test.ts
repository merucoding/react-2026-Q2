import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage', () => {
  it('returns null when error is undefined', () => {
    expect(getErrorMessage(undefined)).toBeNull();
  });

  it('handles PARSING_ERROR', () => {
    const error = {
      status: 'PARSING_ERROR',
      originalStatus: 404,
      data: 'Not Found',
      error: 'Not Found',
    } as const;

    expect(getErrorMessage(error)).toBe('404: Not Found');
  });

  it('handles FETCH_ERROR', () => {
    const error = {
      status: 'FETCH_ERROR',
      error: 'Network error',
    } as const;

    expect(getErrorMessage(error)).toBe('Network error');
  });
});
