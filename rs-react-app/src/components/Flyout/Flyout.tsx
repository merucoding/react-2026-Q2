import savePokemonList from '../../services/savePokemonList';
import { BORDER_STYLE } from '../../shared/constants/styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import {
  selectSelectedPokemonLength,
  selectSelectedPokemonList,
} from '../../store/selectedList/selectedListSelector';
import { clearList } from '../../store/selectedList/selectedListSlice';
import Button from '../Button/Button';

const Flyout = () => {
  const dispatch = useAppDispatch();

  const selectedPokemonLength = useAppSelector(selectSelectedPokemonLength);
  const selectedPokemonList = useAppSelector(selectSelectedPokemonList);

  if (selectedPokemonLength < 1) return null;

  const handleUnselectAll = () => {
    dispatch(clearList());
  };

  const handleDownload = () => {
    savePokemonList(selectedPokemonList);
  };

  return (
    <div
      className={`${BORDER_STYLE} fixed bottom-1 left-1 flex items-center gap-4 justify-between bg-white dark:bg-fuchsia-900`}
    >
      <h3 className="text-fuchsia-400 font-bold text-lg dark:text-emerald-500">
        <span>{selectedPokemonLength}</span> Pokémon selected
      </h3>
      <Button onClick={handleUnselectAll}>Unselect all</Button>
      <Button onClick={handleDownload}>Download</Button>
    </div>
  );
};

export default Flyout;
