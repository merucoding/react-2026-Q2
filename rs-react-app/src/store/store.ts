import { configureStore } from '@reduxjs/toolkit';
import pokemonList from './pokemonList/pokemonListSlice';

export const store = configureStore({
  reducer: { pokemonList },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
