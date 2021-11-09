export const TABLE_BODY_CELL_ID_VALUE = "customer-tbl-body-cell-id_";
export const TABLE_HEADER_CELL_ID_VALUE = "customer-tbl-header-cell-id_";

// These attributes are set on the cell for header and the body
export const TABLE_BODY_CELL_ID_ATTR = "data-body-cell-id";
export const TABLE_HEADER_CELL_ID_ATTR = "data-header-cell-id";

export const bodyCellId = (rowIdx: number, colIdx: number) => {
  return `${TABLE_BODY_CELL_ID_VALUE}${rowIdx}_${colIdx}`;
};
export const headerCellId = (colIdx: number) => {
  return `${TABLE_HEADER_CELL_ID_VALUE}0_${colIdx}`;
};
