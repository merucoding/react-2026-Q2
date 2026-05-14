import { BORDER_STYLE } from '../../shared/constants/styles';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationStart,
  PaginationPrevious,
  PaginationNext,
  PaginationEnd,
} from './Pagination';

type Props = {
  page: number;
  totalPage: number;
};

const PaginationControls = ({ page, totalPage }: Props) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPage;
  const classNamesActive = 'cursor-pointer';
  const classNamesDisabled = 'pointer-events-none opacity-50';

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationStart
            to="/pokemons/1"
            className={isFirstPage ? classNamesDisabled : classNamesActive}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            to={`/pokemons/${page - 1}`}
            className={isFirstPage ? classNamesDisabled : classNamesActive}
          />
        </PaginationItem>
        <PaginationItem
          className={BORDER_STYLE + 'pointer-events-none select-none'}
        >
          {page} / {totalPage}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            to={`/pokemons/${page + 1}`}
            className={isLastPage ? classNamesDisabled : classNamesActive}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationEnd
            to={`/pokemons/${totalPage}`}
            className={isLastPage ? classNamesDisabled : classNamesActive}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
