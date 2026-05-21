import type { RootState } from '../store';

export const selectPokemonList = (state: RootState) => state.pokemonList;
