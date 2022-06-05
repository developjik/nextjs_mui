import React from "react";
import {
  Backdrop,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { usePagination, useRowSelect, useTable } from "react-table";
import IndeterminateCheckbox from "./CustomTable.interminateCheckbox";
import * as S from "./CustomTable.styled";
import { v4 as uuidv4 } from "uuid";
import CustomTablePagination from "./CustomTable.pagination";
import CustomTableBackdropTitle from "./CustomTable.backdrop.title";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 10,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "0 0 4px 4px",
    maxHeight: "60vh",
    backgroundColor: theme.colors.white,
  },
  table: {
    border: `1px solid ${theme.colors.border}`,
  },
  head: {},
  body: {
    maxHeight: "50vh",
    overflowY: "scroll",
  },
  headRow: {
    backgroundColor: theme.colors.darkGray,
    border: `1px solid ${theme.colors.border}`,
    borderBottom: 0,
    borderRight: 0,
  },
  row: {
    cursor: "pointer",
    borderLeft: `1px solid ${theme.colors.border}`,

    // "&:hover": {
    //   backgroundColor: theme.colors.primary,
    // },
    // "&:hover td": {
    //   color: theme.colors.white,
    // },
  },

  headCell: {
    borderRight: `1px solid ${theme.colors.border}`,
  },
  cell: {
    "&:first-child": {
      width: "44px",
    },
    borderRight: `1px solid ${theme.colors.border}`,
  },
}));

function CustomTableBackdrop({ columns, data, isToggle, toggle }) {
  const classes = useStyles();
  const instance = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
  );

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    state: { selectedRowIds },
  } = instance;

  return (
    <Backdrop
      className={classes.backdrop}
      open={isToggle}
      onClick={toggle}>
      <CustomTableBackdropTitle
        title={"title"}
        toggle={toggle}
      />
      <S.BackDropTableWrapper>
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            padding={"none"}
            {...getTableProps()}>
            <TableHead className={classes.head}>
              {headerGroups.map((headerGroup) => (
                <TableRow
                  key={uuidv4()}
                  className={classes.headRow}
                  {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      key={uuidv4()}
                      className={classes.headCell}
                      align={"center"}
                      {...column.getHeaderProps({
                        className: column.collapse ? "collapse" : "",
                      })}>
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody className={classes.body}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <TableRow
                    key={uuidv4()}
                    className={classes.row}
                    hover
                    {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell
                          key={uuidv4()}
                          className={classes.cell}
                          align={"center"}
                          {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomTablePagination instance={instance} />
      </S.BackDropTableWrapper>
    </Backdrop>
  );
}

export default CustomTableBackdrop;
