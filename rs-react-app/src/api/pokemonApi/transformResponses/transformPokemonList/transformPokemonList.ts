import { _limitPerPage } from '../../constants';
import type { PokemonListResponse } from '../../types';

export const transformPokemonList = (response: PokemonListResponse) => ({
  pokemonNameList: response.results.map((item) => item.name),
  totalPage: Math.ceil(response.count / _limitPerPage),
});
