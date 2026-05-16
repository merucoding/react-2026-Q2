import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonByName, type PokemonType } from '../../api/fetchPokemons';
import Spinner from '../Spinner/Spinner';
import Card from '../Card/Card';
import getPokemonParams from '../../utils/getPokemonParams';
import getPokemonTypes from '../../utils/getPokemonTypes';
import getPokemonAbilities from '../../utils/getPokemonAbilities';
import getPokemonMoves from '../../utils/getPokemonMoves';

const CardDetails = () => {
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

  return (
    <div>
      {loading && <Spinner />}
      {errorMessage && (
        <div className="mt-8 text-fuchsia-400 font-bold text-lg">
          {errorMessage}
        </div>
      )}
      {!loading && !errorMessage && pokemon && (
        <Card
          title={pokemon.name}
          src={pokemon.sprites.front_default}
          description={getPokemonParams(pokemon.height, pokemon.weight)}
          types={getPokemonTypes(pokemon.types)}
          abilities={getPokemonAbilities(pokemon.abilities)}
          cries={pokemon.cries.latest}
          moves={getPokemonMoves(pokemon.moves)}
          detailed={true}
        />
      )}
    </div>
  );
};

export default CardDetails;
