import { useState, type ChangeEvent } from 'react';
import { Eraser, Search } from 'lucide-react';
import ErrorButton from '../ErrorButton/ErrorButton';
import { BORDER_STYLE } from '../../shared/constants/styles';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import NavButton from '../NavButton/NavButton';
import { ROUTES } from '../../shared/constants/routes';

type Props = {
  searchText: string;
  onSearch: (input: string) => void;
};

const TopControls = ({ searchText, onSearch }: Props) => {
  const navigate = useNavigate();

  const [input, setInput] = useState(searchText);

  const handleSearch = () => {
    const trimmed = input.trim();
    setInput(trimmed);
    onSearch(trimmed);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    navigate(ROUTES.HOME);
  };

  const handleClear = () => {
    setInput('');
    onSearch('');
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
      <NavButton to={ROUTES.ABOUT}>About</NavButton>
    </div>
  );
};

export default TopControls;
