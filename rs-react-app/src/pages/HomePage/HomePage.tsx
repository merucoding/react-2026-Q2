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
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import {
  selectIsPokemonListLoading,
  selectPokemonList,
  selectPokemonListErrorMessage,
  selectPokemonListTotalPage,
} from '../../store/pokemonList/pokemonListSelector';
import { fetchPokemonList } from '../../store/pokemonList/pokemonListAsyncThunk';
import Flyout from '../../components/Flyout/Flyout';
import {
  selectSelectedPokemonIds,
  selectSelectedPokemonLength,
} from '../../store/selectedList/selectedListSelector';
import { clearList } from '../../store/selectedList/selectedListSlice';
import savePokemonList from '../../services/savePokemonList';

const HomePage = () => {
  const { page, detailsId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentPage = Number(page) || 1;

  const offset = (currentPage - 1) * _limitPerPage;

  const pokemonList = useAppSelector(selectPokemonList);
  const isLoading = useAppSelector(selectIsPokemonListLoading);
  const errorMessage = useAppSelector(selectPokemonListErrorMessage);
  const totalPage = useAppSelector(selectPokemonListTotalPage);
  const selectedPokemonIds = useAppSelector(selectSelectedPokemonIds);
  const selectedPokemonLength = useAppSelector(selectSelectedPokemonLength);

  const { value: searchText, setStorageValue: setSearchText } = useLocalStorage(
    LOCAL_STORAGE_KEYS.SEARCH_TEXT,
    ''
  );

  const isCardDetailsOpen = Boolean(detailsId);

  useEffect(() => {
    dispatch(fetchPokemonList({ searchText, offset }));
  }, [dispatch, offset, searchText]);

  useEffect(() => {
    const pageToNum = Number(page);

    if (isNaN(pageToNum) || pageToNum < 1) {
      navigate(ROUTES.NOT_FOUND);
    }

    if (!isLoading && !errorMessage && currentPage > totalPage) {
      navigate(ROUTES.NOT_FOUND);
    }
  }, [currentPage, errorMessage, isLoading, navigate, page, totalPage]);

  const handleSearch = (input: string) => {
    if (input === searchText) return;

    setSearchText(input);
  };

  const handleUnselectAll = () => {
    dispatch(clearList());
  };

  const handleDownload = () => {
    if (!pokemonList) return;

    const selectedPokemonData = pokemonList.filter((pokemon) =>
      selectedPokemonIds.includes(pokemon.id)
    );

    savePokemonList(selectedPokemonData);
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
      {selectedPokemonLength > 0 && (
        <Flyout
          selectedCount={selectedPokemonLength}
          onUnselectAll={handleUnselectAll}
          onDownload={handleDownload}
        />
      )}
    </main>
  );
};

export default HomePage;
