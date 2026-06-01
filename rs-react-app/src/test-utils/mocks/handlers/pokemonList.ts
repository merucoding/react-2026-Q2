import { http, HttpResponse, type JsonBodyType } from 'msw';
import { MOCK_POKEMONS_LIST_RESPONSE } from './pokemonMocks';
import { _apiBase } from '../../../api/pokemonApi/pokemonApi';

export const pokemonListHandler = (
  mock:
    | typeof MOCK_POKEMONS_LIST_RESPONSE
    | JsonBodyType = MOCK_POKEMONS_LIST_RESPONSE
) =>
  http.get(`${_apiBase}pokemon`, () => {
    return HttpResponse.json(mock);
  });
