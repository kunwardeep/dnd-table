import React, { useState } from "react";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

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

const TableColumns = styled.div`
  padding: 8px;
`;

const ZendeskTableDnd = () => {
  const [hoverRowIndex, setHoverRowIndex] = useState(null);
  const [focusRowIndex, setFocusRowIndex] = useState(null);
  const onDragEnd = (result) => {
    console.log("Drag end");
  };
  return (
    <div tabIndex={0}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"droppable"}>
          {(droppableProps) => {
            return (
              <TableColumns ref={droppableProps.innerRef} {...droppableProps}>
                <Column
                  first={true}
                  columnIdStr="pet name"
                  index={0}
                  columnName="pet name"
                  rows={rows}
                  width={"200px"}
                  hoverRowIndex={hoverRowIndex}
                  setHoverRowIndex={setHoverRowIndex}
                  focusRowIndex={focusRowIndex}
                  setFocusRowIndex={setFocusRowIndex}
                />
                <Column
                  first={false}
                  columnIdStr="parent name"
                  index={1}
                  columnName="parent name"
                  rows={rows}
                  width={"200px"}
                  hoverRowIndex={hoverRowIndex}
                  setHoverRowIndex={setHoverRowIndex}
                  focusRowIndex={focusRowIndex}
                  setFocusRowIndex={setFocusRowIndex}
                />
                <Column
                  first={false}
                  columnIdStr="email"
                  index={2}
                  columnName="email"
                  rows={rows}
                  width={"200px"}
                  hoverRowIndex={hoverRowIndex}
                  setHoverRowIndex={setHoverRowIndex}
                  focusRowIndex={focusRowIndex}
                  setFocusRowIndex={setFocusRowIndex}
                />
                <Column
                  first={false}
                  columnIdStr="last visit"
                  index={3}
                  columnName="last visit"
                  rows={rows}
                  width={"200px"}
                  hoverRowIndex={hoverRowIndex}
                  setHoverRowIndex={setHoverRowIndex}
                  focusRowIndex={focusRowIndex}
                  setFocusRowIndex={setFocusRowIndex}
                />
                {droppableProps.placeholder}
              </TableColumns>
            );
          }}
        </Droppable>
      </DragDropContext>
      <button>sss</button>

      <button>sss</button>
      <button>sss</button>
      <button>sss</button>
    </div>
  );
};

export default ZendeskTableDnd;
