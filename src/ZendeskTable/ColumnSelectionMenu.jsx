import React, { useState } from "react";
import { Dropdown, Menu, Item, Trigger } from "@zendeskgarden/react-dropdowns";
import { Button } from "@zendeskgarden/react-buttons";
import { Row, Col } from "@zendeskgarden/react-grid";
import { ReactComponent as ChevronIcon } from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import ColumnSelectionMenuTable from "./ColumnSelectionMenuTable";
const ColumnSelectionMenu = ({ columns }) => {
  const [rotated, setRotated] = useState(false);

  const ListOfItems = ({ columns }) => {
    return columns.map((column) => {
      return (
        <Item key={column.name} value={column.name}>
          {column.displayName}
        </Item>
      );
    });
  };

  return (
    <Row>
      <Col textAlign="center">
        <Dropdown
        // onSelect={(item) => console.log(`You planted a ${item}`)}
        // onStateChange={(options) =>
        //   Object.prototype.hasOwnProperty.call(options, "isOpen") &&
        //   setRotated(options.isOpen)
        // }
        >
          <Trigger>
            <Button>
              Choose succulent
              <Button.EndIcon isRotated={rotated}>
                <ChevronIcon />
              </Button.EndIcon>
            </Button>
          </Trigger>
          <Menu>
            {/* <Item key="s" value="s"> */}
            <ColumnSelectionMenuTable />
            {/* </Item> */}
            {/* <ListOfItems columns={columns} /> */}
          </Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default ColumnSelectionMenu;
