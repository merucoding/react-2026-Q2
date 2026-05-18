import { screen } from '@testing-library/react';
import About from './About';
import { renderWithProviders } from '../../utils/test';

describe('About page', () => {
  it('displays information about author', () => {
    renderWithProviders(<About />);

    expect(screen.getByText('Hello! I`m Méru.')).toBeInTheDocument();
    expect(screen.getByText(/i love coffee/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'RS School React course.' })
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Go home' })).toBeInTheDocument();
  });
});
