import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectSelectedPokemonListState = (state: RootState) =>
  state.selectedPokemonList;

export const selectSelectedPokemonList = createSelector(
  selectSelectedPokemonListState,
  (selectedPokemonList) => selectedPokemonList.selectedPokemonList
);

export const selectIsPokemonSelected = (id: number) =>
  createSelector(selectSelectedPokemonList, (selectedPokemonList) =>
    selectedPokemonList.some((pokemon) => pokemon.id === id)
  );

export const selectSelectedPokemonLength = createSelector(
  selectSelectedPokemonList,
  (selectedPokemonList) => selectedPokemonList.length
);
