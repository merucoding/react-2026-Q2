import { http, HttpResponse } from 'msw';
import { MOCK_POKEMONS_LIST_RESPONSE } from './pokemonMocks';

export const pokemonListHandler = (
  offset = 0,
  limit = 20,
  mock = MOCK_POKEMONS_LIST_RESPONSE
) =>
  http.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    () => {
      return HttpResponse.json(mock);
    }
  );
