import { render, screen } from '@testing-library/react';
import Loading from './Loading';
import { describe, it, expect } from 'vitest';

describe('Loading component', () => {
  it('renders spinner', () => {
    render(<Loading />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
