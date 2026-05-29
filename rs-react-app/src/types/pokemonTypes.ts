import type { PokemonType } from '../api/types';

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
