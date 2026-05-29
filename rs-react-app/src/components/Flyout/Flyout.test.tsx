import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Flyout from './Flyout';
import { render, screen } from '@testing-library/react';
import {
  MOCK_PIKACHU_DATA,
  MOCK_POKEMONS_DATA,
} from '../../test-utils/mocks/handlers/pokemonMocks';
import pokemonListReducer from '../../store/pokemonList/pokemonListSlice';
import selectedPokemonListReducer from '../../store/selectedList/selectedListSlice';
import type { PokemonType } from '../../api/types';
import userEvent from '@testing-library/user-event';
import * as savePokemonList from '../../services/savePokemonList';
import { vi } from 'vitest';

describe('Flyout', () => {
  it('does not render Flyout when no selected pokemons', () => {
    const store = configureStore({
      reducer: {
        pokemonList: pokemonListReducer,
        selectedPokemonList: selectedPokemonListReducer,
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText(/Pokémon selected/i)).not.toBeInTheDocument();
  });

  it('renders Flyout when pokemons are selected', () => {
    const store = configureStore({
      reducer: {
        pokemonList: pokemonListReducer,
        selectedPokemonList: selectedPokemonListReducer,
      },
      preloadedState: {
        selectedPokemonList: {
          selectedPokemonList: MOCK_POKEMONS_DATA as PokemonType[],
        },
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText(/Pokémon selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Download/i })
    ).toBeInTheDocument();
  });

  it('clears selected pokemon list on click', async () => {
    const user = userEvent.setup();

    const store = configureStore({
      reducer: {
        pokemonList: pokemonListReducer,
        selectedPokemonList: selectedPokemonListReducer,
      },
      preloadedState: {
        selectedPokemonList: {
          selectedPokemonList: MOCK_POKEMONS_DATA as PokemonType[],
        },
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText(/Pokémon selected/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Unselect all/i }));

    expect(screen.queryByText(/Pokémon selected/i)).not.toBeInTheDocument();
  });

  it('calls savePokemonList on download click', async () => {
    const user = userEvent.setup();

    const savePokemonListMock = vi.spyOn(savePokemonList, 'default');

    const store = configureStore({
      reducer: {
        pokemonList: pokemonListReducer,
        selectedPokemonList: selectedPokemonListReducer,
      },
      preloadedState: {
        pokemonList: {
          pokemonList: [MOCK_PIKACHU_DATA as PokemonType],
          isLoading: false,
          errorMessage: '',
          totalPage: 1,
        },
        selectedPokemonList: {
          selectedPokemonList: [MOCK_PIKACHU_DATA as PokemonType],
        },
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /Download/i }));

    expect(savePokemonListMock).toHaveBeenCalledWith([MOCK_PIKACHU_DATA]);
  });
});
