import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';

describe('App', () => {
  const store = configureStore({
    reducer: {
      pokemonList: () => ({
        pokemonList: [],
      }),
      selectedPokemonList: () => ({
        selectedPokemonList: [],
      }),
    },
  });

  it('redirects to HomePage', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('redirects to About page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/about']}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Hello! I`m Méru.')).toBeInTheDocument();
  });

  it('redirects to NotFound page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/not-found']}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Page not found...')).toBeInTheDocument();
  });
});
