import { useState, type ChangeEvent } from 'react';
import { Eraser, Search } from 'lucide-react';
import ErrorButton from '../ErrorButton/ErrorButton';
import { BORDER_STYLE, BUTTON_STYLE } from '../../shared/constants/styles';
import { LOCAL_STORAGE_QUERY_KEY } from '../../shared/constants/ls';

type Props = {
  onSearch: (input: string) => void;
};

const TopControls = ({ onSearch }: Props) => {
  const [input, setInput] = useState(
    localStorage.getItem(LOCAL_STORAGE_QUERY_KEY) || ''
  );

  const handleSearch = () => {
    const trimmed = input.trim();
    onSearch(trimmed);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="flex justify-center gap-4 mt-8 flex-wrap">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className={BORDER_STYLE}
      />
      <button
        data-testid="eraser-button"
        onClick={handleClear}
        className={BUTTON_STYLE}
      >
        <Eraser />
      </button>
      <button
        data-testid="search-button"
        onClick={handleSearch}
        className={BUTTON_STYLE}
      >
        <Search />
      </button>
      <ErrorButton />
    </div>
  );
};

export default TopControls;
