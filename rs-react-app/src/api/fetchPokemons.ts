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

export const fetchPokemonsList = async (
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

export const fetchPokemonByName = async (
  searchText: string
): Promise<{ pokemon: PokemonType }> => {
  const pokemon = await fetchData<PokemonType>(`${_apiBase}/${searchText}`);
  return { pokemon };
};
