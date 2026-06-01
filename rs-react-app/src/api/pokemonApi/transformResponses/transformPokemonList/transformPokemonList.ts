import type { PokemonListResponse } from '../../../types';
import { _limitPerPage } from '../../pokemonApi';

export const transformPokemonList = (response: PokemonListResponse) => ({
  pokemonNameList: response.results.map((item) => item.name),
  totalPage: Math.ceil(response.count / _limitPerPage),
});
