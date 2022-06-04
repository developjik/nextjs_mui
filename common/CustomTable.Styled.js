import styled from "@emotion/styled";

export const TableTitleWrapper = styled.div``;

export const TableTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 0;
  border-radius: 4px 4px 0 0;
`;

export const TableTitleContent = styled.div`
  margin-right: 12px;
`;

export const TableWrapper = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TableContainer = styled.div`
  padding: 20px;
  display: block;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  table {
    border-radius: 4px;
    
    * Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    
     tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
     }
      
      th,
    td {
    text-align: center;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
      
      
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 0;
  border-radius: 0 0 4px 4px;
  background-color: ${({ theme }) => theme.colors.darkGray};
`;

export const RowsInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectRows = styled.select`
  padding: 0 4px;
  margin-left: 8px;
  font-size: 14px;
`;

export const OptionRows = styled.option``;

export const PaginationButton = styled.button`
  width: 38px;
  height: 38px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  &:not(:first-of-type) {
    margin-left: 4px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBlue};
  }
`;

export const NumButton = styled(PaginationButton)`
  color: ${({ active, theme }) => (active ? theme.colors.black : theme.colors.disabledGray)};
  border: ${({ active, theme }) => (active ? "1px solid #c1c6cf" : "1px solid transparent")};
`;

export const PrevButton = styled(PaginationButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: unset;
`;

export const NextButton = styled(PaginationButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: unset;
`;

export const ButtonSpace = styled(PaginationButton)`
  cursor: unset;
  color: #333;
  &:not(:first-of-type) {
    margin-left: 4px;
  }
  &:hover {
    background-color: unset;
  }
`;
