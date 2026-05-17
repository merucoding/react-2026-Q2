import { http, HttpResponse, type JsonBodyType } from 'msw';
import { _apiBase } from '../../../api/fetchPokemons';
import { MOCK_POKEMONS_LIST_RESPONSE } from './pokemonMocks';

export const pokemonListHandler = (
  mock:
    | typeof MOCK_POKEMONS_LIST_RESPONSE
    | JsonBodyType = MOCK_POKEMONS_LIST_RESPONSE
) =>
  http.get(_apiBase, () => {
    return HttpResponse.json(mock);
  });
