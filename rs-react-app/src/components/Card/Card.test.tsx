import type { Pokemon } from 'pokeapi-typescript';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { MOCK_PIKACHU_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';
import getPokemonParams from '../../utils/getPokemonParams';

describe('Card component', () => {
  it('displays pokemon name and description correctly', () => {
    render(<Card pokemon={MOCK_PIKACHU_DATA as Pokemon} />);

    const image = screen.getByRole('img');

    expect(screen.getByText(MOCK_PIKACHU_DATA.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        getPokemonParams(MOCK_PIKACHU_DATA.height, MOCK_PIKACHU_DATA.weight)
      )
    ).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      MOCK_PIKACHU_DATA.sprites.front_default
    );
  });
});
