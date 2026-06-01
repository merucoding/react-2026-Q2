import Card from '../Card/Card';

type Props = {
  pokemonNameList: string[];
};

const CardList = ({ pokemonNameList }: Props) => {
  if (!pokemonNameList?.length) return null;

  return (
    <ul className="mt-6 flex gap-4 flex-wrap justify-center">
      {pokemonNameList.map((pokemon) => (
        <li key={pokemon}>
          <Card pokemon={pokemon} />
        </li>
      ))}
    </ul>
  );
};

export default CardList;
