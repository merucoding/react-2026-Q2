import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonListReducer from '../../store/selectedList/selectedListSlice';
import { Provider } from 'react-redux';
import { MOCK_PIKACHU_CARD } from '../../test-utils/mocks/handlers/pokemonMocks';
import { render, screen } from '@testing-library/react';
import SelectCardCheckbox from './SelectCardCheckbox';
import type { PokemonCard } from '../../types/pokemonTypes';
import userEvent from '@testing-library/user-event';

describe('SelectCardCheckbox', () => {
  it('renders unchecked checkbox when pokemon is not selected', () => {
    const store = configureStore({
      reducer: {
        selectedPokemonList: selectedPokemonListReducer,
      },
    });

    render(
      <Provider store={store}>
        <SelectCardCheckbox pokemon={MOCK_PIKACHU_CARD as PokemonCard} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();
  });

  it('renders checked checkbox when pokemon is selected', () => {
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
        <SelectCardCheckbox pokemon={MOCK_PIKACHU_CARD as PokemonCard} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  it('adds pokemon to store when checked', async () => {
    const store = configureStore({
      reducer: {
        selectedPokemonList: selectedPokemonListReducer,
      },
    });

    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <SelectCardCheckbox pokemon={MOCK_PIKACHU_CARD as PokemonCard} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    const state = store.getState();

    expect(state.selectedPokemonList.selectedPokemonList).toContainEqual(
      MOCK_PIKACHU_CARD
    );
  });

  it('removes pokemon from store when unchecked', async () => {
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

    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <SelectCardCheckbox pokemon={MOCK_PIKACHU_CARD as PokemonCard} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    const state = store.getState();

    expect(state.selectedPokemonList.selectedPokemonList).toHaveLength(0);
  });
});
