import type { Pokemon } from 'pokeapi-typescript';
import { isPokemonListResponse } from './isPokemonListResponse';
import fetchData from './fetchData';

export const _apiBase = 'https://pokeapi.co/api/v2/pokemon';
export const _baseOffset = 0;
export const _limitPerPage = 20;

export type PokemonType = Pokemon & {
  cries: {
    latest: string;
    legacy?: string;
  };
};

const getPokemonsList = async (
  offset = _baseOffset
): Promise<{ pokemons: PokemonType[]; totalPage: number }> => {
  const data = await fetchData<unknown>(
    `${_apiBase}?offset=${offset}&limit=${_limitPerPage}`
  );

  if (!isPokemonListResponse(data)) {
    throw new Error('Invalid response');
  }

  const pokemons = await Promise.all(
    data.results.map((item) => {
      return fetchData<PokemonType>(item.url);
    })
  );

  const totalPage = Math.ceil(data.count / _limitPerPage);
  return { pokemons, totalPage };
};

const getPokemonByName = async (
  searchText: string
): Promise<{ pokemons: PokemonType[]; totalPage: number }> => {
  const pokemon = await fetchData<PokemonType>(`${_apiBase}/${searchText}`);
  return { pokemons: [pokemon], totalPage: 1 };
};

const withErrorHandling = async (
  fn: () => Promise<{ pokemons: PokemonType[]; totalPage: number }>
) => {
  try {
    const { pokemons, totalPage } = await fn();
    return { pokemons, totalPage, errorMessage: '' };
  } catch (error) {
    return {
      pokemons: [],
      totalPage: 1,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const fetchPokemonsList = (offset = _baseOffset) =>
  withErrorHandling(() => getPokemonsList(offset));

export const fetchPokemonByName = (searchText: string) =>
  withErrorHandling(() => getPokemonByName(searchText));
