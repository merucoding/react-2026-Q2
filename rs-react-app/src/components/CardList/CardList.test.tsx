import type { Pokemon } from 'pokeapi-typescript';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { MOCK_POKEMONS_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';

describe('CardList component', () => {
  it('renders correct number of pokemons when data is provided', () => {
    render(<CardList pokemons={MOCK_POKEMONS_DATA as Pokemon[]} />);

    expect(screen.getAllByRole('img')).toHaveLength(MOCK_POKEMONS_DATA.length);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });
});
