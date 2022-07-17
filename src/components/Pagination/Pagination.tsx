import styled from "@emotion/styled/macro";
import React, { useMemo } from "react";
import Button from "../Button";
import PaginationButton from "./PaginationButton";

const PaginationList = styled("div")`
  display: flex;
  list-style: none;
  align-items: center;
  padding: 16px;
  justify-content: center;
`;

interface IProps {
  currentPage: number;
  totalPage: number;
  pageCount?: number;
  onChangePage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPage,
  pageCount = 2,
  onChangePage,
}: IProps) => {
  const pagination = useMemo(() => {
    const left = currentPage - pageCount;
    const right = currentPage + pageCount + 1;
    const range = [];
    const rangeWithDots: (string | number)[] = [];
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
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  }, [currentPage, pageCount, totalPage]);

  const createProps = (page: number) => ({
    role: "button",
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onChangePage(page);
    },
  });

  return (
    <PaginationList>
      {currentPage >= 2 && (
        <li>
          <Button aria-label="prev" {...createProps(currentPage - 1)}>
            Prev
          </Button>
        </li>
      )}
      {pagination.map((paginationItem, index) => (
        <PaginationButton
          key={typeof paginationItem === 'number' ? paginationItem : `dot-${index}`}
          active={paginationItem === currentPage}
          {...createProps(
            typeof paginationItem === "number"
              ? paginationItem
              : currentPage + Math.floor((pageCount - currentPage) / 2)
          )}
        >
          {paginationItem}
        </PaginationButton>
      ))}
      {currentPage < totalPage && (
        <li>
          <Button aria-label="next" {...createProps(currentPage + 1)}>
            Next
          </Button>
        </li>
      )}
    </PaginationList>
  );
};

export default Pagination;
