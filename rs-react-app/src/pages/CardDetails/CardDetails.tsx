import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Card from '../../components/Card/Card';
import getPokemonParams from '../../utils/getPokemonParams';
import getPokemonTypes from '../../utils/getPokemonTypes';
import getPokemonAbilities from '../../utils/getPokemonAbilities';
import getPokemonMoves from '../../utils/getPokemonMoves';
import { ROUTES } from '../../shared/constants/routes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectPokemon } from '../../store/pokemon/pokemonSelector';
import { fetchPokemon } from '../../store/pokemon/pokemonSlice';

const CardDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { detailsId } = useParams();

  const { pokemon, isLoading, errorMessage } = useAppSelector(selectPokemon);

  useEffect(() => {
    if (!detailsId) return;

    dispatch(fetchPokemon(detailsId));
    // eslint-disable-next-line
  }, [detailsId]);

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
