import { MOCK_PIKACHU_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';
import { fetchPokemon } from './pokemonAsyncThunk';
import reducer from './pokemonSlice';

describe('pokemonSlice', () => {
  const initialState = {
    pokemon: null,
    isLoading: false,
    errorMessage: '',
  };

  it('handles fetchPokemon pending', () => {
    const action = {
      type: fetchPokemon.pending.type,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      pokemon: null,
      isLoading: true,
      errorMessage: '',
    });
  });

  it('handles fetchPokemon fulfilled', () => {
    const action = {
      type: fetchPokemon.fulfilled.type,
      payload: {
        pokemon: MOCK_PIKACHU_DATA,
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      pokemon: MOCK_PIKACHU_DATA,
      isLoading: false,
      errorMessage: '',
    });
  });

  it('handles fetchPokemon rejected', () => {
    const action = {
      type: fetchPokemon.rejected.type,
      error: {
        message: 'Failed to load pokemons!',
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      pokemon: null,
      isLoading: false,
      errorMessage: 'Failed to load pokemons!',
    });
  });
});
