import makeData from "./makeData";
import React from "react";
import { roundedMedian } from "../CustomTable.Aggregate:";
import {
  filterGreaterThan,
  NumberRangeColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
} from "../CustomTable.filter";

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
    collapse: true,
  },
  {
    Header: "Visits",
    accessor: "visits",
    collapse: true,
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Profile Progress",
    accessor: "progress",
    collapse: true,
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

export const filteringColumns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        filter: "fuzzyText",
      },
    ],
  },
  {
    Header: "Info",
    columns: [
      {
        Header: "Age",
        accessor: "age",
        Filter: SliderColumnFilter,
        filter: "equals",
      },
      {
        Header: "Visits",
        accessor: "visits",
        Filter: NumberRangeColumnFilter,
        filter: "between",
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
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
      },
    ],
  },
];

export const data = makeData(200);
