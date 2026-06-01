import { http, HttpResponse } from 'msw';
import { MOCK_PIKACHU_DATA, MOCK_POKEMONS_DATA } from './pokemonMocks';
import {
  INVALID_POKEMON_NAME,
  NON_EXISTENT_POKEMON_NAME,
  SERVER_ERROR_INPUT,
} from '../../constants';
import { _apiBase } from '../../../api/pokemonApi/pokemonApi';

export const pokemonByNameHandler = () =>
  http.get<{ name: string }>(`${_apiBase}pokemon/:name`, ({ params }) => {
    const { name } = params;

    const db: Record<string, typeof MOCK_PIKACHU_DATA> = {
      pikachu: MOCK_PIKACHU_DATA,
      bulbasaur: MOCK_POKEMONS_DATA[0],
      ivysaur: MOCK_POKEMONS_DATA[1],
    };

    if (name === NON_EXISTENT_POKEMON_NAME)
      return new HttpResponse('Not found', { status: 404 });

    if (name === INVALID_POKEMON_NAME)
      return new HttpResponse(null, { status: 400 });

    if (name === SERVER_ERROR_INPUT)
      return new HttpResponse(null, { status: 500 });

    const pokemon = db[name];

    return HttpResponse.json(pokemon);
  });
