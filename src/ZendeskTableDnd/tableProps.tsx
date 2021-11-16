import { Dispatch, SetStateAction } from "react";

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
  setColumns: Dispatch<SetStateAction<ITableColumn[]>>;
}

export interface IColumnListProps {
  columns: ITableColumn[];
  setColumns: Dispatch<SetStateAction<ITableColumn[]>>;
}
