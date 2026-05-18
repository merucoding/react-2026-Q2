import * as api from '../../api/fetchPokemons';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { MOCK_POKEMONS_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';
import HomePage from './HomePage';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/ls';
import { _baseOffset, type PokemonType } from '../../api/fetchPokemons';
import { renderWithProviders } from '../../utils/test';

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const mockFetchPokemonByName = vi.spyOn(api, 'fetchPokemonByName');
  const mockFetchPokemonsList = vi.spyOn(api, 'fetchPokemonsList');

  it('Makes initial API call on component mount', async () => {
    renderWithProviders(<HomePage />);

    await waitFor(() =>
      expect(mockFetchPokemonsList).toHaveBeenCalledWith(_baseOffset)
    );
  });

  it('Handles search term from localStorage on initial load', async () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.SEARCH_TEXT,
      JSON.stringify('pikachu')
    );

    renderWithProviders(<HomePage />);

    await waitFor(() => {
      expect(mockFetchPokemonByName).toHaveBeenCalledWith('pikachu');
    });
  });

  it('fetches pokemon by search text when user submits input', async () => {
    renderWithProviders(<HomePage />);

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.click(searchButton);

    await waitFor(() =>
      expect(mockFetchPokemonByName).toHaveBeenCalledWith('bulbasaur')
    );
  });

  it('Handles successful API responses and updates component state', async () => {
    mockFetchPokemonsList.mockResolvedValueOnce({
      pokemons: MOCK_POKEMONS_DATA as PokemonType[],
      totalPage: 1,
      errorMessage: '',
    });

    renderWithProviders(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('ivysaur')).toBeInTheDocument();
    });
  });

  it('Handles API error responses', async () => {
    mockFetchPokemonsList.mockResolvedValueOnce({
      pokemons: [],
      totalPage: 0,
      errorMessage: 'Unknown error',
    });

    renderWithProviders(<HomePage />);

    await waitFor(() =>
      expect(screen.getByText('Unknown error')).toBeInTheDocument()
    );
  });
});
