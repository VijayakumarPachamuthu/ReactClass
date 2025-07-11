import React from "react";

function List1({ nameIn }) {
  // const [names, setNames] = useState([])
  return (
    <div>
      List1
      <li>List Component</li>
      {nameIn.map((name, i) => (
        <ol key={i}>
          <li>{i + 1 }</li>
          <li>{name}</li>
        </ol>
      ))}
    </div>
  );
}

export default List1;
