import React from "react";
import { v4 as uuidv4 } from "uuid";

import * as S from "./CustomTable.styled";

function CustomTablePagination({ instance }) {
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = instance;

  const generateNumButton = (v, i, array) => {
    if (array[i - 1] + 2 < v) {
      return (
        <div key={uuidv4()}>
          <S.ButtonSpace>...</S.ButtonSpace>
          <S.NumButton
            onClick={() => gotoPage(v - 1)}
            active={v === pageIndex + 1}>
            {v}
          </S.NumButton>
        </div>
      );
    } else if (array[i - 1] + 2 === v) {
      return (
        <>
          <S.NumButton
            key={uuidv4()}
            onClick={() => gotoPage(v - 2)}
            active={v === pageIndex}>
            {v - 1}
          </S.NumButton>
          <S.NumButton
            key={uuidv4()}
            onClick={() => gotoPage(v - 1)}
            active={v === pageIndex + 1}>
            {v}
          </S.NumButton>
        </>
      );
    } else {
      return (
        <S.NumButton
          key={uuidv4()}
          onClick={() => gotoPage(v - 1)}
          active={v === pageIndex + 1}>
          {v}
        </S.NumButton>
      );
    }
  };

  const filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter((page) => page <= totalPages);
  };

  const getVisiblePages = (page, total) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  return (
    <S.PaginationWrapper>
      <S.RowsInfo>
        <S.SelectRows
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 50, 100].map((pageSize) => (
            <S.OptionRows
              key={pageSize}
              value={pageSize}>
              Show {pageSize}
            </S.OptionRows>
          ))}
        </S.SelectRows>
      </S.RowsInfo>
      <S.Pagination>
        <S.PrevButton
          onClick={() => previousPage()}
          disabled={!canPreviousPage}>
          {"Previous"}
        </S.PrevButton>
        {getVisiblePages(pageIndex + 1, pageOptions.length).map(generateNumButton)}
        <S.NextButton
          onClick={() => nextPage()}
          disabled={!canNextPage}>
          {"Next"}
        </S.NextButton>{" "}
      </S.Pagination>
    </S.PaginationWrapper>
  );
}

export default CustomTablePagination;
