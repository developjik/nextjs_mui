import React from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import { data, columns } from "CustomTable/CustomTable.constant";
import { v4 as uuidv4 } from "uuid";
import CustomTablePagination from "../../CustomTable/CustomTable.pagination";
import CustomTableTitle from "../../CustomTable/CustomTable.title";
import IndeterminateCheckbox from "../../CustomTable/CustomTable.interminateCheckbox";

import * as S from "../../CustomTable/CustomTable.styled";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from "@material-ui/core";

function BasicTable({ columns, data }) {
  const useStyles = makeStyles((theme) => ({
    container: {
      border: `1px solid ${theme.colors.border}`,
      borderRadius: "0 0 4px 4px",
      maxHeight: "60vh",
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
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    selectedFlatRows,
    state: { selectedRowIds },
  } = instance;

  return (
    <>
      <CustomTableTitle
        title={"basic"}
        instance={instance}
      />

      <S.TableWrapper>
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
              {page.map((row, i) => {
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
      </S.TableWrapper>
      <CustomTablePagination instance={instance} />
    </>
  );
}

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <BasicTable
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default App;
