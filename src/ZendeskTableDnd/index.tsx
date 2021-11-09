import ZendeskTableDndComponent from "./ZendeskTableDndComponent";
import React, { useState } from "react";
import { dataColumns, dataRows } from "./testData";
const ZendeskTableDnd = React.memo(() => {
  const [rows, setRows] = useState(dataRows);
  const [columns, setColumns] = useState(dataColumns);

  return <ZendeskTableDndComponent tableColumns={columns} tableRows={rows} />;
});

export default ZendeskTableDnd;
