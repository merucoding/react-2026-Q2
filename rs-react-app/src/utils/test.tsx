import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

export function renderWithProviders(ui: ReactElement): RenderResult {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}
