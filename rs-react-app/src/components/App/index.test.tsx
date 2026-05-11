import { render, screen } from '@testing-library/react';
import App from './';

test('App component', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: 'Pokémon Search' })
  ).toBeInTheDocument();
});
