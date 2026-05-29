import Card from '../Card/Card';

type Props = {
  pokemonList: string[];
};

const CardList = ({ pokemonList }: Props) => {
  if (!pokemonList?.length) return null;

  return (
    <ul className="mt-6 flex gap-4 flex-wrap justify-center">
      {pokemonList.map((pokemon) => (
        <li key={pokemon}>
          <Card pokemon={pokemon} />
        </li>
      ))}
    </ul>
  );
};

export default CardList;
