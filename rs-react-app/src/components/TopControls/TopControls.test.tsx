import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import TopControls from './TopControls';
import { ThemeProvider } from '../../context/ThemeContext';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { pokemonApi } from '../../api/pokemonApi/pokemonApi';

describe('TopControls component', () => {
  afterEach(() => {
    store.dispatch(pokemonApi.util.resetApiState());
  });

  it('renders search input, buttons and link', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <TopControls searchQuery="" onSearch={vi.fn()} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
    expect(screen.getByTestId('eraser-button')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('initializes input with previously entered search text', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <TopControls searchQuery="pikachu" onSearch={vi.fn()} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });

  it('shows empty input when no saved term exists', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <TopControls searchQuery="" onSearch={vi.fn()} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <TopControls searchQuery="pikachu" onSearch={vi.fn()} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
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

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <TopControls searchQuery="" onSearch={onSearchMock} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByRole('textbox');

    await user.type(input, '   ditto ');
    await user.click(screen.getByTestId('search-button'));

    expect(onSearchMock).toHaveBeenCalledWith('ditto');
  });

  it('calls onSearch with empty value when clear button is clicked', async () => {
    const onSearchMock = vi.fn();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <TopControls searchQuery="pikachu" onSearch={onSearchMock} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('pikachu');

    await user.click(screen.getByTestId('eraser-button'));

    expect(onSearchMock).toHaveBeenCalledWith('');
    expect(input).toHaveValue('');
  });
});
