import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationPlayer({
  page,
  totalContent,
  onPageChange,
  limit = 3,
}) {
  const totalPage = Math.ceil(totalContent / limit);

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      onPageChange(page + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const startPage = Math.max(1, page - Math.floor(limit / 2));
  const endPage = Math.min(totalPage, startPage + limit - 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}
        {[...Array(endPage - startPage + 1)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={page === startPage + index}
              onClick={() => handlePageChange(startPage + index)}
            >
              {startPage + index}
            </PaginationLink>
          </PaginationItem>
        ))}
        {endPage < totalPage && (
          <>
            {endPage < totalPage - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(totalPage)}>
                {totalPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
