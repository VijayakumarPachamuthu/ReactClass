import axios from "axios";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Required for Bootstrap Toast
import { useNavigate } from "react-router-dom";

function Post() {
  const [employee, setEmployee] = useState({
    name: "",
    gender: "",
    experience: 0,
    role: "",
    salary: 0,
  });
  const [showToast, setShowToast] = useState(false);

  function handleAdd() {
    axios.post("http://localhost:8082/postSingleObject", employee)
      .then(() => {
        setEmployee({
          name: "",
          gender: "",
          experience: 0,
          role: "",
          salary: 0,
        });

        // Show toast
        const toastEl = document.getElementById("successToast");
        const bsToast = new window.bootstrap.Toast(toastEl);
        bsToast.show();
        setShowToast(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  }

  return (
    <div className="container m-5">
      <div className="d-flex justify-content-center align-items-center gap-3">
        <div className="card col-7 shadow p-4">
          <h3 className="text-center mb-4">Add New Employee</h3>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <input
              type="text"
              className="form-control"
              value={employee.gender}
              onChange={(e) =>
                setEmployee({ ...employee, gender: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Experience (Years)</label>
            <input
              type="number"
              className="form-control"
              value={employee.experience}
              onChange={(e) =>
                setEmployee({ ...employee, experience: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              value={employee.role}
              onChange={(e) =>
                setEmployee({ ...employee, role: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Salary</label>
            <input
              type="number"
              className="form-control"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handleAdd}>
            Add Employee
          </button>
        </div>
      </div>

      {/* Toast */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          className="toast text-white bg-success"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          id="successToast"
        >
          <div className="d-flex">
            <div className="toast-body">Employee added successfully!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
