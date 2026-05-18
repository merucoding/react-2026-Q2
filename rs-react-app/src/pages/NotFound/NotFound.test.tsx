import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test';
import NotFound from './NotFound';

describe('NotFound page', () => {
  it('displays not found page', () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByText('Page not found...')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toBeInTheDocument();
  });
});
