import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemonByName, type PokemonType } from '../../api/fetchPokemons';

export const fetchPokemon = createAsyncThunk<{ pokemon: PokemonType }, string>(
  'pokemon/fetchPokemon',
  async (detailsId) => {
    return await fetchPokemonByName(detailsId);
  }
);
