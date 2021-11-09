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

import { TableProps, TableColumn, TableRows } from "./tableProps";
import { bodyCellId, headerCellId } from "./tableMetaData";
import { TABLE_BODY_CELL_ID_ATTR } from "./tableMetaData";
// Module Augmentation - Adding more attributes to existing element - https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation
declare module "react" {
  interface ThHTMLAttributes<T> {
    dragOver?: boolean;
  }
  interface TdHTMLAttributes<T> {
    dragOver?: boolean;
  }
}

const verifyColumnsAndRows = (columns: TableColumn[], rows: TableRows) => {
  // We should ensure the the rows have the same columns as specified by the columns variable
};

const StyledCell = styled(Cell)`
  // border-left: ${({ dragOver }) => dragOver && "3px solid green"};
`;

const StyledHeaderCell = styled(HeaderCell)`
  // border-left: ${({ dragOver }) => dragOver && "3px solid green"};
  background-color: ${({ dragOver }) => dragOver && "green"};
`;

const StyledTable = styled(Table)``;

const ZendeskTableDndComponent = React.memo<TableProps>(
  ({ tableColumns, tableRows }) => {
    verifyColumnsAndRows(tableColumns, tableRows);

    const [columns, setColumns] = useState(tableColumns);
    const [rows] = useState(tableRows);
    const [draggingColumnIdx, setDraggingColumnIdx] = useState(0);
    const [dragOverColumnName, setDragOverColumnName] = useState("");

    const [headerCellTabPressed, setHeaderCellTabPressed] = useState(false);
    const [headerCellMoving, setHeaderCellMoving] = useState(false);

    const handleDragStart = (e: React.MouseEvent<HTMLElement>) => {
      const { id } = e.target as HTMLElement;
      const idx = columns.findIndex((column) => column.name === id);
      setDraggingColumnIdx(idx);
    };

    const handleDragEnter = (e: React.MouseEvent<HTMLElement>) => {
      const { id } = e.target as HTMLElement;
      setDragOverColumnName(id);
    };

    const handleDragOver = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
    };

    const handleOnDrop = (e: React.MouseEvent<HTMLElement>) => {
      const { id } = e.target as HTMLElement;
      const droppedColIdx = columns.findIndex((column) => column.name === id);
      setColumns(rearrangeColumns(draggingColumnIdx, droppedColIdx));
      setDragOverColumnName("");
    };

    const rearrangeColumns = (movedFromIdx: number, movedToIdx: number) => {
      const movingLeft = movedFromIdx > movedToIdx;
      const movingRight = movedFromIdx < movedToIdx;
      let newCols = [...columns];
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

    const swap = ([...arr], swapIndex1: number, swapIndex2: number) => {
      const temp = arr[swapIndex1];
      arr[swapIndex1] = arr[swapIndex2];
      arr[swapIndex2] = temp;
      return arr;
    };

    const onHeaderCellKeyUp = (
      e: React.KeyboardEvent<HTMLTableCellElement>
    ) => {
      if (!headerCellTabPressed && e.keyCode === KEY_CODES.SPACE) {
        setHeaderCellTabPressed(true);

        const [_, colIdx] = getCurrentHeaderRowAndColumnIdx(
          e.currentTarget as HTMLTableCellElement
        );
        setDraggingColumnIdx(colIdx);
      }

      if (headerCellTabPressed) {
        const totalColumns = columns.length;
        if (e.keyCode === KEY_CODES.LEFT && draggingColumnIdx !== 0) {
          setHeaderCellMoving(true);
          setDragOverColumnName(e.currentTarget.id);
          setColumns(swap(columns, draggingColumnIdx - 1, draggingColumnIdx));
          setDraggingColumnIdx(draggingColumnIdx - 1);
          setDragOverColumnName("");
        }
        if (
          e.keyCode === KEY_CODES.RIGHT &&
          draggingColumnIdx < totalColumns - 1
        ) {
          setHeaderCellMoving(true);
          setDragOverColumnName(e.currentTarget.id);
          setColumns(swap(columns, draggingColumnIdx + 1, draggingColumnIdx));
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
        console.log("Lets save this config");
      }
    };

    const onBodyCellKeyUp = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
      const totalRows = rows.length;
      const totalColumns = columns.length;
      let moveToCellId: string = bodyCellId(0, 0);
      if (e.keyCode === KEY_CODES.LEFT) {
        moveToCellId = findPreviousBodyCellId(e.currentTarget, totalColumns);
      } else if (e.keyCode === KEY_CODES.RIGHT) {
        moveToCellId = findNextBodyCellId(
          e.currentTarget,
          totalColumns,
          totalRows
        );
      } else if (e.keyCode === KEY_CODES.UP) {
        moveToCellId = findUpBodyCellId(e.currentTarget);
      } else if (e.keyCode === KEY_CODES.DOWN) {
        moveToCellId = findDownBodyCellId(e.currentTarget, totalRows);
      }
      let element: HTMLElement | null = document.querySelector(
        `[${TABLE_BODY_CELL_ID_ATTR}="${moveToCellId}"]`
      );
      if (element != null) {
        element.focus();
      }
    };

    return (
      <div>
        <div tabIndex={0} style={{ overflow: "auto" }}>
          <StyledTable>
            <Head>
              <HeaderRow>
                {columns.map((col, colIdx) => (
                  <StyledHeaderCell
                    data-header-cell-id={headerCellId(colIdx)}
                    tabIndex={0}
                    width={col.width}
                    id={col.name}
                    key={col.name}
                    draggable
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleOnDrop}
                    onDragEnter={handleDragEnter}
                    dragOver={col.name === dragOverColumnName}
                    onKeyUp={onHeaderCellKeyUp}
                  >
                    {col.displayName}
                  </StyledHeaderCell>
                ))}
              </HeaderRow>
            </Head>
            <Body>
              {rows.map((row: any, rowIdx: number) => {
                return (
                  <Row key={rowIdx} id={rowIdx.toString()}>
                    {Object.entries(row).map(([_, v], colIdx) => {
                      return (
                        <StyledCell
                          data-body-cell-id={bodyCellId(rowIdx, colIdx)}
                          tabIndex={0}
                          key={colIdx}
                          onKeyUp={onBodyCellKeyUp}
                        >
                          {row[columns[colIdx].name]}
                        </StyledCell>
                      );
                    })}
                  </Row>
                );
              })}
            </Body>
          </StyledTable>
          <button>sss</button>
          <button>sss</button>
        </div>
      </div>
    );
  }
);

export default ZendeskTableDndComponent;