import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  MOCK_POKEMON_NAMES,
  MOCK_POKEMONS_DATA,
} from '../../test-utils/mocks/handlers/pokemonMocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CardList from './CardList';
import { store } from '../../store/store';
import { pokemonApi } from '../../api/pokemonApi/pokemonApi';

describe('CardList component', () => {
  afterEach(() => {
    store.dispatch(pokemonApi.util.resetApiState());
  });

  it('renders correct number of pokemons when data is provided', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList pokemonNameList={MOCK_POKEMON_NAMES} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryAllByTestId('spinner')).toHaveLength(0);
    });

    expect(screen.getAllByRole('img')).toHaveLength(MOCK_POKEMONS_DATA.length);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });
});
