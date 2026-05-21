import { configureStore } from '@reduxjs/toolkit';
import pokemonList from './pokemonList/pokemonListSlice';
import pokemon from './pokemon/pokemonSlice';

export const store = configureStore({
  reducer: { pokemonList, pokemon },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
