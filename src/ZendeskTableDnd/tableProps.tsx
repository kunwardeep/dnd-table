export type TableColumn = {
  name: string;
  displayName: string;
  width: string;
  isVisible: boolean;
};

export interface TableRows {
  [key: string]: any;
}

export interface TableProps {
  tableColumns: TableColumn[];
  tableRows: TableRows;
}
