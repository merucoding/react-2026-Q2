import { store } from './store';

describe('store', () => {
  it('should have correct initial state', () => {
    const state = store.getState();

    expect(state.selectedPokemonList).toEqual({
      selectedPokemonList: [],
    });
  });
});
