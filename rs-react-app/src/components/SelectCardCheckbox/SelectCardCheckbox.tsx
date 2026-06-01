import type { ChangeEvent } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import {
  addToList,
  deleteFromList,
} from '../../store/selectedList/selectedListSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { selectIsPokemonSelected } from '../../store/selectedList/selectedListSelector';
import type { PokemonCard } from '../../types/pokemonTypes';

type Props = {
  pokemon: PokemonCard;
};

const SelectCardCheckbox = ({ pokemon }: Props) => {
  const dispatch = useAppDispatch();

  const isSelected = useAppSelector(selectIsPokemonSelected(pokemon.id));

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      dispatch(addToList(pokemon));
    } else {
      dispatch(deleteFromList(pokemon.id));
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

export default SelectCardCheckbox;
