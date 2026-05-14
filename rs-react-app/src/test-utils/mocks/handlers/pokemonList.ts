import { http, HttpResponse } from 'msw';
import { MOCK_POKEMONS_LIST_RESPONSE } from './pokemonMocks';
import { _baseOffset, _limitPerPage } from '../../../api/fetchPokemons';

export const pokemonListHandler = (
  offset = _baseOffset,
  limit = _limitPerPage,
  mock = MOCK_POKEMONS_LIST_RESPONSE
) =>
  http.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    () => {
      return HttpResponse.json(mock);
    }
  );
