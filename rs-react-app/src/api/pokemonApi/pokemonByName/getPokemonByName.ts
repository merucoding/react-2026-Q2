import type { PokemonCard } from '../../../types/pokemonTypes';
import type { PokemonType } from '../types';
import HttpStatusCode from '../../../types/httpStatusCode';
import { _apiBase, _cacheTtl } from '../constants';
import { getErrorMessage } from '../getErrorMessage';
import { transformPokemonData } from '../transformResponses/transformPokemonData/transformPokemonData';

export const getPokemonByName = async (
  name: string
): Promise<PokemonCard | null> => {
  const response = await fetch(`${_apiBase}pokemon/${name}`, {
    next: {
      revalidate: _cacheTtl,
    },
  });

  if (response.status === HttpStatusCode.NOT_FOUND) {
    return null;
  }

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status));
  }

  const data = (await response.json()) as PokemonType;

  return transformPokemonData(data);
};
