import { screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import TopControls from './TopControls';
import { renderWithProviders } from '../../utils/test';

describe('TopControls component', () => {
  it('renders search input, buttons and link', () => {
    renderWithProviders(<TopControls searchText="" onSearch={vi.fn()} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
    expect(screen.getByTestId('eraser-button')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('initializes input with previously entered search text', () => {
    renderWithProviders(
      <TopControls searchText="pikachu" onSearch={vi.fn()} />
    );
    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });

  it('shows empty input when no saved term exists', () => {
    renderWithProviders(<TopControls searchText="" onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <TopControls searchText="pikachu" onSearch={vi.fn()} />
    );

    const input = screen.getByRole('textbox');

    await user.clear(input);
    await user.type(input, 'd');

    expect(input).toHaveValue('d');

    await user.type(input, 'i');

    expect(input).toHaveValue('di');
  });

  it('calls onSearch with trimmed value when search button is clicked', async () => {
    const onSearchMock = vi.fn();

    const user = userEvent.setup();

    renderWithProviders(<TopControls searchText="" onSearch={onSearchMock} />);

    const input = screen.getByRole('textbox');

    await user.type(input, '   ditto ');
    await user.click(screen.getByTestId('search-button'));

    expect(onSearchMock).toHaveBeenCalledWith('ditto');
  });

  it('calls onSearch with empty value when clear button is clicked', async () => {
    const onSearchMock = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <TopControls searchText="pikachu" onSearch={onSearchMock} />
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('pikachu');

    await user.click(screen.getByTestId('eraser-button'));

    expect(onSearchMock).toHaveBeenCalledWith('');
    expect(input).toHaveValue('');
  });
});
