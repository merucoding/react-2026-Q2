import { BORDER_STYLE } from '../../shared/constants/styles';
import DEFAULT_IMAGE from '../../assets/balls.jpg';
import type { ReactElement } from 'react';
import Button from '../Button/Button';
import NavButton from '../NavButton/NavButton';
import { ROUTES } from '../../shared/constants/routes';
import { X as CloseIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import SelectCard from '../SelectCard/SelectCard';

type Props = {
  title: string;
  src: string;
  description: string;
  detailed?: boolean;
  types?: ReactElement[] | null;
  abilities?: ReactElement[] | null;
  cries?: string;
  moves?: string;
  id?: number;
};

const playCry = (url: string) => {
  const audio = new Audio(url);
  audio.play();
};

const Card = ({
  title,
  src,
  description,
  detailed = false,
  types,
  abilities,
  cries,
  moves,
  id,
}: Props) => {
  const { page } = useParams();

  const currentPage = Number(page) || 1;

  return (
    <div
      className={`${BORDER_STYLE} p-2 flex flex-col items-center gap-y-2 aspect-square text-sm [&_p]:text-fuchsia-400 [&_ul]:text-sm [&_ul]:list-disc ${detailed ? 'w-full mt-6' : 'w-50'} ${id ? 'relative' : ''}`}
    >
      {detailed && (
        <NavButton to={ROUTES.TO_PAGE(currentPage)} className="ml-auto">
          <CloseIcon />
        </NavButton>
      )}
      <div
        className={`border-b border-fuchsia-300 w-full text-center ${!detailed && 'h-25'}`}
      >
        <img
          className={`max-h-full rounded-xl inline-block ${detailed && 'w-50 h-50'}`}
          src={src || DEFAULT_IMAGE}
        />
      </div>
      <h2
        className={`text-fuchsia-400 font-bold text-lg ${!detailed && 'line-clamp-1'}`}
      >
        {title}
      </h2>

      <h3>{description}</h3>
      {cries && (
        <Button onClick={() => playCry(cries)}>hear the Pokémon</Button>
      )}
      {types && (
        <>
          <p>types:</p>
          <ul>{types}</ul>
        </>
      )}
      {abilities && (
        <>
          <p>abilities:</p>
          <ul>{abilities}</ul>
        </>
      )}
      {moves && (
        <>
          <p>moves:</p>
          <div>{moves}</div>
        </>
      )}
      {id && <SelectCard pokemonId={id} />}
    </div>
  );
};

export default Card;
