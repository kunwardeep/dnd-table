import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { HeaderCell } from "@zendeskgarden/react-tables";
// const Container = styled.div`
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
//   background-color: white;
// `;

const HeaderItem = ({ name, dragableId, index }) => {
  return (
    <Draggable draggableId={dragableId} index={index}>
      {(provided) => (
        <HeaderCell
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {name}
        </HeaderCell>
      )}
    </Draggable>
  );
};

// export default class Hea extends React.Component {
//   render() {
//     return (
//       <Container>
//         <HeaderCell>Name</HeaderCell>

//         {/* <Droppable droppableId={this.props.column.id}>
//           {(provided) => (
//             <TaskList ref={provided.innerRef} {...provided.droppableProps}>
//               {this.props.tasks.map((task, index) => (
//                 <Task key={task.id} task={task} index={index} />
//               ))}
//               {provided.placeholder}
//             </TaskList>
//           )}
//         </Droppable> */}
//       </Container>
//     );
//   }
// }

export default HeaderItem;
