import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { MOCK_POKEMONS_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';
import HomePage from './HomePage';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/ls';
import { _baseOffset } from '../../api/fetchPokemons';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import * as pokemonListAsyncThunk from '../../store/pokemonList/pokemonListAsyncThunk';

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  vi.spyOn(pokemonListAsyncThunk, 'fetchPokemonList');

  const store = configureStore({
    reducer: {
      pokemonList: () => ({
        pokemonList: [],
      }),
      selectedPokemonList: () => ({
        selectedPokemonList: [],
      }),
    },
  });

  it('dispatches fetchPokemonList on mount', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(pokemonListAsyncThunk.fetchPokemonList).toHaveBeenCalledWith({
      searchText: '',
      offset: _baseOffset,
    });
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

    expect(pokemonListAsyncThunk.fetchPokemonList).toHaveBeenCalledWith({
      searchText: 'pikachu',
      offset: _baseOffset,
    });
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

    expect(pokemonListAsyncThunk.fetchPokemonList).toHaveBeenCalledWith({
      searchText: 'bulbasaur',
      offset: _baseOffset,
    });
  });

  it('renders pokemon list from store', async () => {
    const store = configureStore({
      reducer: {
        pokemonList: () => ({
          pokemonList: MOCK_POKEMONS_DATA,
          isLoading: false,
          errorMessage: '',
          totalPage: 1,
        }),
        selectedPokemonList: () => ({
          selectedPokemonList: [],
        }),
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  it('shows error message when error exists', async () => {
    const store = configureStore({
      reducer: {
        pokemonList: () => ({
          pokemonList: null,
          isLoading: false,
          errorMessage: 'Unknown error',
          totalPage: 1,
        }),
        selectedPokemonList: () => ({
          selectedPokemonList: [],
        }),
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Unknown error')).toBeInTheDocument();
  });
});
