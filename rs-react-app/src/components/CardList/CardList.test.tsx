import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { MOCK_POKEMONS_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';
import type { PokemonType } from '../../api/fetchPokemons';

describe('CardList component', () => {
  it('renders correct number of pokemons when data is provided', () => {
    render(<CardList pokemons={MOCK_POKEMONS_DATA as PokemonType[]} />);

    expect(screen.getAllByRole('img')).toHaveLength(MOCK_POKEMONS_DATA.length);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });
});
