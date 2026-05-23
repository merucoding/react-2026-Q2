import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  selectedPokemonIds: number[];
};

const initialState: InitialState = {
  selectedPokemonIds: [],
};

const selectedPokemonListSlice = createSlice({
  name: 'selectedPokemonList',
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<number>) => {
      state.selectedPokemonIds.push(action.payload);
    },
    deleteFromList: (state, action: PayloadAction<number>) => {
      state.selectedPokemonIds = state.selectedPokemonIds.filter(
        (id) => id !== action.payload
      );
    },
    clearList: (state) => {
      state.selectedPokemonIds = [];
    },
  },
});

const { actions, reducer } = selectedPokemonListSlice;

export default reducer;

export const { addToList, deleteFromList, clearList } = actions;
