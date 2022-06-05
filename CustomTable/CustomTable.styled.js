import styled from "@emotion/styled";

export const TableTitleWrapper = styled.div``;

export const TableTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
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
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const BackDropTableWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0 0 8px 8px;
`;

export const BackDropTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 80vw;
  height: 40px;
  padding: 8px 20px;
  border-radius: 8px 8px 0 0;
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-radius: 4px 4px 0 0;

  svg {
    position: absolute;
    right: 4px;
    width: 44px;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 0;
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
  border: ${({ active }) => (active ? "1px solid #c1c6cf" : "1px solid transparent")};
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
