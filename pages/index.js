import { useTable } from "react-table";
import { Styles } from "common/styles";
import { columns, data } from "common/constant";
import { v4 as uuidv4 } from "uuid";

function Table({ columns, data }) {
  const instance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = instance;

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            key={uuidv4()}
            {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                key={uuidv4()}
                {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              key={uuidv4()}
              {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    key={uuidv4()}
                    {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function App() {
  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
      />
    </Styles>
  );
}

export default App;
