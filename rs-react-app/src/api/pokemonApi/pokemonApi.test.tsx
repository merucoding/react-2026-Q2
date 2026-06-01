import { Provider } from 'react-redux';
import { useGetPokemonByNameQuery } from './pokemonByName/pokemonByNameApi';
import { render, screen } from '@testing-library/react';
import { NON_EXISTENT_POKEMON_NAME } from '../../test-utils/constants';
import { vi } from 'vitest';
import { pokemonApi } from './pokemonApi';
import { configureStore } from '@reduxjs/toolkit';

const TestComponent = ({ pokemonName }: { pokemonName: string }) => {
  const { data, isFetching, isError, isSuccess } =
    useGetPokemonByNameQuery(pokemonName);

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return <>{isSuccess && <div>{data.name}</div>};</>;
};

const createStore = () =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });

describe('pokemon Api', () => {
  it('shows loading state', () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <TestComponent pokemonName="pikachu" />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <TestComponent pokemonName={NON_EXISTENT_POKEMON_NAME} />
      </Provider>
    );

    expect(await screen.findByText('Error')).toBeInTheDocument();
  });

  it('uses cache', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const store = createStore();

    const { unmount } = render(
      <Provider store={store}>
        <TestComponent pokemonName="pikachu" />
      </Provider>
    );

    await screen.findByText('pikachu');

    expect(fetchSpy).toHaveBeenCalledTimes(1);

    unmount();

    render(
      <Provider store={store}>
        <TestComponent pokemonName="pikachu" />
      </Provider>
    );

    await screen.findByText('pikachu');

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
