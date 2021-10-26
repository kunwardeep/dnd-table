import React from "react";
import { Droppable } from "react-beautiful-dnd";
import HeaderItem from "./HeaderItem";
import { HeaderRow as HR } from "@zendeskgarden/react-tables";

const HeaderRow = () => {
  return (
    <Droppable droppableId={"1"}>
      {(provided) => (
        <HR ref={provided.innerRef} {...provided.droppableProps}>
          <HeaderItem key={1} name="Name" dragableId={"1"} index={1} />
          <HeaderItem key={2} name="Email" dragableId={"2"} index={2} />
          <HeaderItem key={3} name="Tag" dragableId={"3"} index={3} />
          {provided.placeholder}
        </HR>
      )}
    </Droppable>
  );
};

export default HeaderRow;
