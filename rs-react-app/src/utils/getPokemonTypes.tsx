import type { PokemonType } from 'pokeapi-typescript';

export default function getPokemonTypes(types: PokemonType[]) {
  if (!types.length) return null;

  return types.map((type) => <li key={type.slot}>{type.type.name}</li>);
}
