import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Card from '../../components/Card/Card';
import getPokemonParams from '../../utils/getPokemonParams';
import getPokemonTypes from '../../utils/getPokemonTypes';
import getPokemonAbilities from '../../utils/getPokemonAbilities';
import getPokemonMoves from '../../utils/getPokemonMoves';
import { ROUTES } from '../../shared/constants/routes';
import {
  selectIsPokemonLoading,
  selectPokemonErrorMessage,
  selectPokemon,
} from '../../store/pokemon/pokemonSelector';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { fetchPokemon } from '../../store/pokemon/pokemonAsyncThunk';

const CardDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { detailsId } = useParams();

  const pokemon = useAppSelector(selectPokemon);
  const isLoading = useAppSelector(selectIsPokemonLoading);
  const errorMessage = useAppSelector(selectPokemonErrorMessage);

  useEffect(() => {
    if (!detailsId) return;

    dispatch(fetchPokemon(detailsId));
  }, [detailsId, dispatch]);

  if (errorMessage) navigate(ROUTES.NOT_FOUND);

  return (
    <div className="sticky top-4">
      {isLoading && <Spinner />}
      {!isLoading && pokemon && (
        <Card
          title={pokemon.name}
          src={pokemon.sprites.front_default}
          description={getPokemonParams(pokemon.height, pokemon.weight)}
          types={getPokemonTypes(pokemon.types)}
          abilities={getPokemonAbilities(pokemon.abilities)}
          cries={pokemon.cries.latest}
          moves={getPokemonMoves(pokemon.moves)}
          detailed
        />
      )}
    </div>
  );
};

export default CardDetails;
