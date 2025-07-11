import React, { useState } from "react";
import List from "./List";

function Forms() {
  const [user, setUser] = useState({ name: "", age: 0, gender: "" });
  const [submitUser, setSubmitUser] = useState([]); 
  return (
    <div>
      <div className="container mt-5">
        <h2 className="mb-4 text-gray">Props Sending Parent to Child</h2>
        <h2 className="mb-4 text-primary">Student Detail Form</h2>
        <div className="align-items-center">
          <div className="row mb-3 ">
            <label className="col-sm-4 col-form-label fw-semibold">
              Enter Name:
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-semibold">
              Enter Age:
            </label>
            <div className="col-sm-6">
              <input
                type="number"
                className="form-control"
                value={user.age}
                onChange={(e) => setUser({ ...user, age: e.target.value })}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-semibold ">
              Enter Gender:
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                value={user.gender}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              />
            </div>
          </div>

          <div className="row">
            <div className=" ">
              <button
                onClick={() => {
                  setSubmitUser([...submitUser, user]);
                  setUser({ name: "", age: 0, gender: "" });
                }}
                className="col-sm-3 btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>

          <List names={submitUser} />
        </div>
      </div>
    </div>
  );
}

export default Forms;
