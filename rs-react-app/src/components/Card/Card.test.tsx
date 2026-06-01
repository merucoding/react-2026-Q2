import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';
import { MOCK_PIKACHU_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { pokemonApi } from '../../api/pokemonApi/pokemonApi';
import getPokemonParams from '../../utils/getPokemonParams';

describe('Card component', () => {
  afterEach(() => {
    store.dispatch(pokemonApi.util.resetApiState());
  });

  it('displays pokemon name and description correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <Card pokemonName={MOCK_PIKACHU_DATA.name} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryAllByTestId('spinner')).toHaveLength(0);
    });

    const image = screen.getByRole('img');

    expect(screen.getByText(MOCK_PIKACHU_DATA.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        getPokemonParams(MOCK_PIKACHU_DATA.height, MOCK_PIKACHU_DATA.weight)
      )
    ).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      MOCK_PIKACHU_DATA.sprites.front_default
    );
  });
});
