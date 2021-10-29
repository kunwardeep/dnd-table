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
import {
  findDownBodyCellId,
  findUpBodyCellId,
  findPreviousBodyCellId,
  findNextBodyCellId,
  getCurrentHeaderRowAndColumnIdx,
} from "./keyboardInteraction";
import { dataColumns, dataRows } from "./testData";
import { headerCellId, bodyCellId } from "./tableMetaData";

const ZendeskTable = () => {
  const [cols, setCols] = useState(dataColumns);
  const [rows, setRows] = useState(dataRows);
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
    setCols(rearrangeColumns(draggingColumnIdx, droppedColIdx));
    setDragOverColumnName("");
  };

  const swap = ([...arr], swapIndex1, swapIndex2) => {
    const temp = arr[swapIndex1];
    arr[swapIndex1] = arr[swapIndex2];
    arr[swapIndex2] = temp;
    return arr;
  };

  const rearrangeColumns = (movedFromIdx, movedToIdx) => {
    const movingLeft = movedFromIdx > movedToIdx;
    const movingRight = movedFromIdx < movedToIdx;
    let newCols = [...cols];
    if (movingLeft) {
      for (let i = movedFromIdx; i > movedToIdx; i--) {
        newCols = swap(newCols, i, i - 1);
      }
    } else if (movingRight) {
      for (let i = movedFromIdx; i < movedToIdx; i++) {
        newCols = swap(newCols, i, i + 1);
      }
    }
    return newCols;
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
      const totalColumns = cols.length;
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

  const onBodyCellKeyUp = (e) => {
    console.log(e.keyCode);
    const totalRows = rows.length;
    const totalColumns = cols.length;
    if (e.keyCode === KEY_CODES.LEFT) {
      const prevCell = findPreviousBodyCellId(e.currentTarget, totalColumns);
      document.querySelector(`[data-body-cell-id="${prevCell}"]`).focus();
    }
    if (e.keyCode === KEY_CODES.RIGHT) {
      const nextCell = findNextBodyCellId(
        e.currentTarget,
        totalColumns,
        totalRows
      );
      document.querySelector(`[data-body-cell-id="${nextCell}"]`).focus();
    }
    if (e.keyCode === KEY_CODES.UP) {
      console.log("press up");
      const upCell = findUpBodyCellId(e.currentTarget);
      document.querySelector(`[data-body-cell-id="${upCell}"]`).focus();
    }
    if (e.keyCode === KEY_CODES.DOWN) {
      console.log("press top");
      const downCell = findDownBodyCellId(e.currentTarget, totalRows);
      document.querySelector(`[data-body-cell-id="${downCell}"]`).focus();
    }
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
