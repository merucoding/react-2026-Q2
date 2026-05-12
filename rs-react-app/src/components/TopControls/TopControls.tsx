import { type ChangeEvent } from 'react';
import { Eraser, Search } from 'lucide-react';
import ErrorButton from '../ErrorButton/ErrorButton';
import { BORDER_STYLE, BUTTON_STYLE } from '../../shared/constants/styles';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

const TopControls = ({ value, onChange, onSearch }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="flex justify-center gap-4 mt-8 flex-wrap">
      <input
        type="text"
        value={value}
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
        onClick={onSearch}
        className={BUTTON_STYLE}
      >
        <Search />
      </button>
      <ErrorButton />
    </div>
  );
};

export default TopControls;
