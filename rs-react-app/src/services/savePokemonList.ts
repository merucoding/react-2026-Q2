import type { PokemonType } from '../api/fetchPokemons';
import transformToCVS from '../utils/transformToCVS';

export default function savePokemonList(pokemonList: PokemonType[]) {
  const transformedData = transformToCVS(pokemonList);

  const blob = new Blob([transformedData], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${pokemonList.length}_items.csv`;
  a.click();

  URL.revokeObjectURL(url);
}
