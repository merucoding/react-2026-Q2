import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonList from './selectedList/selectedListSlice';
import { pokemonApi } from '../api/pokemonApi/pokemonApi';

export const store = configureStore({
  reducer: {
    selectedPokemonList,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
