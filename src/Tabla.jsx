import React, { useState } from "react";
import generateData from "./generateData";
import styled from "styled-components";

const { columns, rows } = generateData(7);

console.log("columns", columns);
console.log("rows", rows);

const Tabla = () => {
  const [cols, setCols] = useState(columns);
  const [dragOver, setDragOver] = useState("");
  const [columnIdx, setColumIdx] = useState(0);

  const handleDragStart = (e) => {
    // grab element id (this will be column name)
    const { id } = e.target;
    console.log("tager", e.target);
    console.log("DRAG start column name - ", id);
    // find the index of the the column under drag
    const idx = cols.indexOf(id);
    setColumIdx(idx);
  };

  //
  const handleDragEnter = (e) => {
    // grab element id (this will be column name of the element we will be dropping on)
    const { id } = e.target;
    console.log("DRAG enter column name - ", id);
    setDragOver(id);
  };

  // fires when the mouse is hovering over a column
  // we are doing nothing here
  const handleDragOver = (e) => {
    e.preventDefault();
    const { id } = e.target;
    console.log("DRAG over column name - ", id);
  };

  // fires when you release the mouse
  const handleOnDrop = (e) => {
    const { id } = e.target;
    console.log("DRAG on drop column name - ", id);

    // index of the column we are dropping on
    const droppedColIdx = cols.indexOf(id);
    const draggedColIdx = columnIdx;

    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];
    setCols(tempCols);

    console.log("tempCols", tempCols);

    setDragOver("");
  };

  return (
    <div className="App">
      <Table>
        <thead>
          <tr>
            {cols.map((col) => (
              <StyledTh
                id={col}
                key={col}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                onDragEnter={handleDragEnter}
                dragOver={col === dragOver}
              >
                {col}
              </StyledTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} id={rowIdx}>
              {Object.entries(row).map(([k, v], idx) => (
                <Cell key={v} dragOver={cols[idx] === dragOver}>
                  {row[cols[idx]]}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Table = styled.table`
  border-collapse: collapse;
`;

const Cell = styled.td`
  font-size: 14px;
  text-align: left;
  text-transform: capitalize;
  vertical-align: center;
  padding: 20px;
  border-bottom: 2px solid #eef0f5;
  text-transform: lowercase;
  border-left: ${({ dragOver }) => dragOver && "1px solid green"};
`;

const StyledTh = styled.th`
  white-space: nowrap;
  color: #716f88;
  letter-spacing: 1.5px;
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  text-transform: capitalize;
  vertical-align: center;
  padding: 20px;
  border-bottom: 2px solid #eef0f5;
  text-transform: uppercase;
  border-left: ${({ dragOver }) => dragOver && "1px solid green"};
`;

export default Tabla;
