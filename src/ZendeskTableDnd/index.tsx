import ZendeskTableDndComponent from "./ZendeskTableDndComponent";
import { useReducer } from "react";
import { dataColumns, dataRows } from "./testData";
import {
  Action,
  ActionKind,
  ITableColumn,
  ITableRows,
  State,
  ToggleKind,
} from "./tableProps";
import ColumnList from "./ColumnList";

const verifyColumnsAndRows = (columns: ITableColumn[], rows: ITableRows) => {
  // We should ensure the the rows have the same columns as specified by the columns variable
};

const visibleColumns = (columns: ITableColumn[]) =>
  columns.filter((col) => {
    return col.isVisible === true;
  });

const hiddenColumns = (
  allColumns: ITableColumn[],
  visibleColumns: ITableColumn[]
) => {
  const results = allColumns.filter(
    (ac) => !visibleColumns.some((vc) => ac.name === vc.name)
  );
  return results;
};

const removeProperty =
  (delProp: any) =>
  ({ [delProp]: _, ...rest }) =>
    rest;

const rowsRemoveHiddenColumns = (
  rows: ITableRows,
  hiddenColumns: ITableRows[]
) =>
  rows.map((row: any) => {
    let rowWithRemovedColumns = row;
    hiddenColumns.forEach((hiddenColumn) => {
      rowWithRemovedColumns = removeProperty(hiddenColumn.name)(
        rowWithRemovedColumns
      );
    });
    return rowWithRemovedColumns;
  });

const toggleProps = (
  currentState: ITableColumn[],
  newState: ITableColumn[]
) => {
  for (let i = 0; i < currentState.length; i++) {
    if (currentState[i].isVisible !== newState[i].isVisible) {
      const toggleKind =
        !currentState[i].isVisible === true
          ? ToggleKind.ADD
          : ToggleKind.REMOVE;
      return { toggleKind: toggleKind, value: newState[i] };
    }
  }
};
const reducer = (state: State, action: Action) => {
  let tableColumns = state.tableColumns;
  let tableRows = state.tableRows;
  switch (action.type) {
    case ActionKind.TOGGLE_COLUMN:
      const props = toggleProps(state.columnListColumns, action.payload);
      if (props?.toggleKind === ToggleKind.ADD) {
        tableColumns.push(props.value);
        tableRows = rowsRemoveHiddenColumns(
          state.originalTableRows,
          hiddenColumns(state.originalTableColumns, tableColumns)
        );
      } else if (props?.toggleKind === ToggleKind.REMOVE) {
        tableColumns = tableColumns.filter(
          (column) => column.name !== props.value.name
        );
        tableRows = rowsRemoveHiddenColumns(tableRows, [props.value]);
      }

      return {
        ...state,
        columnListColumns: action.payload,
        tableColumns: tableColumns,
        tableRows: tableRows,
      };
    case ActionKind.MOVE_COLUMN:
      return {
        ...state,
        tableColumns: visibleColumns(action.payload),
      };

    default:
      throw new Error();
  }
};

const ZendeskTableDnd = () => {
  // verifyColumnsAndRows(initialState.dataColumns, initialState.dataRows);
  const initialState: State = {
    columnListColumns: dataColumns,
    tableColumns: visibleColumns(dataColumns),
    tableRows: rowsRemoveHiddenColumns(
      dataRows,
      hiddenColumns(dataColumns, visibleColumns(dataColumns))
    ),
    originalTableRows: dataRows,
    originalTableColumns: dataColumns,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <ColumnList
        columnListColumns={state.columnListColumns}
        dispatch={dispatch}
      />
      <ZendeskTableDndComponent
        columns={state.tableColumns}
        rows={state.tableRows}
        dispatch={dispatch}
      />
      <button>Fake button</button>
    </div>
  );
};

export default ZendeskTableDnd;
