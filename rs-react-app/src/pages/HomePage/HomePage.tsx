import CardList from '../../components/CardList/CardList';
import PaginationControls from '../../components/Pagination/PaginationControls';
import Flyout from '../../components/Flyout/Flyout';
import { notFound } from 'next/navigation';
import { _limitPerPage } from '../../api/pokemonApi/constants';
import { getPokemonNameList } from '../../api/pokemonApi/pokemonList/getPokemonNameList';

type Props = {
  params: Promise<{
    page: string;
  }>;
  searchParams: Promise<{
    search?: string;
  }>;
};

const HomePage = async ({ params, searchParams }: Props) => {
  const { page } = await params;
  const { search } = await searchParams;

  const currentPage = Number(page);

  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const searchQuery = search?.trim().toLowerCase() ?? '';

  const offset = (currentPage - 1) * _limitPerPage;

  const data = searchQuery
    ? {
        pokemonNameList: [searchQuery],
        totalPage: 1,
      }
    : await getPokemonNameList(offset);

  if (data.totalPage > 1 && currentPage > data.totalPage) {
    notFound();
  }

  return (
    <>
      <CardList
        pokemonNameList={data.pokemonNameList}
        currentPage={currentPage}
      />
      <PaginationControls page={currentPage} totalPage={data.totalPage} />

      <Flyout />
    </>
  );
};

export default HomePage;
