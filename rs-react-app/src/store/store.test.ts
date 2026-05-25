import { store } from './store';

describe('store', () => {
  it('should have correct initial state', () => {
    const state = store.getState();

    expect(state.pokemon).toEqual({
      pokemon: null,
      isLoading: false,
      errorMessage: '',
    });

    expect(state.pokemonList).toEqual({
      pokemonList: null,
      isLoading: false,
      errorMessage: '',
      totalPage: 1,
    });

    expect(state.selectedPokemonList).toEqual({
      selectedPokemonList: [],
    });
  });
});
