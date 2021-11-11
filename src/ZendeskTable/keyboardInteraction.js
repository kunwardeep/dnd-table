import {
  TABLE_BODY_ROW_NAME,
  TABLE_HEADER_ROW_NAME,
  bodyCellId,
} from "./tableMetaData";

const getCurrentBodyRowAndColumnIdx = (element) => {
  const [currentRowIdx, currentColumnIdx] = element
    .getAttribute("data-body-cell-id")
    .replace(TABLE_BODY_ROW_NAME, "")
    .split("_");
  return [parseInt(currentRowIdx, 10), parseInt(currentColumnIdx, 10)];
};

const findPreviousBodyCellId = (element, totalColumns) => {
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

const findNextBodyCellId = (element, totalColumns, totalRows) => {
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

const findUpBodyCellId = (element) => {
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

const findDownBodyCellId = (element, totalRows) => {
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

const getCurrentHeaderRowAndColumnIdx = (element) => {
  const [currentRowIdx, currentColumnIdx] = element
    .getAttribute("TABLE_HEADER_CELL_ID_ATTR")
    .replace(TABLE_HEADER_ROW_NAME, "")
    .split("_");
  return [parseInt(currentRowIdx, 10), parseInt(currentColumnIdx, 10)];
};

export {
  findDownBodyCellId,
  findUpBodyCellId,
  findPreviousBodyCellId,
  findNextBodyCellId,
  getCurrentHeaderRowAndColumnIdx,
};
