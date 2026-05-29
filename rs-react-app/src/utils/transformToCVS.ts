import type { PokemonCard } from '../types/pokemonTypes';

export default function transformToCVS(pokemonList: PokemonCard[]) {
  const header = [
    'name',
    'id',
    'description',
    'cries',
    'types',
    'abilities',
    'moves',
    'url',
  ];

  const rows = pokemonList.map((pokemon) => [
    pokemon.name,
    pokemon.id,
    pokemon.description,
    pokemon.cries,
    pokemon.types.map((type) => type.type.name).join(', '),
    pokemon.abilities.map((ability) => ability.ability.name).join(', '),
    pokemon.moves,
    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
  ]);

  const csvContent = [
    header.join(','),
    ...rows.map((row) =>
      row.map((item) => `"${String(item).replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');

  return csvContent;
}
