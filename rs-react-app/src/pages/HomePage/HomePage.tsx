import { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import {
  _limitPerPage,
  fetchPokemonByName,
  fetchPokemonsList,
  type PokemonType,
} from '../../api/fetchPokemons';
import useLocalStorage from '../../hooks/localStorage.hook';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/ls';
import CardList from '../../components/CardList/CardList';
import PaginationControls from '../../components/Pagination/PaginationControls';
import Spinner from '../../components/Spinner/Spinner';
import TopControls from '../../components/TopControls/TopControls';

const HomePage = () => {
  const { page, detailsId } = useParams();

  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * _limitPerPage;

  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPage, setTotalPage] = useState(1);

  const { value: searchText, setStorageValue: setSearchText } = useLocalStorage(
    LOCAL_STORAGE_KEYS.SEARCH_TEXT,
    ''
  );

  const isCardDetailsOpen = Boolean(detailsId);

  const loadPokemons = async (
    searchText: string,
    offset: number
  ): Promise<void> => {
    setLoading(true);

    try {
      const { pokemons, errorMessage, totalPage } = searchText
        ? await fetchPokemonByName(searchText)
        : await fetchPokemonsList(offset);

      setErrorMessage(errorMessage);
      setPokemons(pokemons);
      setTotalPage(totalPage);
    } catch {
      setErrorMessage('Failed to load pokemons!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons(searchText, offset);
  }, [searchText, offset]);

  const handleSearch = (input: string) => {
    if (input === searchText) return;

    setSearchText(input);
  };

  return (
    <main>
      <TopControls searchText={searchText} onSearch={handleSearch} />
      <div className="flex gap-x-4">
        <section className={isCardDetailsOpen ? 'w-[75%]' : 'w-full '}>
          {loading && <Spinner />}
          {errorMessage && (
            <div className="mt-8 text-fuchsia-400 font-bold text-lg">
              {errorMessage}
            </div>
          )}
          {!loading && !errorMessage && (
            <>
              <CardList pokemons={pokemons} />
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
