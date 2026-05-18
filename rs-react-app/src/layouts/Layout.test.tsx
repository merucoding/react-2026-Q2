import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    Outlet: () => <div>Outlet</div>,
  };
});

describe('Layout', () => {
  it('renders header and outlet', () => {
    render(<Layout />);

    expect(
      screen.getByRole('heading', { name: 'Pokémon Search' })
    ).toBeInTheDocument();
    expect(screen.getByText('Outlet')).toBeInTheDocument();
  });
});
