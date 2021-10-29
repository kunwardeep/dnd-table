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

const GenericZendeskTable = () => (
  <div style={{ overflowX: "auto" }}>
    <Table style={{ minWidth: 500 }}>
      <Head>
        <HeaderRow>
          <HeaderCell>Fruit</HeaderCell>
          <HeaderCell>Sun exposure</HeaderCell>
          <HeaderCell>Soil</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        <Row>
          <Cell>Raspberries</Cell>
          <Cell>Partial shade</Cell>
          <Cell>Moist and slightly acidic</Cell>
        </Row>
        <Row>
          <Cell>Strawberries</Cell>
          <Cell>Full sun</Cell>
          <Cell>Medium moisture</Cell>
        </Row>
        <Row>
          <Cell>Grapes</Cell>
          <Cell>Full sun</Cell>
          <Cell>Rich and well draining</Cell>
        </Row>
        <Row>
          <Cell>Cherries</Cell>
          <Cell>Partial sun</Cell>
          <Cell>Rich and well draining</Cell>
        </Row>
        <Row>
          <Cell>Tomatoes</Cell>
          <Cell>Partial shade</Cell>
          <Cell>Well draining</Cell>
        </Row>
      </Body>
    </Table>
  </div>
);

export default GenericZendeskTable;