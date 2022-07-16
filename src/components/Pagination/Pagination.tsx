import styled from "@emotion/styled/macro";
import { useMemo } from "react";
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
}

const Pagination = ({ currentPage, totalPage, pageCount = 2 }: IProps) => {
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
  }, []);

  return (
    <PaginationList>
      {currentPage >= 2 && (
        <li>
          <Button>Предыдущая</Button>
        </li>
      )}
      {pagination.map((paginationItem) => (
        <PaginationButton active={paginationItem === currentPage}>
          {paginationItem}
        </PaginationButton>
      ))}
      {currentPage < totalPage && (
        <li>
          <Button>Следущая</Button>
        </li>
      )}
    </PaginationList>
  );
};

export default Pagination;
