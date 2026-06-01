import { describe, it, expect } from 'vitest';
import CardDetails from './CardDetails';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '../../store/store';
import { pokemonApi } from '../../api/pokemonApi/pokemonApi';

describe('CardDetails', () => {
  afterEach(() => {
    store.dispatch(pokemonApi.util.resetApiState());
  });

  it('renders pokemon card after successful fetch', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemon/pikachu/1']}>
          <Routes>
            <Route path="/pokemon/:detailsId/:page" element={<CardDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryAllByTestId('spinner')).toHaveLength(0);
    });

    expect(screen.getByText('hear the Pokémon')).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('mega-punch')).toBeInTheDocument();
  });
});
