import { vi } from 'vitest';
import * as api from '../../api/fetchPokemons';
import CardDetails from './CardDetails';
import { screen, waitFor } from '@testing-library/react';
import { MOCK_PIKACHU_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';
import type { PokemonType } from '../../api/fetchPokemons';
import { renderWithProviders } from '../../utils/test';
import { ROUTES } from '../../shared/constants/routes';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ detailsId: 'pikachu' }),
  };
});

describe('CardDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockFetchPokemonByName = vi.spyOn(api, 'fetchPokemonByName');

  it('renders pokemon card after successful fetch', async () => {
    mockFetchPokemonByName.mockResolvedValueOnce({
      pokemons: [MOCK_PIKACHU_DATA as PokemonType],
      totalPage: 1,
      errorMessage: '',
    });

    renderWithProviders(<CardDetails />);

    await waitFor(() => {
      expect(mockFetchPokemonByName).toHaveBeenCalledWith('pikachu');
    });

    expect(screen.getByText('hear the Pokémon')).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('mega-punch')).toBeInTheDocument();
  });

  it('navigates to not found page when request fails', async () => {
    mockFetchPokemonByName.mockRejectedValueOnce(new Error('Error'));

    renderWithProviders(<CardDetails />);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.NOT_FOUND);
    });
  });
});
