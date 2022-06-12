import React from "react";
import cx from "classnames";
import {
  useTable,
  usePagination,
  useRowSelect,
  useBlockLayout,
  useFlexLayout,
  useResizeColumns,
} from "react-table";
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
    resizeHandle: {
      position: "absolute",
      cursor: "col-resize",
      zIndex: 100,
      opacity: 0,
      borderLeft: `1px solid ${theme.palette.primary.light}`,
      borderRight: `1px solid ${theme.palette.primary.light}`,
      height: "100%",
      top: 0,
      transition: "all linear 100ms",
      right: -2,
      width: 2,
      "&.handleActive": {
        opacity: 1,
        border: "none",
        backgroundColor: theme.colors.disabledGray,
        top: "2px",
        right: -1,
        width: "4px",
      },
    },
  }));

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    [],
  );

  const classes = useStyles();

  const instance = useTable(
    {
      columns,
      data,
    },
    useFlexLayout,
    useResizeColumns,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        {
          id: "selection",
          disableResizing: true,
          minWidth: 52,
          width: 52,
          maxWidth: 52,
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
      hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
        // fix the parent group of the selection button to not be resizable
        const selectionGroupHeader = headerGroups[0].headers[0];
        selectionGroupHeader.canResize = false;
      });
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
                      {column.canResize && (
                        <div
                          {...column.getResizerProps()}
                          style={{ cursor: "col-resize" }} // override the useResizeColumns default
                          className={
                            column.isResizing
                              ? `${classes.resizeHandle} handleActive`
                              : `${classes.resizeHandle}`
                          }
                        />
                      )}
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
