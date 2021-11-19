import { Dispatch } from "react";

export interface ITableColumn {
  name: string;
  displayName: string;
  width: string;
  isVisible: boolean;
}

export interface ITableRows {
  [key: string]: any;
}
export interface ITableProps {
  columns: ITableColumn[];
  rows: ITableRows;
  dispatch: Dispatch<any>;
}

export interface IColumnListProps {
  columnListColumns: ITableColumn[];
  dispatch: Dispatch<any>;
}

export type State = {
  columnListColumns: ITableColumn[];
  tableColumns: ITableColumn[];
  tableRows: ITableRows;
  originalTableColumns: ITableColumn[];
  originalTableRows: ITableRows;
};

export enum ActionKind {
  TOGGLE_COLUMN = "toggle_column",
  MOVE_COLUMN = "move_column",
}

export type Action = {
  type: ActionKind;
  payload: ITableColumn[];
};

export const ActionMoveColumn = (columns: ITableColumn[]) => {
  return {
    type: ActionKind.MOVE_COLUMN,
    payload: columns,
  };
};

export const ActionToggleColumn = (columns: ITableColumn[]) => {
  return {
    type: ActionKind.TOGGLE_COLUMN,
    payload: columns,
  };
};

export enum ToggleKind {
  ADD = "Add",
  REMOVE = "remove",
}

export type ToggleProps = {
  toggleKind: ToggleKind;
  value: ITableColumn;
};
