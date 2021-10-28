import React, { useState } from "react";
import styled from "styled-components";
import {
  Body,
  Cell,
  Head,
  Table,
  Row,
  HeaderRow,
  HeaderCell,
} from "@zendeskgarden/react-tables";
import { KEY_CODES } from "@zendeskgarden/container-utilities";
const TABLE_BODY_ROW_NAME = "CUSTOMERS_TBL_BODY_ROW_";
const TABLE_HEADER_ROW_NAME = "CUSTOMERS_TBL_HEADER_ROW_";

const columns = [
  { name: "pet name", displayName: "PET NAME", width: "20" },
  { name: "parent name", displayName: "PARENT NAME", width: "20" },
  { name: "email", displayName: "EMAIL", width: "40" },
  { name: "last visit", displayName: "LAST VISIT", width: "20" },
];
const rows = [
  {
    "pet name": "Hulli hardan dauda guda dev gauda",
    "parent name": "Haven Collins",
    email: "iamabigemailyesiamthisisme@gmail.com",
    "last visit": "6/5/2021",
  },
  {
    "pet name": "Weissnat",
    "parent name": "Myah Wolff",
    email: "Chester_Funk37@gmail.com",
    "last visit": "12/8/2020",
  },
  {
    "pet name": "Kulas",
    "parent name": "Alexander Grant",
    email: "Beth44@hotmail.com",
    "last visit": "4/10/2021",
  },
  {
    "pet name": "Bogan",
    "parent name": "Raymond Koss",
    email: "Diego.Metz@hotmail.com",
    "last visit": "5/27/2021",
  },
  {
    "pet name": "Stanton",
    "parent name": "Henri Green",
    email: "Kaela_Klein98@yahoo.com",
    "last visit": "2/14/2021",
  },
];
const ZendeskTable = () => {
  const [cols, setCols] = useState(columns);
  const [dragOverColumnName, setDragOverColumnName] = useState("");
  const [draggingColumnIdx, setDraggingColumnIdx] = useState(0);
  const [headerCellTabPressed, setHeaderCellTabPressed] = useState(false);
  const [headerCellMoving, setHeaderCellMoving] = useState(false);

  const handleDragStart = (e) => {
    const { id } = e.target;
    const idx = cols.findIndex((col) => col.name === id);
    setDraggingColumnIdx(idx);
  };

  const handleDragEnter = (e) => {
    const { id } = e.target;
    setDragOverColumnName(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    const { id } = e.target;
    const droppedColIdx = cols.findIndex((col) => col.name === id);
    setCols(swap(cols, droppedColIdx, draggingColumnIdx));
    setDragOverColumnName("");
  };

  const swap = ([...arr], swapIndex1, swapIndex2) => {
    const temp = arr[swapIndex1];
    arr[swapIndex1] = arr[swapIndex2];
    arr[swapIndex2] = temp;
    return arr;
  };

  const onHeaderCellKeyUp = (e) => {
    if (!headerCellTabPressed && e.keyCode === KEY_CODES.SPACE) {
      console.log("space bar fired");
      setHeaderCellTabPressed(true);

      const [rowIdx, colIdx] = getCurrentHeaderRowAndColumnIdx(e.currentTarget);
      console.log("IDX.idx", colIdx);
      setDraggingColumnIdx(colIdx);
    }
    console.log("draggingColumnIdx", draggingColumnIdx);

    if (headerCellTabPressed) {
      const totalColumns = e.currentTarget.parentElement.childElementCount;
      if (e.keyCode === KEY_CODES.LEFT && draggingColumnIdx !== 0) {
        setHeaderCellMoving(true);
        setDragOverColumnName(e.currentTarget.id);
        setCols(swap(cols, draggingColumnIdx - 1, draggingColumnIdx));
        setDraggingColumnIdx(draggingColumnIdx - 1);
        setDragOverColumnName("");
      }
      if (
        e.keyCode === KEY_CODES.RIGHT &&
        draggingColumnIdx < totalColumns - 1
      ) {
        setHeaderCellMoving(true);
        setDragOverColumnName(e.currentTarget.id);
        setCols(swap(cols, draggingColumnIdx + 1, draggingColumnIdx));
        setDraggingColumnIdx(draggingColumnIdx + 1);
        setDragOverColumnName("");
      }
    }
    if (
      headerCellTabPressed &&
      headerCellMoving &&
      e.keyCode === KEY_CODES.SPACE
    ) {
      setHeaderCellTabPressed(false);
      setHeaderCellMoving(false);
      console.log("Lest save this config");
    }
  };

  const getCurrentHeaderRowAndColumnIdx = (element) => {
    const [currentRowIdx, currentColumnIdx] = element
      .getAttribute("data-header-cell-id")
      .replace(TABLE_HEADER_ROW_NAME, "")
      .split("_");
    return [parseInt(currentRowIdx, 10), parseInt(currentColumnIdx, 10)];
  };

  const onBodyCellKeyUp = (e) => {
    if (e.keyCode === KEY_CODES.LEFT) {
      const prevCell = findPreviousBodyCellId(e.currentTarget);
      document.querySelector(`[data-body-cell-id="${prevCell}"]`).focus();
    }
  };

  const getCurrentBodyRowAndColumnIdx = (element) => {
    const [currentRowIdx, currentColumnIdx] = element
      .getAttribute("data-body-cell-id")
      .replace(TABLE_BODY_ROW_NAME, "")
      .split("_");
    return [parseInt(currentRowIdx, 10), parseInt(currentColumnIdx, 10)];
  };

  const findPreviousBodyCellId = (element) => {
    const [currentRowIdx, currentColumnIdx] =
      getCurrentBodyRowAndColumnIdx(element);
    const totalColumns = element.parentElement.childElementCount;
    let newCellRowIdx = 0;
    let newCellColumnIdx = 0;

    if (currentColumnIdx !== 0 && currentRowIdx !== 0) {
      newCellColumnIdx = currentColumnIdx - 1;
      newCellRowIdx = currentRowIdx;
    } else if (currentColumnIdx === 0 && currentRowIdx !== 0) {
      newCellRowIdx = currentRowIdx - 1;
      newCellColumnIdx = totalColumns - 1;
    } else if (currentColumnIdx !== 0 && currentRowIdx === 0) {
      newCellColumnIdx = currentColumnIdx - 1;
      newCellRowIdx = currentRowIdx;
    } else if (currentColumnIdx === 0 && currentRowIdx === 0) {
      console.log("at the end think what we can do");
      // We should find a way to get to the header here
    }
    return bodyCellId(newCellRowIdx, newCellColumnIdx);
  };

  const findTopBodyCellId = (element) => {
    const [currentRowIdx, currentColumnIdx] =
      getCurrentBodyRowAndColumnIdx(element);
    const totalColumns = element.parentElement.childElementCount;
    let newCellRowIdx = 0;
    let newCellColumnIdx = 0;

    if (currentColumnIdx !== 0 && currentRowIdx !== 0) {
      newCellColumnIdx = currentColumnIdx - 1;
      newCellRowIdx = currentRowIdx;
    } else if (currentColumnIdx === 0 && currentRowIdx !== 0) {
      newCellRowIdx = currentRowIdx - 1;
      newCellColumnIdx = totalColumns - 1;
    } else if (currentColumnIdx !== 0 && currentRowIdx === 0) {
      newCellColumnIdx = currentColumnIdx - 1;
      newCellRowIdx = currentRowIdx;
    } else if (currentColumnIdx === 0 && currentRowIdx === 0) {
      console.log("at the end think what we can do");
      // We should find a way to get to the header here
    }
    return bodyCellId(newCellRowIdx, newCellColumnIdx);
  };

  const bodyCellId = (rowIdx, colIdx) => {
    return `${TABLE_BODY_ROW_NAME}${rowIdx}_${colIdx}`;
  };

  const headerCellId = (colIdx) => {
    return `${TABLE_HEADER_ROW_NAME}0_${colIdx}`;
  };

  return (
    <div tabIndex={0} style={{ overflowX: "auto" }}>
      <StyledTable data-test-id="hhh">
        <Head>
          <HeaderRow>
            {cols.map((col, colIdx) => (
              <StyledHeaderCell
                data-header-cell-id={headerCellId(colIdx)}
                tabIndex={0}
                onKeyUp={onHeaderCellKeyUp}
                // onKeyUp={onHeaderCellKeyUp}
                width={col.width}
                id={col.name}
                key={col.name}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                onDragEnter={handleDragEnter}
                dragOver={col.name === dragOverColumnName}
              >
                {col.displayName}
              </StyledHeaderCell>
            ))}
          </HeaderRow>
        </Head>
        <Body>
          {rows.map((row, rowIdx) => (
            <Row key={rowIdx} id={rowIdx}>
              {Object.entries(row).map(([_, v], colIdx) => (
                <StyledCell
                  data-body-cell-id={bodyCellId(rowIdx, colIdx)}
                  tabIndex={0}
                  onKeyUp={onBodyCellKeyUp}
                  key={v}
                  dragOver={cols[colIdx].name === dragOverColumnName}
                >
                  {row[cols[colIdx].name]}
                </StyledCell>
              ))}
            </Row>
          ))}
        </Body>
      </StyledTable>
      <button>sss</button>
      <button>sss</button>
    </div>
  );
};

const StyledCell = styled(Cell)`
  // border-left: ${({ dragOver }) => dragOver && "3px solid green"};
`;

const StyledHeaderCell = styled(HeaderCell)`
  // border-left: ${({ dragOver }) => dragOver && "3px solid green"};
  background-color: ${({ dragOver }) => dragOver && "green"};
`;

const StyledTable = styled(Table)``;

export default ZendeskTable;
