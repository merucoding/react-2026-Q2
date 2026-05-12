import type { Pokemon } from 'pokeapi-typescript';
import Card from '../Card/Card';

type Props = {
  pokemons: Pokemon[];
};

const CardList = ({ pokemons }: Props) => {
  return (
    <ul className="mt-6 flex gap-4 flex-wrap justify-center">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
    </ul>
  );
};

export default CardList;
