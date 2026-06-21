'use client';

import useLocalStorage from '../../hooks/localStorage.hook';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/ls';
import TopControls from '../TopControls/TopControls';

const Header = () => {
  const { value: searchQuery, setStorageValue: setSearchQuery } =
    useLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_TEXT, '');

  const handleSearch = (input: string) => {
    if (input === searchQuery) return;

    setSearchQuery(input);
  };
  return (
    <header>
      <h1 className="font-logo text-4xl bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent dark:text-fuchsia-200 mt-8">
        Pokémon Search
      </h1>
      <TopControls searchQuery={searchQuery} onSearch={handleSearch} />
    </header>
  );
};

export default Header;
