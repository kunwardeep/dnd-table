export const TABLE_BODY_ROW_NAME = "CUSTOMERS_TBL_BODY_ROW_";
export const TABLE_HEADER_ROW_NAME = "CUSTOMERS_TBL_HEADER_ROW_";

export const bodyCellId = (rowIdx, colIdx) => {
  return `${TABLE_BODY_ROW_NAME}${rowIdx}_${colIdx}`;
};
export const headerCellId = (colIdx) => {
  return `${TABLE_HEADER_ROW_NAME}0_${colIdx}`;
};
