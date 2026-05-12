import type { Pokemon } from 'pokeapi-typescript';
import getPokemonParams from '../../utils/getPokemonParams';
import { BORDER_STYLE } from '../../shared/constants/styles';

type Props = {
  pokemon: Pokemon;
};

const Card = ({ pokemon }: Props) => {
  return (
    <li
      className={`${BORDER_STYLE} p-2 flex flex-col items-center gap-y-2 aspect-square w-[200px]`}
    >
      <div className="h-[100px]">
        <img src={pokemon.sprites.front_default} />
      </div>
      <h2 className="text-fuchsia-400 font-bold text-lg">{pokemon.name}</h2>
      <p className="text-sm">
        {getPokemonParams(pokemon.height, pokemon.weight)}
      </p>
    </li>
  );
};

export default Card;
