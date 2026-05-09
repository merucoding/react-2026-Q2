import { http, HttpResponse } from 'msw';
import { POKEMONS_LIST } from '../../types/constants';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/pikachu', () => {
    return HttpResponse.json({
      name: 'pikachu',
      height: 4,
      weight: 60,
    });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/avatar', () => {
    return new HttpResponse('Not found', { status: 404 });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/p.', () => {
    return new HttpResponse(null, { status: 400 });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/500-error', () => {
    return new HttpResponse(null, { status: 500 });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20', () => {
    return HttpResponse.json(POKEMONS_LIST);
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/1/', () => {
    return HttpResponse.json({
      name: 'bulbasaur',
      height: 7,
      weight: 69,
    });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/2/', () => {
    return HttpResponse.json({
      name: 'ivysaur',
      height: 10,
      weight: 130,
    });
  }),
];
