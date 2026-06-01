import type { getPokemonNameListResponse } from '../../types';
import { _baseOffset, pokemonApi } from '../pokemonApi';
import { transformPokemonList } from '../transformResponses/transformPokemonList/transformPokemonList';

export const pokemonNameListApi = pokemonApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonNameList: builder.query<getPokemonNameListResponse, number>({
      query: (offset = _baseOffset) => `pokemon?offset=${offset}&limit=20`,
      providesTags: ['PokemonNameList'],
      transformResponse: transformPokemonList,
    }),
  }),
});

export const { useGetPokemonNameListQuery } = pokemonNameListApi;
