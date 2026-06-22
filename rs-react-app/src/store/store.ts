import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonList from './selectedList/selectedListSlice';

export const store = configureStore({
  reducer: {
    selectedPokemonList,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
