import { PageButton, Pagination } from "../ProductsPage.styles";

type ProductPaginationProps = {
  currentPage: number;
  totalPages: number;
  t: {
    page: string;
    of: string;
    previous: string;
    next: string;
  };
  onPageChange: (page: number) => void;
};

function ProductPagination({
  currentPage,
  totalPages,
  t,
  onPageChange,
}: ProductPaginationProps) {
  return (
    <Pagination>
      <span>
        {t.page} {currentPage} {t.of} {totalPages}
      </span>

      <div>
        <PageButton
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {t.previous}
        </PageButton>

        <PageButton
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {t.next}
        </PageButton>
      </div>
    </Pagination>
  );
}

export default ProductPagination;
