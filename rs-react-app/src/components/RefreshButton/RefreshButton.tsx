import { pokemonApi } from '../../api/pokemonApi/pokemonApi';
import { useAppDispatch } from '../../store/hooks/redux';
import Button from '../Button/Button';

export const RefreshButton = () => {
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    dispatch(pokemonApi.util.invalidateTags(['PokemonNameList', 'Pokemon']));
  };

  return <Button onClick={handleRefresh}>refresh</Button>;
};
