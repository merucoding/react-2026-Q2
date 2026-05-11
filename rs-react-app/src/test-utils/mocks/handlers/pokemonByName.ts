import { http, HttpResponse } from 'msw';
import { POKEMON_BY_NAME_URL } from '../../../api/constants';
import { MOCK_PIKACHU_DATA, MOCK_POKEMONS_DATA } from './pokemonMocks';
import {
  INVALID_POKEMON_NAME,
  NON_EXISTENT_POKEMON_NAME,
  SERVER_ERROR_INPUT,
} from '../../constants';

type Pokemon = {
  name: string;
  height: number;
  weight: number;
};

export const pokemonByNameHandler = () =>
  http.get<{ name: string }>(`${POKEMON_BY_NAME_URL}:name`, ({ params }) => {
    const { name } = params;

    const db: Record<string, Pokemon> = {
      pikachu: MOCK_PIKACHU_DATA,
      '1': MOCK_POKEMONS_DATA[0],
      '2': MOCK_POKEMONS_DATA[1],
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
