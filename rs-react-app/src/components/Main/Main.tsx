import { useEffect, useState } from 'react';
import TopControls from '../TopControls/TopControls';
import type { Pokemon } from 'pokeapi-typescript';
import Spinner from '../Spinner/Spinner';
import CardList from '../CardList/CardList';
import { LOCAL_STORAGE_QUERY_KEY } from '../../shared/constants/ls';
import {
  _baseOffset,
  fetchPokemonByName,
  fetchPokemonsList,
} from '../../api/fetchPokemons';

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchText, setSearchText] = useState(
    localStorage.getItem(LOCAL_STORAGE_QUERY_KEY) || ''
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [offset] = useState(_baseOffset);

  const loadPokemons = async (
    searchText: string,
    offset: number
  ): Promise<void> => {
    setLoading(true);

    try {
      const { pokemons, errorMessage } = searchText
        ? await fetchPokemonByName(searchText)
        : await fetchPokemonsList(offset);
      setErrorMessage(errorMessage);
      setPokemons(pokemons);
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

    localStorage.setItem(LOCAL_STORAGE_QUERY_KEY, input);
    setSearchText(input);
  };

  return (
    <main>
      <TopControls onSearch={handleSearch} />
      {loading && <Spinner />}
      {errorMessage && (
        <div className="mt-8 text-fuchsia-400 font-bold text-lg">
          {errorMessage}
        </div>
      )}
      {!loading && !errorMessage && <CardList pokemons={pokemons} />}
    </main>
  );
};

export default Main;
