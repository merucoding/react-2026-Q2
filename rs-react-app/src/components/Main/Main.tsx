import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopControls from '../TopControls/TopControls';
import type { Pokemon } from 'pokeapi-typescript';
import Spinner from '../Spinner/Spinner';
import CardList from '../CardList/CardList';
import {
  _limitPerPage,
  fetchPokemonByName,
  fetchPokemonsList,
} from '../../api/fetchPokemons';
import PaginationControls from '../Pagination/PaginationControls';
import useLocalStorage from '../../hooks/localStorage.hook';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/ls';

const Main = () => {
  const { page } = useParams();

  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * _limitPerPage;

  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPage, setTotalPage] = useState(1);

  const { value: searchText, setStorageValue: setSearchText } = useLocalStorage(
    LOCAL_STORAGE_KEYS.SEARCH_TEXT,
    ''
  );

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
      setErrorMessage('Something went wrong');
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
    </main>
  );
};

export default Main;
