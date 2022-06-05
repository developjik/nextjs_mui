import { Box, Button, ButtonGroup, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { GrSearch } from "react-icons/gr";

import * as S from "./CustomTable.styled";
import { useAsyncDebounce } from "react-table";

import { DateRangePicker, DateRange, DateRangeDelimiter } from "@material-ui/pickers";

function CustomTableSearch({ instance }) {
  const { allColumns, columns, state, setGlobalFilter } = instance;
  const [value, setValue] = useState([null, null]);

  return (
    <S.SearchWrapper>
      <div>
        {allColumns
          .filter((it) => it.canFilter)
          .map((column, index) => {
            return <div key={column.id}>{column.render("Filter")}</div>;
          })}
      </div>

      <GlobalFilter
        placeholder={"Search..."}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </S.SearchWrapper>
  );
}

const GlobalFilter = ({ placeholder, globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  const onClick = () => {
    console.log("@GlobalFilter click");
  };

  return (
    <TextField
      label={placeholder}
      variant="outlined"
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};

export default CustomTableSearch;
