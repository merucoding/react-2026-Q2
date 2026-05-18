import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header component', () => {
  it('renders header correctly', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', { name: 'Pokémon Search' })
    ).toBeInTheDocument();
  });
});
