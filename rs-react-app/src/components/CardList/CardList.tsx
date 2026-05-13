import type { Pokemon } from 'pokeapi-typescript';
import Card from '../Card/Card';
import getPokemonParams from '../../utils/getPokemonParams';

type Props = {
  pokemons: Pokemon[];
};

const CardList = ({ pokemons }: Props) => {
  return (
    <ul className="mt-6 flex gap-4 flex-wrap justify-center">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <Card
            title={pokemon.name}
            src={pokemon.sprites.front_default}
            description={getPokemonParams(pokemon.height, pokemon.weight)}
          />
        </li>
      ))}
    </ul>
  );
};

export default CardList;
