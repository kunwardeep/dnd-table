import React from "react";
import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from "@zendeskgarden/react-tables";

const Column = ({ columnName, rows }) => (
  <div style={{ overflowX: "auto" }}>
    <Table style={{ minWidth: 500 }}>
      <Head>
        <HeaderRow>
          <HeaderCell>{columnName}</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {rows.map((row) => (
          <Row>
            <Cell>{row[columnName]}</Cell>
          </Row>
        ))}
      </Body>
    </Table>
  </div>
);
export default Column;
