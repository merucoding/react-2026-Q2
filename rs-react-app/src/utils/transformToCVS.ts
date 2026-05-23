import type { PokemonType } from '../api/fetchPokemons';
import getPokemonMoves from './getPokemonMoves';
import getPokemonParams from './getPokemonParams';

export default function transformToCVS(pokemonList: PokemonType[]) {
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
    getPokemonParams(pokemon.height, pokemon.weight),
    pokemon.cries.latest,
    pokemon.types.map((type) => type.type.name).join(', '),
    pokemon.abilities.map((ability) => ability.ability.name).join(', '),
    getPokemonMoves(pokemon.moves),
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
