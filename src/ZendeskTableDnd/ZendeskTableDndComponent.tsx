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
import {
  KEYBOARD_KEYS,
  CELL_TYPE_BODY,
  CELL_TYPE_HEADER,
  navigateUsingKeys,
} from "./keyboardInteraction";
import { Span } from "@zendeskgarden/react-typography";

import { DATA_COMPONENT_ID, bodyCellId, headerCellId } from "./tableMetaData";
import { ActionMoveColumn, ITableProps } from "./tableProps";
import { ReactComponent as GripIcon } from "@zendeskgarden/svg-icons/src/16/grip.svg";
import { getCurrentHeaderRowAndColumnIdx } from "./keyboardInteraction";

// Module Augmentation - Adding more attributes to existing element - https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation
declare module "react" {
  interface ThHTMLAttributes<T> {
    dragOver?: boolean;
  }
  interface TdHTMLAttributes<T> {
    dragOver?: boolean;
  }
}

const StyledGripIcon = styled(GripIcon)`
  vertical-align: middle;
  margin-right: 5px;
`;

const StyledDiv = styled.div`
  overflow: auto;
`;

const StyledBodyCell = styled(Cell)`
  white-space: nowrap;
`;

const StyledSpan = styled(Span)`
  // this padding is same width as StyledGripIcon component
  padding-left: 21px;
`;

// cursor: ${({ dragging }) => dragging && "move"};

const StyledHeaderCell = styled(HeaderCell)`
  border-left: ${({ dragOver }) =>
    dragOver ? "3px solid #1F73B7" : "solid 3px transparent"};
  &:hover {
    color: #1f73b7;
    cursor: grab;
  }
  background-color: ${({ dragOver }) => dragOver && "#CEE2F2"};
  white-space: nowrap;
  vertical-align: middle;
  box-sizing: border-box;
`;

const StyledTable = styled(Table)`
  table-layout: fixed;
  max-width: none;
  width: auto;
  min-width: 100%;
`;

const ZendeskTableDndComponent = React.memo<ITableProps>(
  ({ columns, rows, dispatch }) => {
    // mouse columns with mouse
    const [draggingColumnIdx, setDraggingColumnIdx] = useState(0);
    const [dragOverColumnName, setDragOverColumnName] = useState("");
    const [draggingColumnName, setDraggingColumnName] = useState("");
    // move columns with keyboard
    const [movingColumnIdx, setMovingColumnIdx] = useState(0);

    const [headerCellTabPressed, setHeaderCellTabPressed] = useState(false);
    const [headerCellMoving, setHeaderCellMoving] = useState(false);

    const handleDragStart = (e: React.MouseEvent<HTMLElement>) => {
      const { id } = e.target as HTMLElement;

      const idx = columns.findIndex((column) => column.name === id);
      setDraggingColumnIdx(idx);
      setDraggingColumnName(id);
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

      dispatch(ActionMoveColumn(moveColumns(draggingColumnIdx, droppedColIdx)));
      setDraggingColumnIdx(0);
      setDragOverColumnName("");
      setDraggingColumnName("");
    };

    const moveColumns = (movedFromIdx: number, movedToIdx: number) => {
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

    const swap = ([...arr], index1: number, index2: number) => {
      const temp = arr[index1];
      arr[index1] = arr[index2];
      arr[index2] = temp;
      return arr;
    };

    const onHeaderCellKeyUp = (
      e: React.KeyboardEvent<HTMLTableCellElement>
    ) => {
      if (!headerCellTabPressed) {
        if (e.key === KEYBOARD_KEYS.SPACE_BAR) {
          setHeaderCellTabPressed(true);

          const [_, colIdx] = getCurrentHeaderRowAndColumnIdx(
            e.currentTarget as HTMLTableCellElement
          );
          setMovingColumnIdx(colIdx);
        } else {
          navigateHeader(e);
        }
      } else {
        const totalColumns = columns.length;
        if (e.key === KEYBOARD_KEYS.ARROW_LEFT && movingColumnIdx !== 0) {
          setHeaderCellMoving(true);
          dispatch(
            ActionMoveColumn(
              swap(columns, movingColumnIdx - 1, movingColumnIdx)
            )
          );
          setMovingColumnIdx(movingColumnIdx - 1);
        }
        if (
          e.key === KEYBOARD_KEYS.ARROW_RIGHT &&
          movingColumnIdx < totalColumns - 1
        ) {
          setHeaderCellMoving(true);
          dispatch(
            ActionMoveColumn(
              swap(columns, movingColumnIdx + 1, movingColumnIdx)
            )
          );
          setMovingColumnIdx(movingColumnIdx + 1);
        }
        if (headerCellMoving && e.key === KEYBOARD_KEYS.SPACE_BAR) {
          setHeaderCellTabPressed(false);
          setHeaderCellMoving(false);
          setMovingColumnIdx(0);
        }
      }
    };

    const navigateBody = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
      navigateUsingKeys(e, CELL_TYPE_BODY, columns.length, rows.length);
    };

    const navigateHeader = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
      navigateUsingKeys(e, CELL_TYPE_HEADER, columns.length, rows.length);
    };

    return (
      <StyledDiv tabIndex={0} data-component-id={DATA_COMPONENT_ID}>
        <StyledTable>
          <Head>
            <HeaderRow>
              {columns.map((col, colIdx) => {
                return (
                  <StyledHeaderCell
                    data-header-cell-id={headerCellId(0, colIdx)}
                    tabIndex={0}
                    width={col.width}
                    id={col.name}
                    key={col.name}
                    draggable
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleOnDrop}
                    onDragEnter={handleDragEnter}
                    dragOver={
                      col.name === dragOverColumnName &&
                      draggingColumnName !== dragOverColumnName
                    }
                    onKeyUp={onHeaderCellKeyUp}
                  >
                    <StyledGripIcon />
                    {col.displayName}
                  </StyledHeaderCell>
                );
              })}
            </HeaderRow>
          </Head>
          <Body>
            {rows.map((row: any, rowIdx: number) => {
              return (
                <Row key={rowIdx} id={rowIdx.toString()}>
                  {Object.entries(row).map((_, colIdx) => {
                    return (
                      <StyledBodyCell
                        data-body-cell-id={bodyCellId(rowIdx, colIdx)}
                        tabIndex={0}
                        key={colIdx}
                        onKeyUp={navigateBody}
                      >
                        <StyledSpan>{row[columns[colIdx].name]}</StyledSpan>
                      </StyledBodyCell>
                    );
                  })}
                </Row>
              );
            })}
          </Body>
        </StyledTable>
      </StyledDiv>
    );
  }
);

export default ZendeskTableDndComponent;
