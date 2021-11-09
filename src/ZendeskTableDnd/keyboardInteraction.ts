import {
  TABLE_BODY_CELL_ID_VALUE,
  TABLE_HEADER_CELL_ID_VALUE,
  TABLE_BODY_CELL_ID_ATTR,
  TABLE_HEADER_CELL_ID_ATTR,
  bodyCellId,
} from "./tableMetaData";

const getCurrentBodyRowAndColumnIdx = (
  element: HTMLTableCellElement
): [number, number] => {
  var attribute = element?.getAttribute(TABLE_BODY_CELL_ID_ATTR);
  if (attribute !== null) {
    let [currentRowIdx, currentColumnIdx]: string[] = attribute
      .replace(TABLE_BODY_CELL_ID_VALUE, "")
      .split("_");
    return [parseInt(currentRowIdx, 10), parseInt(currentColumnIdx, 10)];
  }

  return [0, 0];
};

const findPreviousBodyCellId = (
  element: HTMLTableCellElement,
  totalColumns: number
): string => {
  const [currentRowIdx, currentColumnIdx] =
    getCurrentBodyRowAndColumnIdx(element);

  let newCellRowIdx = currentRowIdx;
  let newCellColumnIdx = currentColumnIdx;

  if (currentColumnIdx === 0 && currentRowIdx === 0) {
    console.log("at the top of the table, lets try and jump to header");
    // We should find a way to get to the header here
  } else if (currentColumnIdx === 0 && currentRowIdx !== 0) {
    newCellRowIdx = currentRowIdx - 1;
    newCellColumnIdx = totalColumns - 1;
  } else {
    newCellRowIdx = currentRowIdx;
    newCellColumnIdx = currentColumnIdx - 1;
  }

  return bodyCellId(newCellRowIdx, newCellColumnIdx);
};

const findNextBodyCellId = (
  element: HTMLTableCellElement,
  totalColumns: number,
  totalRows: number
) => {
  const [currentRowIdx, currentColumnIdx] =
    getCurrentBodyRowAndColumnIdx(element);

  let newCellRowIdx = currentRowIdx;
  let newCellColumnIdx = currentColumnIdx;

  if (
    currentColumnIdx === totalColumns - 1 &&
    currentRowIdx === totalRows - 1
  ) {
    console.log("at the end of the table");
  } else if (
    currentColumnIdx === totalColumns - 1 &&
    currentRowIdx !== totalRows - 1
  ) {
    newCellRowIdx = currentRowIdx + 1;
    newCellColumnIdx = 0;
  } else {
    newCellRowIdx = currentRowIdx;
    newCellColumnIdx = currentColumnIdx + 1;
  }

  return bodyCellId(newCellRowIdx, newCellColumnIdx);
};

const findUpBodyCellId = (element: HTMLTableCellElement) => {
  const [currentRowIdx, currentColumnIdx] =
    getCurrentBodyRowAndColumnIdx(element);
  let newCellRowIdx = currentRowIdx;
  let newCellColumnIdx = currentColumnIdx;

  if (currentRowIdx !== 0) {
    newCellRowIdx = currentRowIdx - 1;
  } else {
    console.log("lets push it into header");
  }
  return bodyCellId(newCellRowIdx, newCellColumnIdx);
};

const findDownBodyCellId = (
  element: HTMLTableCellElement,
  totalRows: number
) => {
  const [currentRowIdx, currentColumnIdx] =
    getCurrentBodyRowAndColumnIdx(element);
  let newCellRowIdx = currentRowIdx;
  let newCellColumnIdx = currentColumnIdx;
  if (currentRowIdx !== totalRows - 1) {
    newCellRowIdx = currentRowIdx + 1;
  } else {
    console.log("Ignore this.. we have hit the floor of the table");
  }
  return bodyCellId(newCellRowIdx, newCellColumnIdx);
};

// HEADER
// ##########################

const getCurrentHeaderRowAndColumnIdx = (element: HTMLTableCellElement) => {
  var attribute = element?.getAttribute(TABLE_HEADER_CELL_ID_ATTR);
  if (attribute !== null) {
    let [currentRowIdx, currentColumnIdx]: string[] = attribute
      .replace(TABLE_HEADER_CELL_ID_VALUE, "")
      .split("_");
    return [parseInt(currentRowIdx, 10), parseInt(currentColumnIdx, 10)];
  }

  return [0, 0];
};

export {
  findDownBodyCellId,
  findUpBodyCellId,
  findPreviousBodyCellId,
  findNextBodyCellId,
  getCurrentHeaderRowAndColumnIdx,
};
