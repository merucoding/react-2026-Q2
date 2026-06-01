import { ROUTES } from '../../shared/constants/routes';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonByNameQuery } from '../../api/pokemonApi/pokemonByName/pokemonByNameApi';
import { QueryStateWrapper } from '../QueryStateWrapper/QueryStateWrapper';
import CardView from '../CardView/CardView';
import SelectCardCheckbox from '../SelectCardCheckbox/SelectCardCheckbox';

type Props = {
  pokemonName: string;
};

const Card = ({ pokemonName }: Props) => {
  const { page } = useParams();
  const navigate = useNavigate();

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
            navigate(ROUTES.TO_DETAILED_VIEW(currentPage, data.name))
          }
        >
          <SelectCardCheckbox pokemon={data} />
        </CardView>
      )}
    </QueryStateWrapper>
  );
};

export default Card;
