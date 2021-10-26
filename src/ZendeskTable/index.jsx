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

  return (
    <div tabindex={0} style={{ overflowX: "auto" }}>
      <StyledTable>
        <Head>
          <HeaderRow>
            {cols.map((col) => (
              <StyledHeaderCell
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
            <Row key={rowIdx} id={rowIdx} tabIndex="2">
              {Object.entries(row).map(([_, v], idx) => (
                <StyledCell
                  key={v}
                  dragOver={cols[idx].name === dragOverColumnName}
                >
                  {row[cols[idx].name]}
                </StyledCell>
              ))}
            </Row>
          ))}
        </Body>
      </StyledTable>
      <button>sss</button>
      <button>sss</button>
      <button>sss</button>
      <button>sss</button>
    </div>
  );
};

const StyledCell = styled(Cell)`
  border-left: ${({ dragOver }) => dragOver && "1px solid green"};
`;

const StyledHeaderCell = styled(HeaderCell)`
  border-left: ${({ dragOver }) => dragOver && "1px solid green"};
`;

const StyledTable = styled(Table)``;

export default ZendeskTable;
