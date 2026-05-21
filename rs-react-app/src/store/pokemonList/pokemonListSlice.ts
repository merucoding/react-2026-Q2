import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPokemonByName,
  fetchPokemonsList,
  type PokemonType,
} from '../../api/fetchPokemons';

type InitialState = {
  pokemonList: PokemonType[];
  isLoading: boolean;
  errorMessage: string;
  totalPage: number;
};

const initialState: InitialState = {
  pokemonList: [],
  isLoading: false,
  errorMessage: '',
  totalPage: 1,
};

export const fetchPokemonList = createAsyncThunk<
  { pokemons: PokemonType[]; totalPage: number; errorMessage: string },
  { searchText: string; offset: number }
>('pokemonList/fetchPokemonList', async ({ searchText, offset }) => {
  if (searchText) {
    return await fetchPokemonByName(searchText);
  }
  return await fetchPokemonsList(offset);
});

const pokemonListSlice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemonList = action.payload.pokemons;
        state.totalPage = action.payload.totalPage;
        state.errorMessage = action.payload.errorMessage;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || 'Failed to load pokemons!';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = pokemonListSlice;

export default reducer;
