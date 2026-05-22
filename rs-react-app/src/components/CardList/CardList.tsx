import Card from '../Card/Card';
import getPokemonParams from '../../utils/getPokemonParams';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';
import type { PokemonType } from '../../api/fetchPokemons';

type Props = {
  pokemons: PokemonType[] | null;
};

const CardList = ({ pokemons }: Props) => {
  const { page } = useParams();

  const currentPage = Number(page) || 1;

  return (
    <ul className="mt-6 flex gap-4 flex-wrap justify-center">
      {pokemons &&
        pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link to={ROUTES.TO_DETAILED_VIEW(currentPage, pokemon.name)}>
              <Card
                title={pokemon.name}
                src={pokemon.sprites.front_default}
                description={getPokemonParams(pokemon.height, pokemon.weight)}
              />
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default CardList;
