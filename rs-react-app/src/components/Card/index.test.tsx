import type { Pokemon } from 'pokeapi-typescript';
import { render, screen } from '@testing-library/react';
import Card from './';
import { DC_TO_CM } from '../../shared/constants/math';
import { MOCK_PIKACHU_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';

const mockPokemon = {
  ...MOCK_PIKACHU_DATA,
  sprites: {
    front_default:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
  },
};

describe('Card component', () => {
  it('displays pokemon name and description correctly', () => {
    render(<Card pokemon={mockPokemon as Pokemon} />);

    const image = screen.getByRole('img');

    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        `height: ${mockPokemon.height * DC_TO_CM} cm, weight: ${mockPokemon.weight / DC_TO_CM} kg`
      )
    ).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockPokemon.sprites.front_default);
    expect(image).toHaveAttribute('alt', 'picture');
  });
});
