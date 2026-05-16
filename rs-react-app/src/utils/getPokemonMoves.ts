import type { PokemonMove } from 'pokeapi-typescript';

export default function getPokemonMoves(moves: PokemonMove[]) {
  return moves
    .slice(0, 15)
    .map((move) => move.move.name)
    .join(', ');
}
