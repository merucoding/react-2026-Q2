import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetPokemonByNameQuery } from '../../api/pokemonApi/pokemonByName/pokemonByNameApi';
import { QueryStateWrapper } from '../../components/QueryStateWrapper/QueryStateWrapper';
import CardView from '../../components/CardView/CardView';
import NavButton from '../../components/NavButton/NavButton';
import { X as CloseIcon } from 'lucide-react';
import { ROUTES } from '../../shared/constants/routes';
import getDetailsList from '../../utils/getDetailsList';

const CardDetails = () => {
  const { detailsId, page } = useParams();

  const currentPage = Number(page) || 1;

  const { data, isFetching, error, isSuccess } = useGetPokemonByNameQuery(
    detailsId ?? skipToken
  );

  const detailsList = isSuccess ? getDetailsList(data) : [];

  return (
    <div className="sticky top-4">
      <QueryStateWrapper isLoading={isFetching} error={error}>
        {isSuccess && (
          <CardView
            title={data.name}
            src={data.src}
            description={data.description}
            details={{
              cries: data.cries,
              detailsList,
            }}
          >
            <NavButton to={ROUTES.TO_PAGE(currentPage)} className="ml-auto">
              <CloseIcon />
            </NavButton>
          </CardView>
        )}
      </QueryStateWrapper>
    </div>
  );
};

export default CardDetails;
