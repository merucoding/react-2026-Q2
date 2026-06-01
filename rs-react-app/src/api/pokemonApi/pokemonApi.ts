import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const CACHE_TTL = Number(import.meta.env.VITE_POKEMON_API_CACHE_TTL) || 60;

export const _apiBase = 'https://pokeapi.co/api/v2/';
export const _baseOffset = 0;
export const _limitPerPage = 20;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: _apiBase }),
  tagTypes: ['Pokemon', 'PokemonNameList'],
  keepUnusedDataFor: CACHE_TTL,
  endpoints: () => ({}),
});
