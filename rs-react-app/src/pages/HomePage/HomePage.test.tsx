import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import HomePage from './HomePage';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/ls';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { pokemonApi } from '../../api/pokemonApi/pokemonApi';
import { store } from '../../store/store';

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    store.dispatch(pokemonApi.util.resetApiState());
  });

  it('renders pokemon list from API', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryAllByTestId('spinner')).toHaveLength(0);
    });

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  it('handles search term from localStorage on initial load', async () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.SEARCH_TEXT,
      JSON.stringify('pikachu')
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryAllByTestId('spinner')).toHaveLength(0);
    });

    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('dispatches search when user submits input', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.queryAllByTestId('spinner')).toHaveLength(0);
    });

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });
});
