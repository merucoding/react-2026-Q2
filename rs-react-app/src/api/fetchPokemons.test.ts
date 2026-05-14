import {
  INVALID_POKEMON_NAME,
  NON_EXISTENT_POKEMON_NAME,
  SERVER_ERROR_INPUT,
} from '../test-utils/constants';
import {
  MOCK_PIKACHU_DATA,
  MOCK_POKEMONS_DATA,
} from '../test-utils/mocks/handlers/pokemonMocks';
import { describe, it, expect } from 'vitest';
import { fetchPokemonByName, fetchPokemonsList } from './fetchPokemons';

describe('fetchPokemons', () => {
  it('returns a single pokemon (with searchText)', async () => {
    const { pokemons, errorMessage } = await fetchPokemonByName(
      MOCK_PIKACHU_DATA.name
    );

    expect(pokemons).toHaveLength(1);
    expect(pokemons).toEqual(expect.arrayContaining([MOCK_PIKACHU_DATA]));
    expect(errorMessage).toBe('');
  });

  it('returns a list of pokemons (without searchText)', async () => {
    const { pokemons, errorMessage } = await fetchPokemonsList();

    expect(pokemons).toEqual(expect.arrayContaining(MOCK_POKEMONS_DATA));
    expect(errorMessage).toBe('');
  });

  it('returns an error when pokemon not found by searchText', async () => {
    const { pokemons, errorMessage } = await fetchPokemonByName(
      NON_EXISTENT_POKEMON_NAME
    );

    expect(pokemons).toEqual([]);
    expect(errorMessage).toBe('Error 404: Pokemon not found');
  });

  it('returns a client error message for invalid input', async () => {
    const { pokemons, errorMessage } =
      await fetchPokemonByName(INVALID_POKEMON_NAME);

    expect(pokemons).toEqual([]);
    expect(errorMessage).toBe('Client error 400');
  });

  it('returns a server error message', async () => {
    const { pokemons, errorMessage } =
      await fetchPokemonByName(SERVER_ERROR_INPUT);

    expect(pokemons).toEqual([]);
    expect(errorMessage).toBe('Server error 500');
  });
});
