import type { PokemonCard } from '../../../types/pokemonTypes';
import { pokemonApi } from '../pokemonApi';
import { transformPokemonData } from '../transformResponses/transformPokemonData/transformPokemonData';

export const pokemonByNameApi = pokemonApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonByName: builder.query<PokemonCard, string>({
      query: (name) => `pokemon/${name}`,
      transformResponse: transformPokemonData,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonByNameApi;
