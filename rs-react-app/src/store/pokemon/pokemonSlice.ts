import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemonByName, type PokemonType } from '../../api/fetchPokemons';

type InitialState = {
  pokemon: PokemonType | undefined;
  isLoading: boolean;
  errorMessage: string;
};

const initialState: InitialState = {
  pokemon: undefined,
  isLoading: false,
  errorMessage: '',
};

export const fetchPokemon = createAsyncThunk<
  { pokemons: PokemonType[]; errorMessage: string },
  string
>('pokemon/fetchPokemon', async (detailsId) => {
  return await fetchPokemonByName(detailsId);
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemon = action.payload.pokemons[0];
        state.errorMessage = action.payload.errorMessage;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || 'Failed to load pokemons!';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = pokemonSlice;

export default reducer;
