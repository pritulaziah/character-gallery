import styled from "@emotion/styled/macro";
import IconLeft from "components/Icons/Left";
import IconRight from "components/Icons/Right";
import React, { useMemo } from "react";
import PaginationButton from "./PaginationButton";

interface IProps {
  currentPage: number;
  totalPage: number;
  pageCount?: number;
  onChangePage: (page: number) => void;
}

interface PaginationItem {
  label: string;
  page: number;
  active?: boolean;
}

const StylesPagination = styled("ul")`
  display: flex;
  list-style: none;
  align-items: center;
  padding: 8px;
  justify-content: center;
  list-style: none;
  margin: 0;
`;

const Pagination = ({
  currentPage,
  totalPage,
  pageCount = 2,
  onChangePage,
}: IProps) => {
  const pagination = useMemo(() => {
    const createPaginationItem = (page: number): PaginationItem => ({
      label: String(page),
      page,
      active: currentPage === page,
    });

    const left = currentPage - pageCount;
    const right = currentPage + pageCount + 1;
    const range = [];
    const rangeWithDots: PaginationItem[] = [];
    let l: number;

    for (let i = 1; i <= totalPage; i += 1) {
      if (i === 1 || i === totalPage || (i >= left && i <= right)) {
        range.push(i);
      } else if (i < left) {
        i = left - 1;
      } else if (i > right) {
        range.push(totalPage);
        break;
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(createPaginationItem(l + 1));
        } else if (i - l !== 1) {
          rangeWithDots.push({
            label: "...",
            page:
              i < currentPage
                ? Math.floor(currentPage / 2)
                : currentPage + Math.floor((pageCount - currentPage) / 2),
          });
        }
      }
      rangeWithDots.push(createPaginationItem(i));
      l = i;
    });

    return rangeWithDots;
  }, [currentPage, pageCount, totalPage]);

  const createProps = (page: number) => {
    return {
      role: "button",
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onChangePage(page);
      },
    };
  };

  return (
    <StylesPagination>
      {currentPage >= 2 && (
        <li>
          <PaginationButton aria-label="prev" {...createProps(currentPage - 1)}>
            <IconLeft size="12px" />
          </PaginationButton>
        </li>
      )}
      {pagination.map((paginationItem) => (
        <PaginationButton
          aria-label={`page ${paginationItem.page}`}
          key={paginationItem.page}
          active={!!paginationItem.active}
          {...createProps(paginationItem.page)}
        >
          {paginationItem.label}
        </PaginationButton>
      ))}
      {currentPage < totalPage && (
        <li>
          <PaginationButton aria-label="next" {...createProps(currentPage + 1)}>
            <IconRight size="12px" />
          </PaginationButton>
        </li>
      )}
    </StylesPagination>
  );
};

export default Pagination;
