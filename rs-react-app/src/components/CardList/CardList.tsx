import { CARD_LIST_STYLE } from '../../shared/constants/styles';
import Card from '../Card/Card';

type Props = {
  pokemonNameList: string[];
  currentPage: number;
};

const CardList = ({ pokemonNameList, currentPage }: Props) => {
  return (
    <ul className={CARD_LIST_STYLE}>
      {pokemonNameList.map((name) => (
        <li key={name}>
          <Card pokemonName={name} currentPage={currentPage} />
        </li>
      ))}
    </ul>
  );
};

export default CardList;
