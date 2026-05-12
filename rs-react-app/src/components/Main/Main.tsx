import { useEffect, useState } from 'react';
import TopControls from '../TopControls/TopControls';
import type { Pokemon } from 'pokeapi-typescript';
import { fetchPokemons } from '../../api/fetchPokemons';
import Spinner from '../Spinner/Spinner';
import CardList from '../CardList/CardList';
import { LOCAL_STORAGE_QUERY_KEY } from '../../shared/constants/ls';

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchText, setSearchText] = useState('');
  const [lastSearchText, setLastSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadPokemons = async (searchText: string): Promise<void> => {
    setLoading(true);

    try {
      const { pokemons, errorMessage } = await fetchPokemons(searchText);
      setErrorMessage(errorMessage);
      setPokemons(pokemons);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_QUERY_KEY) || '';

    setSearchText(saved);
    setLastSearchText(saved);
    loadPokemons(saved);
  }, []);

  const handleSearch = () => {
    const trimmed = searchText.trim();

    if (trimmed !== lastSearchText) {
      localStorage.setItem(LOCAL_STORAGE_QUERY_KEY, trimmed);
      setLastSearchText(trimmed);
      loadPokemons(trimmed);
    }
    setSearchText(trimmed);
  };

  const handleInputChange = setSearchText;

  return (
    <main className="font-lexend-exa text-emerald-500 font-light">
      <TopControls
        value={searchText}
        onSearch={handleSearch}
        onChange={handleInputChange}
      />
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
