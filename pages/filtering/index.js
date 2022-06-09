import React, { useEffect, useMemo } from "react";
import { useTable, usePagination, useRowSelect, useFilters, useGlobalFilter } from "react-table";
import {
  data,
  DefaultColumnFilter,
  filteringColumns,
  fuzzyTextFilterFn,
} from "CustomTable/CustomTable.constant";
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
import CustomTableSearch from "../../CustomTable/CustomTable.search";
import useToggle from "../../hooks/useToggle";
import CustomTableBackdrop from "../../CustomTable/CustomTable.backdrop";

function BasicTable({ columns, data }) {
  const [isToggle, toggle] = useToggle();

  useEffect(() => {
    console.log(isToggle);
  }, [isToggle]);

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

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: "",
    }),
    [],
  );

  const instance = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
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
        <CustomTableSearch instance={instance} />
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
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
                    onClick={toggle}
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
      </S.TableWrapper>

      {isToggle && (
        <CustomTableBackdrop
          data={data}
          columns={columns}
          isToggle={isToggle}
          toggle={toggle}
        />
      )}
    </>
  );
}

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <BasicTable
        columns={filteringColumns}
        data={data}
      />
    </div>
  );
}

export default App;
