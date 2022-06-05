import makeData from "./makeData";
import React, { useEffect, useMemo, useState } from "react";
import { roundedMedian } from "./CustomTable.aggregate:";
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { matchSorter } from "match-sorter";

const useStyles = makeStyles((theme) => ({
  buttonActive: {
    backgroundColor: theme.colors.white,
  },
  buttonInActive: {
    backgroundColor: theme.colors.disabledGray,
  },
  select: {
    width: "160px",
  },
}));

export const columns = [
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: "Visits",
    accessor: "visits",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Profile Progress",
    accessor: "progress",
  },
];

export const groupColumns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
        // Use a two-stage aggregator here to first
        // count the total rows being aggregated,
        // then sum any of those counts if they are
        // aggregated further
        aggregate: "count",
        Aggregated: ({ value }) => `${value} Names`,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        // Use another two-stage aggregator here to
        // first count the UNIQUE values from the rows
        // being aggregated, then sum those counts if
        // they are aggregated further
        aggregate: "uniqueCount",
        Aggregated: ({ value }) => `${value} Unique Names`,
      },
    ],
  },
  {
    Header: "Info",
    columns: [
      {
        Header: "Age",
        accessor: "age",
        // Aggregate the average age of visitors
        aggregate: "average",
        Aggregated: ({ value }) => `${Math.round(value * 100) / 100} (avg)`,
      },
      {
        Header: "Visits",
        accessor: "visits",
        // Aggregate the sum of all visits
        aggregate: "sum",
        Aggregated: ({ value }) => `${value} (total)`,
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
        // Use our custom roundedMedian aggregator
        aggregate: roundedMedian,
        Aggregated: ({ value }) => `${value} (med)`,
      },
    ],
  },
];

const ButtonColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
  const classes = useStyles();

  const [state, setState] = useState(0);

  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <ButtonGroup>
      <Button
        className={state === 0 ? classes.buttonActive : classes.buttonInActive}
        variant={"outlined"}
        onClick={() => {
          setState(0);
          setFilter("");
        }}>
        All
      </Button>
      {options.map((option, index) => (
        <Button
          key={uuidv4()}
          className={state === index + 1 ? classes.buttonActive : classes.buttonInActive}
          variant={"outlined"}
          onClick={() => {
            setState(index + 1);
            setFilter(option);
          }}>
          {option}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  const classes = useStyles();

  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <FormControl
      className={classes.select}
      variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}>
        <option value="">All</option>
        {options.map((option, i) => (
          <MenuItem
            key={i}
            value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

// Define a default UI for filtering
export function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

export function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export const filteringColumns = [
  {
    Header: "First Name",
    accessor: "firstName",
    Filter: DefaultColumnFilter,
  },
  {
    Header: "Last Name",
    accessor: "lastName",
    Filter: DefaultColumnFilter,
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: "Visits",
    accessor: "visits",
  },
  {
    Header: "Status",
    accessor: "status",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "Profile Progress",
    accessor: "progress",
  },
];

export const data = makeData(200);
