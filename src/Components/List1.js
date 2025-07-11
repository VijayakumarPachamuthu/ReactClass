import React, { useState } from "react";
import Form1 from "./Form1";

function List1() {
  const [namesIn, setNamesIn] = useState([]);
  function reciveData(data) {
    setNamesIn(data);
  }
  return (
    <div>
      List1
      <Form1 onSendData={reciveData} />
      <ol>
        {namesIn.map((value, i) => (
          <li> {value}    </li>
        ))}
      </ol>
    </div>
  );
}

export default List1;
