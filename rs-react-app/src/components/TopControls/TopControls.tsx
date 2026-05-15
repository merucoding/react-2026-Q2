import { useState, type ChangeEvent } from 'react';
import { Eraser, Search } from 'lucide-react';
import ErrorButton from '../ErrorButton/ErrorButton';
import { BORDER_STYLE } from '../../shared/constants/styles';
import { LOCAL_STORAGE_QUERY_KEY } from '../../shared/constants/ls';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

type Props = {
  onSearch: (input: string) => void;
};

const TopControls = ({ onSearch }: Props) => {
  const navigate = useNavigate();

  const [input, setInput] = useState(
    localStorage.getItem(LOCAL_STORAGE_QUERY_KEY) || ''
  );

  const handleSearch = () => {
    const trimmed = input.trim();
    onSearch(trimmed);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    navigate('/pokemons/1');
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
      <Button data-testid="eraser-button" onClick={handleClear}>
        <Eraser />
      </Button>
      <Button data-testid="search-button" onClick={handleSearch}>
        <Search />
      </Button>
      <ErrorButton />
    </div>
  );
};

export default TopControls;
