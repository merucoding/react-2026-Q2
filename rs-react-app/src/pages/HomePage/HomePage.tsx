import { useEffect } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/localStorage.hook';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/ls';
import CardList from '../../components/CardList/CardList';
import PaginationControls from '../../components/Pagination/PaginationControls';
import TopControls from '../../components/TopControls/TopControls';
import { ROUTES } from '../../shared/constants/routes';
import Flyout from '../../components/Flyout/Flyout';
import { _limitPerPage } from '../../api/pokemonApi/pokemonApi';
import { useGetPokemonNameListQuery } from '../../api/pokemonApi/pokemonList/pokemonListApi';
import { QueryStateWrapper } from '../../components/QueryStateWrapper/QueryStateWrapper';

const HomePage = () => {
  const { page, detailsId } = useParams();

  const navigate = useNavigate();

  const currentPage = Number(page) || 1;

  const offset = (currentPage - 1) * _limitPerPage;

  const { value: searchQuery, setStorageValue: setSearchQuery } =
    useLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_TEXT, '');

  const { data, isLoading, error } = useGetPokemonNameListQuery(offset);

  const pokemonNameList = searchQuery
    ? [searchQuery]
    : (data?.pokemonNameList ?? []);
  const totalPage = searchQuery ? 1 : (data?.totalPage ?? 1);

  const isCardDetailsOpen = Boolean(detailsId);

  useEffect(() => {
    const pageToNum = Number(page);

    if (isNaN(pageToNum) || pageToNum < 1) {
      navigate(ROUTES.NOT_FOUND);
    }

    if (totalPage > 1 && currentPage > totalPage) {
      navigate(ROUTES.NOT_FOUND);
    }
  }, [currentPage, navigate, page, totalPage]);

  const handleSearch = (input: string) => {
    if (input === searchQuery) return;

    setSearchQuery(input);
  };

  return (
    <main>
      <TopControls searchQuery={searchQuery} onSearch={handleSearch} />
      <div className="flex gap-x-4">
        <section className={isCardDetailsOpen ? 'w-[75%]' : 'w-full '}>
          <QueryStateWrapper isLoading={isLoading} error={error}>
            <CardList pokemonNameList={pokemonNameList} />
            <PaginationControls page={currentPage} totalPage={totalPage} />
          </QueryStateWrapper>
        </section>
        {isCardDetailsOpen && (
          <aside className="w-[25%]">
            <Outlet />
          </aside>
        )}
      </div>
      <Flyout />
    </main>
  );
};

export default HomePage;
