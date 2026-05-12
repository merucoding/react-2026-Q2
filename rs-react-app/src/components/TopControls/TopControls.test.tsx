import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TopControls from './TopControls';

describe('TopControls', () => {
  it('Renders search input and action buttons', () => {
    render(<TopControls value="" onChange={vi.fn()} onSearch={vi.fn()} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
    expect(screen.getByTestId('eraser-button')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('Renders passed value', () => {
    render(
      <TopControls value="pikachu" onChange={vi.fn()} onSearch={vi.fn()} />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('pikachu');
  });

  it('Calls onChange when typing', () => {
    const onChange = vi.fn();
    render(<TopControls value="" onChange={onChange} onSearch={vi.fn()} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ditto' } });
    expect(onChange).toHaveBeenCalledWith('ditto');
  });

  it('calls onSearch on search button click', () => {
    const onSearch = vi.fn();
    render(<TopControls value="" onChange={vi.fn()} onSearch={onSearch} />);

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('Clears input on eraser click', () => {
    const onChange = vi.fn();
    render(
      <TopControls value="pikachu" onChange={onChange} onSearch={vi.fn()} />
    );

    const eraseButton = screen.getByTestId('eraser-button');
    fireEvent.click(eraseButton);
    expect(onChange).toHaveBeenCalledWith('');
  });
});
