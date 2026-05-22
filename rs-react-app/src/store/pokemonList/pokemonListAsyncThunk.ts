import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPokemonByName,
  fetchPokemonsList,
  type PokemonType,
} from '../../api/fetchPokemons';

export const fetchPokemonList = createAsyncThunk<
  { pokemons?: PokemonType[]; pokemon?: PokemonType; totalPage?: number },
  { searchText: string; offset: number }
>('pokemonList/fetchPokemonList', async ({ searchText, offset }) => {
  if (searchText) {
    return await fetchPokemonByName(searchText);
  }
  return await fetchPokemonsList(offset);
});
