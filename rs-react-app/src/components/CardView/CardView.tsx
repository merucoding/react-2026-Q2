import { CARD_STYLE } from '../../shared/constants/styles';
import DEFAULT_IMAGE from '../../assets/balls.jpg';
import Button from '../Button/Button';
import getPokemonTypes from '../../utils/getPokemonTypes';
import getPokemonAbilities from '../../utils/getPokemonAbilities';
import type { PokemonCard } from '../../types/pokemonTypes';
import type { ReactNode } from 'react';
import { cn } from '../../utils/ui';

type Props = {
  pokemon: PokemonCard;
  detailed: boolean;
  children?: ReactNode;
  onClick: () => void;
};

const playCry = (url: string) => {
  const audio = new Audio(url);
  audio.play();
};

const CardView = ({ pokemon, detailed, children, onClick }: Props) => {
  const { name, src, description, cries, types, abilities, moves } = pokemon;

  return (
    <div
      className={cn(CARD_STYLE.container, detailed ? 'w-full mt-6' : 'w-50')}
      onClick={onClick}
    >
      {children}
      <div className={cn(CARD_STYLE.imageContainer, detailed ? '' : 'h-25')}>
        <img
          className={cn(CARD_STYLE.image, detailed ? 'w-50 h-50' : '')}
          src={src || DEFAULT_IMAGE}
        />
      </div>
      <h2 className={cn(CARD_STYLE.title, detailed ? '' : 'line-clamp-1')}>
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
    </div>
  );
};

export default CardView;
