import { ROUTES } from '@/shared/constants/routes';
import { BORDER_STYLE } from '@/shared/constants/styles';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from './Pagination';

type Props = {
  page: number;
  totalPage: number;
};

const PaginationControls = ({ page, totalPage }: Props) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPage;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={ROUTES.TO_PAGE(1)}
            disabled={isFirstPage}
            icon="start"
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={ROUTES.TO_PAGE(page - 1)}
            disabled={isFirstPage}
            icon="previous"
          />
        </PaginationItem>

        <PaginationItem
          className={BORDER_STYLE + 'pointer-events-none select-none'}
        >
          {page} / {totalPage}
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={ROUTES.TO_PAGE(page + 1)}
            disabled={isLastPage}
            icon="next"
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={ROUTES.TO_PAGE(totalPage)}
            disabled={isLastPage}
            icon="end"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
