import transformToCVS from '@/utils/transformToCVS';
import type { PokemonCard } from '@/types/pokemonTypes';

export async function POST(request: Request) {
  try {
    const pokemonList = (await request.json()) as PokemonCard[];

    if (!Array.isArray(pokemonList)) {
      return new Response('Invalid pokemon list', { status: 400 });
    }

    const csvContent = transformToCVS(pokemonList);

    return new Response(`\uFEFF${csvContent}`, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${pokemonList.length}_items.csv"`,
      },
    });
  } catch {
    return new Response('Failed to generate CSV', { status: 500 });
  }
}
