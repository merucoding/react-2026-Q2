import {
  INVALID_POKEMON_NAME,
  NON_EXISTENT_POKEMON_NAME,
  SERVER_ERROR_INPUT,
} from '../test-utils/constants';
import {
  MOCK_INVALID_RESPONSE,
  MOCK_PIKACHU_DATA,
  MOCK_POKEMONS_DATA,
} from '../test-utils/mocks/handlers/pokemonMocks';
import { describe, it, expect } from 'vitest';
import { fetchPokemonByName, fetchPokemonsList } from './fetchPokemons';
import { server } from '../test-utils/mocks/server';
import { pokemonListHandler } from '../test-utils/mocks/handlers/pokemonList';

describe('fetchPokemons', () => {
  it('returns a single pokemon (with searchText)', async () => {
    const { pokemon } = await fetchPokemonByName(MOCK_PIKACHU_DATA.name);

    expect(pokemon).toEqual(MOCK_PIKACHU_DATA);
  });

  it('returns a list of pokemons (without searchText)', async () => {
    const { pokemons, totalPage } = await fetchPokemonsList();

    expect(pokemons).toEqual(expect.arrayContaining(MOCK_POKEMONS_DATA));
    expect(totalPage).toEqual(68);
  });

  it('throws an error for invalid response', async () => {
    server.use(pokemonListHandler(MOCK_INVALID_RESPONSE));

    expect(fetchPokemonsList()).rejects.toThrow('Invalid response');
  });

  it('returns an error when pokemon not found by searchText', async () => {
    await expect(fetchPokemonByName(NON_EXISTENT_POKEMON_NAME)).rejects.toThrow(
      'Error 404: Pokemon not found'
    );
  });

  it('returns a client error message for invalid input', async () => {
    await expect(fetchPokemonByName(INVALID_POKEMON_NAME)).rejects.toThrow(
      'Client error 400'
    );
  });

  it('returns a server error message', async () => {
    await expect(fetchPokemonByName(SERVER_ERROR_INPUT)).rejects.toThrow(
      'Server error 500'
    );
  });
});
