import type { Pokemon } from 'pokeapi-typescript';
import { isPokemonListResponse } from './isPokemonListResponse';
import fetchData from './fetchData';

export const _apiBase = 'https://pokeapi.co/api/v2/pokemon';
export const _baseOffset = 0;
export const _limitPerPage = 20;

const getPokemonsList = async (offset = _baseOffset): Promise<Pokemon[]> => {
  const pokemons = await fetchData<unknown>(
    `${_apiBase}?offset=${offset}&limit=${_limitPerPage}`
  );

  if (!isPokemonListResponse(pokemons)) {
    throw new Error('Invalid response');
  }

  return Promise.all(
    pokemons.results.map((item) => {
      return fetchData<Pokemon>(item.url);
    })
  );
};

const getPokemonByName = async (searchText: string): Promise<Pokemon[]> => {
  const pokemon = await fetchData<Pokemon>(`${_apiBase}/${searchText}`);
  return [pokemon];
};

const withErrorHandling = async (fn: () => Promise<Pokemon[]>) => {
  try {
    return { pokemons: await fn(), errorMessage: '' };
  } catch (error) {
    return {
      pokemons: [],
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const fetchPokemonsList = (offset = _baseOffset) =>
  withErrorHandling(() => getPokemonsList(offset));

export const fetchPokemonByName = (searchText: string) =>
  withErrorHandling(() => getPokemonByName(searchText));
