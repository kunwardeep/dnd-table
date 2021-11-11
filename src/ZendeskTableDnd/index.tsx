import ZendeskTableDndComponent from "./ZendeskTableDndComponent";
import React, { useState } from "react";
import { dataColumns, dataRows } from "./testData";
import { TableColumn, TableRows } from "./tableProps";
const visibleColumns = (columns: TableColumn[]) =>
  columns.filter((col) => {
    return col.isVisible === true;
  });

const hiddenColumns = (columns: TableColumn[]) =>
  columns.filter((col) => {
    return col.isVisible === false;
  });

const removeProperty =
  (delProp: any) =>
  ({ [delProp]: _, ...rest }) =>
    rest;

const visibleColumnsOnRows = (rows: TableRows, columns: TableColumn[]) =>
  rows.map((row: any) => {
    let rowWithRemovedColumns = row;
    hiddenColumns(columns).forEach((column) => {
      rowWithRemovedColumns = removeProperty(column.name)(
        rowWithRemovedColumns
      );
    });
    return rowWithRemovedColumns;
  });
const ZendeskTableDnd = React.memo(() => {
  const [rows, setRows] = useState(visibleColumnsOnRows(dataRows, dataColumns));
  const [columns, setColumns] = useState(visibleColumns(dataColumns));

  return (
    <div>
      <ZendeskTableDndComponent tableColumns={columns} tableRows={rows} />
      <button>Fake button</button>
    </div>
  );
});

export default ZendeskTableDnd;
