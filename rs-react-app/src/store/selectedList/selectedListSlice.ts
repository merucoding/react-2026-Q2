import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PokemonCard } from '@/types/pokemonTypes';

type InitialState = {
  selectedPokemonList: PokemonCard[];
};

const initialState: InitialState = {
  selectedPokemonList: [],
};

const selectedPokemonListSlice = createSlice({
  name: 'selectedPokemonList',
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<PokemonCard>) => {
      state.selectedPokemonList.push(action.payload);
    },
    deleteFromList: (state, action: PayloadAction<number>) => {
      state.selectedPokemonList = state.selectedPokemonList.filter(
        (pokemon) => pokemon.id !== action.payload
      );
    },
    clearList: (state) => {
      state.selectedPokemonList = [];
    },
  },
});

const { actions, reducer } = selectedPokemonListSlice;

export default reducer;

export const { addToList, deleteFromList, clearList } = actions;
