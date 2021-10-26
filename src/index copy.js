import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initialData";
import Column from "./column";
import { Body, Cell, Head, Table, Row } from "@zendeskgarden/react-tables";
import HeaderRow from "./HeaderRow";
import { DEFAULT_THEME, ThemeProvider } from "@zendeskgarden/react-theming";

// import Tabla from "./Tabla";
import ZendeskTable from "./ZendeskTable";
// const dataArr = [
//   { name: "kunwar", email: "abc@123.com", tag: ["t2", "t2"] },
//   { name: "john", email: "poapt@123.com", tag: ["t3", "t4"] },
//   { name: "ruby", email: "ruby@123.com", tag: ["t5", "t6"] },
//   { name: "jacob", email: "jacob@123.com", tag: ["t6", "t4"] },
//   { name: "jenny", email: "jenny@123.com", tag: ["t2", "t3"] },
//   { name: "joravar", email: "joravar@123.com", tag: ["t3", "t6"] },
// ];
const TableApp = ({ state }) => {
  const onDragEnd = (result) => {
    // TODO: reorder our column
  };
  return (
    <Table style={{ minWidth: 500 }}>
      <Head>
        <DragDropContext onDragEnd={onDragEnd}>
          <HeaderRow />
        </DragDropContext>
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
  );
};

const TodoApp = ({ state }) => {
  const onDragEnd = (result) => {
    // TODO: reorder our column
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};
class App extends React.Component {
  state = initialData;

  render() {
    return (
      <div style={{ padding: DEFAULT_THEME.space.md }}>
        <ThemeProvider>
          {/* <TodoApp state={this.state} /> */}
          {/* <TableApp state={dataArr} />; */}
          <ZendeskTable />
        </ThemeProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
