import { CARD_LIST_STYLE } from '../../shared/constants/styles';
import Card from '../Card/Card';

type Props = {
  pokemonNameList: string[];
};

const CardList = ({ pokemonNameList }: Props) => {
  if (!pokemonNameList?.length) return null;

  return (
    <ul className={CARD_LIST_STYLE}>
      {pokemonNameList.map((pokemon) => (
        <li key={pokemon}>
          <Card pokemon={pokemon} />
        </li>
      ))}
    </ul>
  );
};

export default CardList;
