import type { PokemonAbility } from 'pokeapi-typescript';

export default function getPokemonAbilities(abilities: PokemonAbility[]) {
  if (!abilities.length) return null;

  return abilities.map((ability) => (
    <li key={ability.slot}>{ability.ability.name}</li>
  ));
}
