import styled from "styled-components";

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
    <StyledTable width={width}>
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
  );
};

export default Column;

const StyledCell = styled(Cell)``;

const StyledTable = styled(Table)`
  table-layout: fixed;
  width: ${(props) => props.width || "500px"};
  overflow: hidden;
  display: inline-table;
`;
