import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPokemonByName,
  fetchPokemonsList,
  type PokemonType,
} from '../../api/fetchPokemons';

export const fetchPokemonList = createAsyncThunk<
  { pokemons: PokemonType[]; totalPage: number },
  { searchText: string; offset: number }
>('pokemonList/fetchPokemonList', async ({ searchText, offset }) => {
  if (searchText) {
    const data = await fetchPokemonByName(searchText);
    return { pokemons: [data.pokemon], totalPage: 1 };
  }
  return await fetchPokemonsList(offset);
});
