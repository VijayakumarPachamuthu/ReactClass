import React, { useState } from "react";
import Form from "./Form";

function List() {
  const [reciveData, setReciveData] = useState([]);
  function reciveDatas(data) {
    setReciveData(data);
  }
  return (
    <div>
      
      <Form onSendData={reciveDatas} />
      
      {reciveData.length > 0 && (
        <>
          <h3 className="mt-5">Submitted Students</h3>
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Names</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {reciveData.map((stu, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{stu.name}</td>
                  <td>{stu.age}</td>
                  <td>{stu.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default List;
