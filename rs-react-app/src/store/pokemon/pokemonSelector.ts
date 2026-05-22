import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectPokemonState = (state: RootState) => state.pokemon;

export const selectIsPokemonLoading = createSelector(
  selectPokemonState,
  (pokemon) => pokemon.isLoading
);

export const selectPokemonErrorMessage = createSelector(
  selectPokemonState,
  (pokemon) => pokemon.errorMessage
);

export const selectPokemon = createSelector(
  selectPokemonState,
  (pokemon) => pokemon.pokemon
);
