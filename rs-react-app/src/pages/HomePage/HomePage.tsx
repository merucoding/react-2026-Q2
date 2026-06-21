'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useLocalStorage from '../../hooks/localStorage.hook';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/ls';
import CardList from '../../components/CardList/CardList';
import PaginationControls from '../../components/Pagination/PaginationControls';
import { ROUTES } from '../../shared/constants/routes';
import Flyout from '../../components/Flyout/Flyout';
import { _limitPerPage } from '../../api/pokemonApi/pokemonApi';
import { useGetPokemonNameListQuery } from '../../api/pokemonApi/pokemonList/pokemonListApi';
import { QueryStateWrapper } from '../../components/QueryStateWrapper/QueryStateWrapper';

const HomePage = () => {
  const { page } = useParams() as {
    page: string;
  };

  const router = useRouter();

  const currentPage = Number(page) || 1;

  const offset = (currentPage - 1) * _limitPerPage;

  const { value: searchQuery } = useLocalStorage(
    LOCAL_STORAGE_KEYS.SEARCH_TEXT,
    ''
  );

  const { data, isFetching, error } = useGetPokemonNameListQuery(offset);

  const pokemonNameList = searchQuery
    ? [searchQuery]
    : (data?.pokemonNameList ?? []);
  const totalPage = searchQuery ? 1 : (data?.totalPage ?? 1);

  useEffect(() => {
    const pageToNum = Number(page);

    if (isNaN(pageToNum) || pageToNum < 1) {
      router.push(ROUTES.NOT_FOUND);
    }

    if (totalPage > 1 && currentPage > totalPage) {
      router.push(ROUTES.NOT_FOUND);
    }
  }, [currentPage, page, router, totalPage]);

  return (
    <>
      <QueryStateWrapper isLoading={isFetching} error={error}>
        <CardList pokemonNameList={pokemonNameList} />
        <PaginationControls page={currentPage} totalPage={totalPage} />
      </QueryStateWrapper>
      <Flyout />
    </>
  );
};

export default HomePage;
