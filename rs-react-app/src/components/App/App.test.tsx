import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '../../utils/test';
import App from './App';

describe('App', () => {
  it('redirects to HomePage', () => {
    renderWithProviders(<App />, '/');

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('redirects to About page', () => {
    renderWithProviders(<App />, '/about');

    expect(screen.getByText('Hello! I`m Méru.')).toBeInTheDocument();
  });

  it('redirects to NotFound page', () => {
    renderWithProviders(<App />, '/not-found');

    expect(screen.getByText('Page not found...')).toBeInTheDocument();
  });
});
