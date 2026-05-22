import { createSlice } from '@reduxjs/toolkit';
import { type PokemonType } from '../../api/fetchPokemons';
import { fetchPokemonList } from './pokemonListAsyncThunk';

type InitialState = {
  pokemonList: PokemonType[] | null;
  isLoading: boolean;
  errorMessage: string;
  totalPage: number;
};

const initialState: InitialState = {
  pokemonList: null,
  isLoading: false,
  errorMessage: '',
  totalPage: 1,
};

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
        state.pokemonList =
          action.payload.pokemons ??
          (action.payload.pokemon ? [action.payload.pokemon] : null);
        state.totalPage = action.payload.totalPage || 1;
        state.errorMessage = '';
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || 'Failed to load pokemons!';
      });
  },
});

const { reducer } = pokemonListSlice;

export default reducer;
