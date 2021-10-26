import React, { useState } from "react";
import Column from "./Column";
// const columns = [
//   { name: "pet name", displayName: "PET NAME", width: "20" },
//   { name: "parent name", displayName: "PARENT NAME", width: "20" },
//   { name: "email", displayName: "EMAIL", width: "40" },
//   { name: "last visit", displayName: "LAST VISIT", width: "20" },
// ];
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
  return (
    <div tabindex={0} style={{ overflowX: "auto" }}>
      <Column columnName="pet name" rows={rows} />
      <button>sss</button>
      <button>sss</button>
      <button>sss</button>
      <button>sss</button>
    </div>
  );
};

export default ZendeskTableDnd;
