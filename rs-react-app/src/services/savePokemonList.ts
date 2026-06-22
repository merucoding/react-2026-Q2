import type { PokemonCard } from '../types/pokemonTypes';

export default async function savePokemonList(pokemonList: PokemonCard[]) {
  const response = await fetch('/api/pokemon-csv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pokemonList),
  });

  if (!response.ok) {
    throw new Error('Failed to generate CSV');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${pokemonList.length}_items.csv`;
  a.click();

  URL.revokeObjectURL(url);
}
