import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectPokemonListState = (state: RootState) => state.pokemonList;

export const selectIsPokemonListLoading = createSelector(
  selectPokemonListState,
  (pokemonList) => pokemonList.isLoading
);

export const selectPokemonListErrorMessage = createSelector(
  selectPokemonListState,
  (pokemonList) => pokemonList.errorMessage
);

export const selectPokemonList = createSelector(
  selectPokemonListState,
  (pokemonList) => pokemonList.pokemonList
);

export const selectPokemonListTotalPage = createSelector(
  selectPokemonListState,
  (pokemonList) => pokemonList.totalPage
);
