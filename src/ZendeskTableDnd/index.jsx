import React, { useState } from "react";
import Column from "./Column";

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

const ZendeskTableDnd = () => {
  const [hoverRowIndex, setHoverRowIndex] = useState(null);
  const [focusRowIndex, setFocusRowIndex] = useState(null);

  return (
    <div tabIndex={0}>
      <div style={{ overflowX: "auto" }}>
        <Column
          first={true}
          key={1}
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
          key={2}
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
          key={3}
          columnName="email"
          rows={rows}
          width={"200px"}
          hoverRowIndex={hoverRowIndex}
          setHoverRowIndex={setHoverRowIndex}
          focusRowIndex={focusRowIndex}
          setFocusRowIndex={setFocusRowIndex}
        />
      </div>
      <button>sss</button>

      <button>sss</button>
      <button>sss</button>
      <button>sss</button>
    </div>
  );
};

export default ZendeskTableDnd;
