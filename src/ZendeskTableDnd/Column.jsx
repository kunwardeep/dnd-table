import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from "@zendeskgarden/react-tables";

const Column = ({
  columnIdStr,
  index,
  first,
  columnName,
  rows,
  width,
  hoverRowIndex,
  setHoverRowIndex,
  focusRowIndex,
  setFocusRowIndex,
}) => {
  const handleMouseOver = (e) => {
    const { id } = e.currentTarget;
    setHoverRowIndex(parseInt(id, 10));
  };
  const handleOnClick = (e) => {
    const { id } = e.currentTarget;
    setFocusRowIndex(parseInt(id, 10));
  };

  return (
    <Draggable draggableId={columnIdStr} index={index}>
      {(provided) => (
        <StyledTable
          width={width}
          key={index}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Head>
            <HeaderRow>
              <HeaderCell>{columnName}</HeaderCell>
            </HeaderRow>
          </Head>
          <Body>
            {rows.map((row, rowIdx) => {
              return (
                <Row
                  id={rowIdx}
                  key={rowIdx}
                  isHovered={rowIdx === hoverRowIndex}
                  isFocused={first && rowIdx === focusRowIndex}
                  onMouseOver={handleMouseOver}
                  onClick={handleOnClick}
                >
                  <StyledCell isTruncated>{row[columnName]}</StyledCell>
                </Row>
              );
            })}
          </Body>
        </StyledTable>
      )}
    </Draggable>
  );
};

export default Column;

const StyledCell = styled(Cell)``;

const StyledTable = styled(Table)`
  // table-layout: fixed;
  width: ${(props) => props.width || "500px"};
  // overflow: hidden;
  // display: inline-table;
`;
