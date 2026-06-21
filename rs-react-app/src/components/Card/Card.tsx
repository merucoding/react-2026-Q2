'use client';

import { ROUTES } from '../../shared/constants/routes';
import { useParams, useRouter } from 'next/navigation';
import { useGetPokemonByNameQuery } from '../../api/pokemonApi/pokemonByName/pokemonByNameApi';
import { QueryStateWrapper } from '../QueryStateWrapper/QueryStateWrapper';
import CardView from '../CardView/CardView';
import SelectCardCheckbox from '../SelectCardCheckbox/SelectCardCheckbox';

type Props = {
  pokemonName: string;
};

const Card = ({ pokemonName }: Props) => {
  const { page } = useParams() as { page: string };
  const router = useRouter();

  const currentPage = Number(page) || 1;

  const { data, isFetching, error, isSuccess } =
    useGetPokemonByNameQuery(pokemonName);

  return (
    <QueryStateWrapper isLoading={isFetching} error={error}>
      {isSuccess && (
        <CardView
          title={data.name}
          src={data.src}
          description={data.description}
          onClick={() =>
            router.push(ROUTES.TO_DETAILED_VIEW(currentPage, data.name))
          }
        >
          <SelectCardCheckbox pokemon={data} />
        </CardView>
      )}
    </QueryStateWrapper>
  );
};

export default Card;
