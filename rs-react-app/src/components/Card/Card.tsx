import { getPokemonByName } from '@/api/pokemonApi/pokemonByName/getPokemonByName';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/shared/constants/routes';
import CardView from '../CardView/CardView';
import { ErrorContent } from '../ErrorContent/ErrorContent';
import SelectCardCheckbox from '../SelectCardCheckbox/SelectCardCheckbox';

type Props = {
  pokemonName: string;
  currentPage: number;
};

const Card = async ({ pokemonName, currentPage }: Props) => {
  const data = await getPokemonByName(pokemonName);

  if (!data) {
    return <ErrorContent message="Pokemon not found" />;
  }

  return (
    <div className="relative">
      <Link
        href={ROUTES.TO_DETAILED_VIEW(currentPage, data.name)}
        className="block"
      >
        <CardView
          title={data.name}
          src={data.src}
          description={data.description}
        />
      </Link>

      <div className="absolute top-2 right-2 z-10">
        <SelectCardCheckbox pokemon={data} />
      </div>
    </div>
  );
};

export default Card;
