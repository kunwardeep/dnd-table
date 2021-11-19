/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, useRef, useEffect } from "react";
import { Dropdown, Menu, Item, Trigger } from "@zendeskgarden/react-dropdowns";
import { Button } from "@zendeskgarden/react-buttons";
import { Row, Col } from "@zendeskgarden/react-grid";
import { ReactComponent as ChevronIcon } from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import { ReactComponent as CheckIcon } from "@zendeskgarden/svg-icons/src/16/check-lg-stroke.svg";
import styled from "styled-components";
import { IColumnListProps, ITableColumn } from "./tableProps";
import { Span } from "@zendeskgarden/react-typography";
import { MD } from "@zendeskgarden/react-typography";
import { MediaInput } from "@zendeskgarden/react-forms";
import { ReactComponent as StartIcon } from "@zendeskgarden/svg-icons/src/16/search-stroke.svg";
import { ReactComponent as XStrokeIcon } from "@zendeskgarden/svg-icons/src/16/x-stroke.svg";
import debounce from "lodash.debounce";
import { ActionToggleColumn } from "./tableProps";
const ClearSearch = styled.div`
  cursor: pointer;
`;

const StyleCheckIconGreenVisible = styled(CheckIcon)`
  color: #1f73b7;
  margin-right: 10px;
  vertical-align: middle;
`;
const StyleCheckIconGreenInVisible = styled(StyleCheckIconGreenVisible)`
  visibility: hidden;
`;

const StyledItem = styled(Item)`
  // line-height: 20px;
`;
const StyledSpan = styled(Span)`
  // line-height: 21px;
`;

type CheckIconComponentProps = {
  isVisible: boolean;
};

const CheckIconComponent = React.memo<CheckIconComponentProps>(
  ({ isVisible }) => {
    return isVisible ? (
      <StyleCheckIconGreenVisible />
    ) : (
      <StyleCheckIconGreenInVisible />
    );
  }
);

const toggleColumnVisibility = (
  columnName: string,
  [...columns]: ITableColumn[]
) => {
  return columns.map((col) => {
    if (col.name === columnName) {
      return Object.assign({}, col, {
        isVisible: !col.isVisible,
      });
    }
    return col;
  });
};

const ColumnList = React.memo<IColumnListProps>(
  ({ columnListColumns, dispatch }) => {
    const [rotated, setRotated] = useState<boolean | undefined>();
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const [filteredColumns, setFilteredColumns] = useState(columnListColumns);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      if (inputValue === "") {
        setFilteredColumns(columnListColumns);
      }
    }, [columnListColumns, inputValue]);

    /**
     * Debounce filtering
     */
    const filterMatchingOptionsRef = useRef(
      debounce((value: string) => {
        const matchedFilters = filteredColumns.filter(
          (column) =>
            column.displayName
              .trim()
              .toLowerCase()
              .indexOf(value.trim().toLowerCase()) !== -1
        );

        setFilteredColumns(matchedFilters);
      }, 100)
    );

    useEffect(() => {
      filterMatchingOptionsRef.current(inputValue);
    }, [inputValue]);

    const clickOnDropDownButton = () => {
      setIsDropDownOpen(!isDropDownOpen);
    };

    const handleOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
      const currentColumnName = e?.currentTarget?.id;

      const toggledColumns = toggleColumnVisibility(
        currentColumnName,
        columnListColumns
      );
      dispatch(ActionToggleColumn(toggledColumns));
    };

    const handleSearchBoxOnChange = (e: { target: { value: string } }) => {
      setInputValue(e?.target?.value);
    };

    const searchEndIcon = () => {
      return (
        <ClearSearch role="button" onClick={() => setInputValue("")}>
          <XStrokeIcon aria-label="x-icon" />
        </ClearSearch>
      );
    };

    return (
      <Row>
        <Col textAlign="end">
          <Dropdown
            isOpen={isDropDownOpen}
            onStateChange={(options) =>
              Object.prototype.hasOwnProperty.call(options, "isOpen") &&
              setRotated(options.isOpen)
            }
          >
            <Trigger>
              <Button onClick={clickOnDropDownButton}>
                Edit columns
                <Button.EndIcon isRotated={rotated}>
                  <ChevronIcon />
                </Button.EndIcon>
              </Button>
            </Trigger>
            <Menu maxHeight="800px">
              <Item key="editColumn" value="Edit columns">
                <MD isBold>Edit columns</MD>
              </Item>
              <Item key="searchBox" value="search box">
                <MediaInput
                  start={<StartIcon />}
                  end={searchEndIcon()}
                  value={inputValue}
                  onChange={handleSearchBoxOnChange}
                />
              </Item>
              {filteredColumns.map((column: any) => {
                return (
                  <StyledItem
                    key={column.name}
                    value={column.name}
                    id={column.name}
                    onClick={handleOnClick}
                  >
                    <StyledSpan>
                      <CheckIconComponent isVisible={column.isVisible} />
                      {column.displayName}
                    </StyledSpan>
                  </StyledItem>
                );
              })}
            </Menu>
          </Dropdown>
        </Col>
      </Row>
    );
  }
);

export default ColumnList;
