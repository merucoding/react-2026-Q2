import { render, screen } from '@testing-library/react';
import Header from './';

describe('Header component', () => {
  it('renders header correctly', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', { name: 'Pokémon Search' })
    ).toBeInTheDocument();
  });
});
