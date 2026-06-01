import type { PokemonCard } from '../types/pokemonTypes';

export default function getDetailsList(data: PokemonCard) {
  return [
    { title: 'types', items: data.types.map((type) => type.type.name) },
    {
      title: 'abilities',
      items: data.abilities.map((ability) => ability.ability.name),
    },
    {
      title: 'moves',
      items: data.moves.slice(0, 15).map((move) => move.move.name),
    },
  ];
}
