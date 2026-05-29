import type { Pokemon } from 'pokeapi-typescript';

export type PokemonListResponse = {
  count: number;
  results: { name: string; url: string }[];
};

export type PokemonType = Pokemon & {
  cries: {
    latest: string;
    legacy?: string;
  };
};

export type getPokemonListParams = {
  pokemonList: string[];
  totalPage: number;
};
