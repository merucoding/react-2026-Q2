import type { ChangeEvent } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import {
  addToList,
  deleteFromList,
} from '../../store/selectedList/selectedListSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { selectIsPokemonSelected } from '../../store/selectedList/selectedListSelector';

type Props = {
  pokemonId: string;
};

const SelectCard = ({ pokemonId }: Props) => {
  const dispatch = useAppDispatch();

  const isSelected = useAppSelector(selectIsPokemonSelected(pokemonId));

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      dispatch(addToList(pokemonId));
    } else {
      dispatch(deleteFromList(pokemonId));
    }
  };

  return (
    <Checkbox
      checked={isSelected}
      onChange={handleSelect}
      onClick={(event) => event.stopPropagation()}
      className="absolute top-2 right-2"
    />
  );
};

export default SelectCard;
