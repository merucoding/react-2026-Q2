import { _baseOffset, _limitPerPage, pokemonApi } from '../pokemonApi';
import type { PokemonListResponse } from '../../types';

export const pokemonListApi = pokemonApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      { pokemonList: string[]; totalPage: number },
      number
    >({
      query: (offset = _baseOffset) =>
        `pokemon?offset=${offset}&limit=${_limitPerPage}`,
      transformResponse: (response: PokemonListResponse) => ({
        pokemonList: response.results.map((item) => item.name),
        totalPage: Math.ceil(response.count / _limitPerPage),
      }),
    }),
  }),
});

export const { useGetPokemonListQuery } = pokemonListApi;
