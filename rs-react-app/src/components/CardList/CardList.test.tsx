import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MOCK_POKEMONS_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonListReducer from '../../store/pokemonList/pokemonListSlice';
import selectedPokemonListReducer from '../../store/selectedList/selectedListSlice';
import CardList from './CardList';
import type { PokemonType } from '../../api/fetchPokemons';

describe('CardList component', () => {
  it('renders correct number of pokemons when data is provided', () => {
    const store = configureStore({
      reducer: {
        pokemonList: pokemonListReducer,
        selectedPokemonList: selectedPokemonListReducer,
      },
      preloadedState: {
        pokemonList: {
          pokemonList: MOCK_POKEMONS_DATA as PokemonType[],
          isLoading: false,
          errorMessage: '',
          totalPage: 1,
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByRole('img')).toHaveLength(MOCK_POKEMONS_DATA.length);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });
});
