import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectSelectedPokemonListState = (state: RootState) =>
  state.selectedPokemonList;

export const selectSelectedPokemonIds = createSelector(
  selectSelectedPokemonListState,
  (selectedPokemonList) => selectedPokemonList.selectedPokemonIds
);

export const selectIsPokemonSelected = (id: string) =>
  createSelector(selectSelectedPokemonIds, (selectedPokemonIds) =>
    selectedPokemonIds.includes(id)
  );
