import type { getPokemonListParams } from '../../types';
import { _baseOffset, pokemonApi } from '../pokemonApi';
import { transformPokemonList } from '../transformResponses/transformPokemonList/transformPokemonList';

export const pokemonListApi = pokemonApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonList: builder.query<getPokemonListParams, number>({
      query: (offset = _baseOffset) => `pokemon?offset=${offset}&limit=20`,
      transformResponse: transformPokemonList,
    }),
  }),
});

export const { useGetPokemonListQuery } = pokemonListApi;
