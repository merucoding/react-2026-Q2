import * as api from '../../api/fetchPokemons';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import Main from './';
import { LOCAL_STORAGE_QUERY_KEY } from '../../shared/constants/ls';
import type { Pokemon } from 'pokeapi-typescript';
import { MOCK_PIKACHU_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';

describe('Main component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const mockFetchPokemons = vi.spyOn(api, 'fetchPokemons');

  it('Makes initial API call on component mount', async () => {
    mockFetchPokemons.mockResolvedValueOnce({
      pokemons: [],
      errorMessage: '',
    });

    render(<Main />);

    await waitFor(() => expect(mockFetchPokemons).toHaveBeenCalledWith(''));

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');
  });

  it('Handles search term from localStorage on initial load', async () => {
    localStorage.setItem(LOCAL_STORAGE_QUERY_KEY, 'pikachu');

    mockFetchPokemons.mockResolvedValueOnce({
      pokemons: [],
      errorMessage: '',
    });

    render(<Main />);

    await waitFor(() =>
      expect(mockFetchPokemons).toHaveBeenCalledWith('pikachu')
    );
    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });

  it('Handles successful API responses', async () => {
    mockFetchPokemons.mockResolvedValueOnce({
      pokemons: [MOCK_PIKACHU_DATA as Pokemon],
      errorMessage: '',
    });

    render(<Main />);

    await waitFor(() =>
      expect(screen.getByText('pikachu')).toBeInTheDocument()
    );
  });

  it('Handles API error responses', async () => {
    mockFetchPokemons.mockResolvedValueOnce({
      pokemons: [],
      errorMessage: 'Client error 400',
    });

    render(<Main />);

    await waitFor(() =>
      expect(screen.getByText('Client error 400')).toBeInTheDocument()
    );
  });

  it('Updates component state based on API responses', async () => {
    localStorage.setItem(LOCAL_STORAGE_QUERY_KEY, 'pikachu');

    mockFetchPokemons.mockResolvedValueOnce({
      pokemons: [],
      errorMessage: '',
    });

    render(<Main />);

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.click(searchButton);

    await waitFor(() =>
      expect(mockFetchPokemons).toHaveBeenCalledWith('bulbasaur')
    );
    expect(localStorage.getItem(LOCAL_STORAGE_QUERY_KEY)).toBe('bulbasaur');
  });

  it('Trims whitespace and does not call API if search is the same as lastSearchText', async () => {
    mockFetchPokemons.mockResolvedValue({
      pokemons: [],
      errorMessage: '',
    });

    render(<Main />);

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: '    pikachu   ' } });
    fireEvent.click(searchButton);

    await waitFor(() =>
      expect(mockFetchPokemons).toHaveBeenCalledWith('pikachu')
    );

    mockFetchPokemons.mockClear();

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(searchButton);

    expect(mockFetchPokemons).not.toHaveBeenCalled();
  });
});
