import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Flyout from './Flyout';
import { render, screen } from '@testing-library/react';
import { MOCK_PIKACHU_CARD } from '../../test-utils/mocks/handlers/pokemonMocks';
import selectedPokemonListReducer from '../../store/selectedList/selectedListSlice';
import userEvent from '@testing-library/user-event';
import * as savePokemonList from '../../services/savePokemonList';
import { vi } from 'vitest';
import type { PokemonCard } from '../../types/pokemonTypes';

describe('Flyout', () => {
  it('does not render Flyout when no selected pokemons', () => {
    const store = configureStore({
      reducer: {
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
        selectedPokemonList: selectedPokemonListReducer,
      },
      preloadedState: {
        selectedPokemonList: {
          selectedPokemonList: [MOCK_PIKACHU_CARD] as PokemonCard[],
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
        selectedPokemonList: selectedPokemonListReducer,
      },
      preloadedState: {
        selectedPokemonList: {
          selectedPokemonList: [MOCK_PIKACHU_CARD] as PokemonCard[],
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
        selectedPokemonList: selectedPokemonListReducer,
      },
      preloadedState: {
        selectedPokemonList: {
          selectedPokemonList: [MOCK_PIKACHU_CARD] as PokemonCard[],
        },
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /Download/i }));

    expect(savePokemonListMock).toHaveBeenCalledWith([MOCK_PIKACHU_CARD]);
  });
});
