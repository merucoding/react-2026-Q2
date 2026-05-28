import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonType } from '../fetchPokemons';

const _apiBase = 'https://pokeapi.co/api/v2/';
const _baseOffset = 0;
const _limitPerPage = 20;

type PokemonCard = {
  name: string;
  src: string;
  height: number;
  weight: number;
  types: PokemonType['types'];
  abilities: PokemonType['abilities'];
  cries: string;
  moves: PokemonType['moves'];
};

export type PokemonListResponse = {
  count: number;
  results: { url: string }[];
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: _apiBase }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, number>({
      query: (offset = _baseOffset) => ({
        url: 'pokemon',
        params: {
          limit: _limitPerPage,
          offset,
        },
      }),
      transformResponse: (response: PokemonListResponse) => ({
        count: response.count,
        results: response.results,
      }),
    }),
    getPokemonByName: builder.query<PokemonCard, string>({
      query: (name) => `pokemon/${name}`,
      transformResponse: (response: PokemonType) => ({
        name: response.name,
        src: response.sprites.front_default,
        height: response.height,
        weight: response.weight,
        types: response.types,
        abilities: response.abilities,
        cries: response.cries.latest,
        moves: response.moves,
      }),
    }),
  }),
});

export const { useGetPokemonListQuery } = pokemonApi;
