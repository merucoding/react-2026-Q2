import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import { Component } from 'react';

class ThrowError extends Component {
  // eslint-disable-next-line react/require-render-return
  render(): never {
    throw new Error('Crash Error');
  }
}

describe('ErrorBoundary component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('catches errors in child components and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });

  it('logs error to console', () => {
    const consoleErrorMock = vi.mocked(console.error);

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleErrorMock.mock.calls[1][0]).toEqual('Caught an error:');
  });
});
