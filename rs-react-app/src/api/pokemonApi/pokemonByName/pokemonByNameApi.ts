import { pokemonApi } from '../pokemonApi';
import type { PokemonCard, PokemonType } from '../../types';
import { transformPokemonData } from '../../transformPokemonData';

export const pokemonByNameApi = pokemonApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonByName: builder.query<PokemonCard, string>({
      query: (name) => `pokemon/${name}`,
      transformResponse: (response: PokemonType) =>
        transformPokemonData(response),
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonByNameApi;
