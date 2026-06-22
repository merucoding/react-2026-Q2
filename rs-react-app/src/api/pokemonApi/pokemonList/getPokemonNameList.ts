import { _apiBase, _baseOffset, _cacheTtl, _limitPerPage } from '../constants';
import { getErrorMessage } from '../getErrorMessage';
import { transformPokemonList } from '../transformResponses/transformPokemonList/transformPokemonList';
import type { PokemonListResponse } from '../types';

export const getPokemonNameList = async (offset = _baseOffset) => {
  const response = await fetch(
    `${_apiBase}pokemon?offset=${offset}&limit=${_limitPerPage}`,
    {
      next: {
        revalidate: _cacheTtl,
      },
    }
  );

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status));
  }

  const data = (await response.json()) as PokemonListResponse;

  return transformPokemonList(data);
};
