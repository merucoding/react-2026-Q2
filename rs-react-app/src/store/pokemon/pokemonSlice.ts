import { createSlice } from '@reduxjs/toolkit';
import { type PokemonType } from '../../api/fetchPokemons';
import { fetchPokemon } from './pokemonAsyncThunk';

type InitialState = {
  pokemon: PokemonType | null;
  isLoading: boolean;
  errorMessage: string;
};

const initialState: InitialState = {
  pokemon: null,
  isLoading: false,
  errorMessage: '',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.isLoading = true;
        state.pokemon = null;
        state.errorMessage = '';
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemon = action.payload.pokemon;
        state.errorMessage = '';
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || 'Failed to load pokemons!';
      });
  },
});

const { reducer } = pokemonSlice;

export default reducer;
