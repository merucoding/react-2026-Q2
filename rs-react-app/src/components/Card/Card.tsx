import { BORDER_STYLE } from '../../shared/constants/styles';
import DEFAULT_IMAGE from '../../assets/balls.jpg';
import Button from '../Button/Button';
import NavButton from '../NavButton/NavButton';
import { ROUTES } from '../../shared/constants/routes';
import { X as CloseIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import SelectCardCheckbox from '../SelectCardCheckbox/SelectCardCheckbox';
import getPokemonTypes from '../../utils/getPokemonTypes';
import getPokemonAbilities from '../../utils/getPokemonAbilities';
import { getErrorMessage } from '../../api/getErrorMessage';
import { useGetPokemonByNameQuery } from '../../api/pokemonApi/pokemonByName/pokemonByNameApi';

type Props = {
  pokemon: string;
  detailed?: boolean;
};

const playCry = (url: string) => {
  const audio = new Audio(url);
  audio.play();
};

const Card = ({ pokemon, detailed = false }: Props) => {
  const { page } = useParams();

  const { data, isLoading, isError, error } = useGetPokemonByNameQuery(pokemon);

  if (isError)
    return (
      <div className="mt-[50%] text-fuchsia-400 font-bold text-lg">
        {getErrorMessage(error)}
      </div>
    );

  if (isLoading) return <Spinner />;

  if (!data) return null;

  const currentPage = Number(page) || 1;

  const { name, src, description, cries, types, abilities, moves } = data;

  return (
    <Link to={ROUTES.TO_DETAILED_VIEW(currentPage, name)}>
      <div
        className={`${BORDER_STYLE} p-2 flex flex-col items-center gap-y-2 aspect-square text-sm [&_p]:text-fuchsia-400 [&_ul]:text-sm [&_ul]:list-disc ${detailed ? 'w-full mt-6' : 'w-50'} relative dark:[&_p]:text-emerald-500`}
      >
        {detailed && (
          <NavButton to={ROUTES.TO_PAGE(currentPage)} className="ml-auto">
            <CloseIcon />
          </NavButton>
        )}
        <div
          className={`border-b border-fuchsia-300 w-full text-center ${!detailed && 'h-25'} dark:border-fuchsia-400`}
        >
          <img
            className={`max-h-full rounded-xl inline-block ${detailed && 'w-50 h-50'}`}
            src={src || DEFAULT_IMAGE}
          />
        </div>
        <h2
          className={`text-fuchsia-400 font-bold text-lg ${!detailed && 'line-clamp-1'} dark:text-emerald-500`}
        >
          {name}
        </h2>

        <h3>{description}</h3>
        {detailed && (
          <>
            <Button onClick={() => playCry(cries)}>hear the Pokémon</Button>
            <p>types:</p>
            <ul>{getPokemonTypes(types)}</ul>
            <p>abilities:</p>
            <ul>{getPokemonAbilities(abilities)}</ul>
            <p>moves:</p>
            <div>{moves}</div>
          </>
        )}
        {!detailed && <SelectCardCheckbox pokemon={data} />}
      </div>
    </Link>
  );
};

export default Card;
