import {
  TABLE_BODY_CELL_ID_VALUE,
  TABLE_HEADER_CELL_ID_VALUE,
  TABLE_BODY_CELL_ID_ATTR,
  TABLE_HEADER_CELL_ID_ATTR,
  DATA_COMPONENT_ID,
  bodyCellId,
  headerCellId,
} from "./tableMetaData";

// https://www.w3.org/TR/uievents-key/#named-key-attribute-values
const KEYBOARD_KEYS = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ESCAPE: "Escape",
  TAB: "Tab",
  SPACE_BAR: " ", // empty space is space bar
};

const CELL_TYPE_BODY = "body";
const CELL_TYPE_HEADER = "header";

export type CELL_TYPE = typeof CELL_TYPE_BODY | typeof CELL_TYPE_HEADER;

const getCurrentHeaderRowAndColumnIdx = (
  element: HTMLTableCellElement
): [number, number] => {
  var attribute = element?.getAttribute(TABLE_HEADER_CELL_ID_ATTR);
  if (attribute !== null) {
    let [currentRowIdx, currentColumnIdx]: string[] = attribute
      .replace(TABLE_HEADER_CELL_ID_VALUE, "")
      .split("_");
    return [parseInt(currentRowIdx, 10), parseInt(currentColumnIdx, 10)];
  }

  return [0, 0];
};

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

const getCurrentRowAndColumnIdx = (
  cellType: CELL_TYPE,
  element: HTMLTableCellElement
): [number, number] => {
  return cellType === CELL_TYPE_BODY
    ? getCurrentBodyRowAndColumnIdx(element)
    : getCurrentHeaderRowAndColumnIdx(element);
};

export const cellProps = (
  cellType: CELL_TYPE,
  rowIdx: number,
  colIdx: number
): [string, string] => {
  return cellType === CELL_TYPE_BODY
    ? [bodyCellId(rowIdx, colIdx), TABLE_BODY_CELL_ID_ATTR]
    : [headerCellId(rowIdx, colIdx), TABLE_HEADER_CELL_ID_ATTR];
};

const findPreviousCellProps = (
  cellType: CELL_TYPE,
  element: HTMLTableCellElement,
  totalColumns: number
): [string, string] => {
  const [currentRowIdx, currentColumnIdx] = getCurrentRowAndColumnIdx(
    cellType,
    element
  );

  let newCellRowIdx = currentRowIdx;
  let newCellColumnIdx = currentColumnIdx;

  if (currentColumnIdx === 0 && currentRowIdx === 0) {
    if (cellType === CELL_TYPE_BODY) {
      // jump into header last cell
      newCellRowIdx = currentRowIdx;
      newCellColumnIdx = totalColumns - 1;
      cellType = CELL_TYPE_HEADER;
    }
  } else if (currentColumnIdx === 0 && currentRowIdx !== 0) {
    newCellRowIdx = currentRowIdx - 1;
    newCellColumnIdx = totalColumns - 1;
  } else {
    newCellRowIdx = currentRowIdx;
    newCellColumnIdx = currentColumnIdx - 1;
  }

  return cellProps(cellType, newCellRowIdx, newCellColumnIdx);
};

const findNextCellProps = (
  cellType: CELL_TYPE,
  element: HTMLTableCellElement,
  totalColumns: number,
  totalRows: number
): [string, string] => {
  const [currentRowIdx, currentColumnIdx] = getCurrentRowAndColumnIdx(
    cellType,
    element
  );
  let newCellRowIdx = currentRowIdx;
  let newCellColumnIdx = currentColumnIdx;

  if (currentColumnIdx === totalColumns - 1) {
    if (currentRowIdx === 0 && cellType === CELL_TYPE_HEADER) {
      //at the end of the header
      newCellRowIdx = 0;
      newCellColumnIdx = 0;
      cellType = CELL_TYPE_BODY;
    }
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

  return cellProps(cellType, newCellRowIdx, newCellColumnIdx);
};

const findUpCellProps = (
  cellType: CELL_TYPE,
  element: HTMLTableCellElement
): [string, string] => {
  const [currentRowIdx, currentColumnIdx] = getCurrentRowAndColumnIdx(
    cellType,
    element
  );
  let newCellRowIdx = currentRowIdx;
  let newCellColumnIdx = currentColumnIdx;

  if (currentRowIdx !== 0) {
    newCellRowIdx = currentRowIdx - 1;
  } else if (currentRowIdx === 0 && cellType === CELL_TYPE_BODY) {
    newCellRowIdx = currentRowIdx;
    newCellColumnIdx = currentColumnIdx;
    cellType = CELL_TYPE_HEADER;
  }
  return cellProps(cellType, newCellRowIdx, newCellColumnIdx);
};

const findDownCellProps = (
  cellType: CELL_TYPE,
  element: HTMLTableCellElement,
  totalRows: number
): [string, string] => {
  const [currentRowIdx, currentColumnIdx] = getCurrentRowAndColumnIdx(
    cellType,
    element
  );
  let newCellRowIdx = currentRowIdx;
  let newCellColumnIdx = currentColumnIdx;
  if (currentRowIdx !== totalRows - 1) {
    newCellRowIdx = currentRowIdx + 1;
    if (cellType === CELL_TYPE_HEADER) {
      newCellRowIdx = currentRowIdx;
      cellType = CELL_TYPE_BODY;
    }
  }

  return cellProps(cellType, newCellRowIdx, newCellColumnIdx);
};

const navigateUsingKeys = (
  e: React.KeyboardEvent<HTMLTableCellElement>,
  cellType: CELL_TYPE,
  totalColumns: number,
  totalRows: number
) => {
  let [moveToCellId, moveToCellAttr]: string[] = [bodyCellId(0, 0), ""];

  switch (e.key) {
    // figure out how to switch to left to right
    case KEYBOARD_KEYS.ARROW_LEFT:
      [moveToCellId, moveToCellAttr] = findPreviousCellProps(
        cellType,
        e.currentTarget,
        totalColumns
      );
      break;
    case KEYBOARD_KEYS.ARROW_RIGHT:
      [moveToCellId, moveToCellAttr] = findNextCellProps(
        cellType,
        e.currentTarget,
        totalColumns,
        totalRows
      );
      break;
    case KEYBOARD_KEYS.ARROW_UP:
      [moveToCellId, moveToCellAttr] = findUpCellProps(
        cellType,
        e.currentTarget
      );
      break;
    case KEYBOARD_KEYS.ARROW_DOWN:
      [moveToCellId, moveToCellAttr] = findDownCellProps(
        cellType,
        e.currentTarget,
        totalRows
      );
      break;
    case KEYBOARD_KEYS.ESCAPE:
      //  find the component id so that we can send focus onto the next sibling
      const component = document.querySelector(
        `[data-component-id="${DATA_COMPONENT_ID}"]`
      );
      (component?.nextSibling as HTMLElement)?.focus();
      return;
    default:
      return;
  }

  const element: HTMLElement | null = document.querySelector(
    `[${moveToCellAttr}="${moveToCellId}"]`
  );
  if (element != null) {
    element.focus();
  }
};

export {
  navigateUsingKeys,
  getCurrentHeaderRowAndColumnIdx,
  KEYBOARD_KEYS,
  CELL_TYPE_BODY,
  CELL_TYPE_HEADER,
};
