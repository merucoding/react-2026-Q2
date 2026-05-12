import { render, screen } from '@testing-library/react';
import App from './App';

test('App component', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: 'Pokémon Search' })
  ).toBeInTheDocument();
});
