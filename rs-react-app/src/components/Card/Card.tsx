import { ROUTES } from '../../shared/constants/routes';
import { Link, useParams } from 'react-router-dom';
import { useGetPokemonByNameQuery } from '../../api/pokemonApi/pokemonByName/pokemonByNameApi';
import { QueryStateWrapper } from '../QueryStateWrapper/QueryStateWrapper';
import CardView from '../CardView/CardView';
import NavButton from '../NavButton/NavButton';
import { X as CloseIcon } from 'lucide-react';
import SelectCardCheckbox from '../SelectCardCheckbox/SelectCardCheckbox';

type Props = {
  pokemon: string;
  detailed?: boolean;
};

const Card = ({ pokemon, detailed = false }: Props) => {
  const { page } = useParams();

  const currentPage = Number(page) || 1;

  const { data, isLoading, error, isSuccess } =
    useGetPokemonByNameQuery(pokemon);

  return (
    <QueryStateWrapper isLoading={isLoading} error={error}>
      {isSuccess && (
        <Link to={ROUTES.TO_DETAILED_VIEW(currentPage, data.name)}>
          <CardView pokemon={data} detailed={detailed}>
            {detailed ? (
              <NavButton to={ROUTES.TO_PAGE(currentPage)} className="ml-auto">
                <CloseIcon />
              </NavButton>
            ) : (
              <SelectCardCheckbox pokemon={data} />
            )}
          </CardView>
        </Link>
      )}
    </QueryStateWrapper>
  );
};

export default Card;
