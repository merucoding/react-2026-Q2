import Card from '../Card/Card';
import getPokemonParams from '../../utils/getPokemonParams';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';
import { useAppSelector } from '../../store/hooks/redux';
import { selectPokemonList } from '../../store/pokemonList/pokemonListSelector';
import SelectCardCheckbox from '../SelectCardCheckbox/SelectCardCheckbox';

const CardList = () => {
  const { page } = useParams();

  const pokemonList = useAppSelector(selectPokemonList);

  if (!pokemonList?.length) return;

  const currentPage = Number(page) || 1;

  return (
    <ul className="mt-6 flex gap-4 flex-wrap justify-center">
      {pokemonList.map((pokemon) => (
        <li key={pokemon.id}>
          <Link to={ROUTES.TO_DETAILED_VIEW(currentPage, pokemon.name)}>
            <Card
              title={pokemon.name}
              src={pokemon.sprites.front_default}
              description={getPokemonParams(pokemon.height, pokemon.weight)}
            >
              <SelectCardCheckbox pokemon={pokemon} />
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CardList;
