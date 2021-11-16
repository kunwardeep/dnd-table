import ZendeskTableDndComponent from "./ZendeskTableDndComponent";
import React, { useState } from "react";
import { dataColumns, dataRows } from "./testData";
import { ITableColumn, ITableRows } from "./tableProps";
import ColumnList from "./ColumnList";

const verifyColumnsAndRows = (columns: ITableColumn[], rows: ITableRows) => {
  // We should ensure the the rows have the same columns as specified by the columns variable
};

const ZendeskTableDnd = React.memo(() => {
  verifyColumnsAndRows(dataColumns, dataRows);
  const [rows] = useState(dataRows);
  const [columns, setColumns] = useState(dataColumns);

  return (
    <div>
      <ColumnList columns={columns} setColumns={setColumns} />
      <ZendeskTableDndComponent
        columns={columns}
        rows={rows}
        setColumns={setColumns}
      />
      <button>Fake button</button>
    </div>
  );
});

export default ZendeskTableDnd;
