import { describe, it, expect } from 'vitest';
import CardDetails from './CardDetails';
import { render, screen } from '@testing-library/react';
import { MOCK_PIKACHU_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import pokemonReducer from '../../store/pokemon/pokemonSlice';
import type { PokemonType } from '../../api/types';

describe('CardDetails', () => {
  it('renders pokemon card after successful fetch', async () => {
    const store = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
      preloadedState: {
        pokemon: {
          pokemon: MOCK_PIKACHU_DATA as PokemonType,
          isLoading: false,
          errorMessage: '',
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('hear the Pokémon')).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('mega-punch')).toBeInTheDocument();
  });
});
