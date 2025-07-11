import React from "react";

function List({ names }) {
  return (
    <div>
      {names.length > 0 && (
        <>
          <h3 className="mt-5">Submitted Students</h3>
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {names.map((stu, index) => (
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
