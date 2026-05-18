import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPokemonByName, type PokemonType } from '../../api/fetchPokemons';
import Spinner from '../../components/Spinner/Spinner';
import Card from '../../components/Card/Card';
import getPokemonParams from '../../utils/getPokemonParams';
import getPokemonTypes from '../../utils/getPokemonTypes';
import getPokemonAbilities from '../../utils/getPokemonAbilities';
import getPokemonMoves from '../../utils/getPokemonMoves';
import { ROUTES } from '../../shared/constants/routes';

const CardDetails = () => {
  const navigate = useNavigate();

  const { detailsId } = useParams();

  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonType>();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!detailsId) return;

    const loadPokemon = async () => {
      setLoading(true);

      try {
        const { pokemons, errorMessage } = await fetchPokemonByName(detailsId);

        setErrorMessage(errorMessage);
        setPokemon(pokemons[0]);
      } catch {
        setErrorMessage('Failed to load pokemon!');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [detailsId]);

  if (errorMessage) navigate(ROUTES.NOT_FOUND);

  return (
    <div className="sticky top-4">
      {loading && <Spinner />}
      {!loading && pokemon && (
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
