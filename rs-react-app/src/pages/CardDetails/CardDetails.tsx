import { notFound } from 'next/navigation';
import { X as CloseIcon } from 'lucide-react';
import CardView from '@/components/CardView/CardView';
import NavButton from '@/components/NavButton/NavButton';
import { ROUTES } from '@/shared/constants/routes';
import getDetailsList from '@/utils/getDetailsList';
import { getPokemonByName } from '@/api/pokemonApi/pokemonByName/getPokemonByName';

type Props = {
  pokemonName: string;
  currentPage: number;
};

const CardDetails = async ({ pokemonName, currentPage }: Props) => {
  const data = await getPokemonByName(pokemonName);

  if (!data) {
    notFound();
  }

  const detailsList = getDetailsList(data);

  return (
    <div className="sticky top-4">
      <CardView
        title={data.name}
        src={data.src}
        description={data.description}
        details={{
          cries: data.cries,
          detailsList,
        }}
      >
        <NavButton href={ROUTES.TO_PAGE(currentPage)} className="ml-auto">
          <CloseIcon />
        </NavButton>
      </CardView>
    </div>
  );
};

export default CardDetails;
