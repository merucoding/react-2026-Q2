import { describe, it, expect } from 'vitest';
import CardDetails from './CardDetails';
import { render, screen } from '@testing-library/react';
import { MOCK_PIKACHU_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

describe('CardDetails', () => {
  it('renders pokemon card after successful fetch', async () => {
    const store = configureStore({
      reducer: {
        pokemon: () => ({
          pokemon: MOCK_PIKACHU_DATA,
        }),
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
