import type { Pokemon } from 'pokeapi-typescript';
import { POKEMON_BY_NAME_URL, POKEMON_LIST_URL } from '../types/constants';
import { isPokemonListResponse } from './isPokemonListResponse';
import fetchData from './fetchData';

export async function fetchPokemons(searchText?: string): Promise<{
  pokemons: Pokemon[];
  errorMessage: string;
}> {
  try {
    if (searchText?.trim()) {
      const pokemon = await fetchData<Pokemon>(
        `${POKEMON_BY_NAME_URL}${searchText}`
      );
      return { pokemons: [pokemon], errorMessage: '' };
    }
    const data = await fetchData<unknown>(POKEMON_LIST_URL);
    if (!isPokemonListResponse(data)) {
      throw new Error('Invalid response');
    }
    const pokemons = await Promise.all(
      data.results.map((item) => {
        return fetchData<Pokemon>(item.url);
      })
    );
    return { pokemons, errorMessage: '' };
  } catch (error) {
    return {
      pokemons: [],
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
