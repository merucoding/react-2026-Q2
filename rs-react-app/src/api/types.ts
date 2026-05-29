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

export type PokemonCard = {
  name: string;
  id: number;
  src: string;
  description: string;
  cries: string;
  types: PokemonType['types'];
  abilities: PokemonType['abilities'];
  moves: string;
};
