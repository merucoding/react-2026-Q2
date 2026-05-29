import getPokemonMoves from '../utils/getPokemonMoves';
import getPokemonParams from '../utils/getPokemonParams';
import type { PokemonCard, PokemonType } from './types';

export const transformPokemonData = (pokemon: PokemonType): PokemonCard => ({
  name: pokemon.name,
  id: pokemon.id,
  src: pokemon.sprites.front_default,
  description: getPokemonParams(pokemon.height, pokemon.weight),
  cries: pokemon.cries.latest,
  types: pokemon.types,
  abilities: pokemon.abilities,
  moves: getPokemonMoves(pokemon.moves),
});
