import { Field, Label, Checkbox } from "@zendeskgarden/react-forms";
import { Row, Col } from "@zendeskgarden/react-grid";
import { useState } from "react";

const ColumnList = ({ tableColumns, setExternalColumns }) => {
  const [checkBoxList, setCheckBoxList] = useState(tableColumns);
  // this is duplicate .. lets pass it in or somehow automgivally the secols only sets the visible columns
  const displayedDataColumns = (columns) =>
    columns.filter((col) => {
      return col.isDisplayed === true;
    });

  const onChangeEvent = (e) => {
    const { name } = e.currentTarget;

    let newColumns = checkBoxList.map((listItem) => {
      console.log("listItemName", name);
      console.log("listItem.name", listItem.name);
      if (listItem.name === name) {
        listItem.isDisplayed = !listItem.isDisplayed;
      }
      return listItem;
    });
    console.log(newColumns);
    // setCheckBoxList(newColumns);
    setExternalColumns(displayedDataColumns(newColumns));
    console.log(newColumns);
  };

  return checkBoxList.map((listItem) => {
    return (
      <Field key={listItem.name}>
        <Checkbox
          name={listItem.name}
          checked={listItem.isDisplayed}
          onChange={onChangeEvent}
        >
          <Label>{listItem.displayName}</Label>
        </Checkbox>
      </Field>
    );
  });
};

const ListOfColumns = ({ tableColumns, setExternalColumns }) => {
  return (
    <Row justifyContent="center">
      <Col size="auto">
        <ColumnList
          tableColumns={tableColumns}
          setExternalColumns={setExternalColumns}
        />
        {/* <Field>
          <Checkbox checked={drought} onChange={() => setDrought(!drought)}>
            <Label>Drought-tolerant</Label>
          </Checkbox>
        </Field> */}
      </Col>
    </Row>
  );
};

export default ListOfColumns;
