import { useEffect } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { _limitPerPage } from '../../api/fetchPokemons';
import useLocalStorage from '../../hooks/localStorage.hook';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/ls';
import CardList from '../../components/CardList/CardList';
import PaginationControls from '../../components/Pagination/PaginationControls';
import Spinner from '../../components/Spinner/Spinner';
import TopControls from '../../components/TopControls/TopControls';
import { ROUTES } from '../../shared/constants/routes';
import { selectPokemonList } from '../../store/pokemonList/pokemonListSelectors';
import { fetchPokemonList } from '../../store/pokemonList/pokemonListSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const HomePage = () => {
  const { page, detailsId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentPage = Number(page) || 1;

  const offset = (currentPage - 1) * _limitPerPage;

  const { pokemonList, isLoading, errorMessage, totalPage } =
    useAppSelector(selectPokemonList);

  const { value: searchText, setStorageValue: setSearchText } = useLocalStorage(
    LOCAL_STORAGE_KEYS.SEARCH_TEXT,
    ''
  );

  const isCardDetailsOpen = Boolean(detailsId);

  useEffect(() => {
    const pageToNum = Number(page);

    if (isNaN(pageToNum) || pageToNum < 1) navigate(ROUTES.NOT_FOUND);

    dispatch(fetchPokemonList(offset));
  }, [dispatch, navigate, offset, page]);

  const handleSearch = (input: string) => {
    if (input === searchText) return;

    setSearchText(input);
  };

  return (
    <main>
      <TopControls searchText={searchText} onSearch={handleSearch} />
      <div className="flex gap-x-4">
        <section className={isCardDetailsOpen ? 'w-[75%]' : 'w-full '}>
          {isLoading && <Spinner />}
          {errorMessage && (
            <div className="mt-8 text-fuchsia-400 font-bold text-lg">
              {errorMessage}
            </div>
          )}
          {!isLoading && !errorMessage && (
            <>
              <CardList pokemons={pokemonList} />
              <PaginationControls page={currentPage} totalPage={totalPage} />
            </>
          )}
        </section>
        {isCardDetailsOpen && (
          <aside className="w-[25%]">
            <Outlet />
          </aside>
        )}
      </div>
    </main>
  );
};

export default HomePage;
