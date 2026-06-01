import type { PokemonCard } from '../types/pokemonTypes';

export default function getDetailsList(data: PokemonCard) {
  const result = [
    { title: 'types', items: data.types.map((type) => type.type.name) },
    {
      title: 'abilities',
      items: data.abilities.map((ability) => ability.ability.name),
    },
  ];

  const moves = data.moves
    .slice(0, 15)
    .map((move) => move.move.name)
    .filter(Boolean);

  if (moves.length) {
    result.push({
      title: 'moves',
      items: [moves.join(', ')],
    });
  }

  return result;
}
