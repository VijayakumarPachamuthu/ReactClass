import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Post from "./Post";
function GetEmpList() {
  const [employees, setEmployees] = useState([
    {
      name: "Viji",
      gender: "Male",
      experiance: 0,
      role: "jdj",
      salary: 1223290,
    },
  ]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [mode, setMode] = useState("view");
  const [showPostForm, setShowPostForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change this number

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    axios
      .get("http://localhost:8082/getFindAll")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleView = (emp) => {
    setSelectedEmp(emp);
    setMode("view");
    const modal = new window.bootstrap.Modal(
      document.getElementById("viewModal")
    );
    modal.show();
  };

  const handleUpdate = (emp) => {
    setSelectedEmp(emp);
    setMode("edit");
    const modal = new window.bootstrap.Modal(
      document.getElementById("viewModal")
    );
    modal.show();
  };

  const handleDelete = (emp) => {
    axios
      .delete(`http://localhost:8082/getDeleteById/${emp.id}`)
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((e) => e.id !== emp.id)
        );
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <div>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Employee List</h2>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Experience</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.gender}</td>
                <td>{emp.experiance}</td>
                <td>{emp.role}</td>
                <td>{emp.salary}</td>
                <td className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleView(emp)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleUpdate(emp)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(emp)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {Array.from(
              { length: Math.ceil(employees.length / itemsPerPage) },
              (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}

            <li
              className={`page-item ${
                currentPage === Math.ceil(employees.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

        {/* Bootstrap Modal */}
        <div
          className="modal fade"
          id="viewModal"
          tabIndex="-1"
          aria-labelledby="viewModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewModalLabel">
                  {mode === "view" ? "Employee Details" : "Edit Employee"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                {selectedEmp &&
                  (mode === "view" ? (
                    <ul className="list-group">
                      <li className="list-group-item">ID: {selectedEmp.id}</li>
                      <li className="list-group-item">
                        Name: {selectedEmp.name}
                      </li>
                      <li className="list-group-item">
                        Gender: {selectedEmp.gender}
                      </li>
                      <li className="list-group-item">
                        Experience: {selectedEmp.experiance}
                      </li>
                      <li className="list-group-item">
                        Role: {selectedEmp.role}
                      </li>
                      <li className="list-group-item">
                        Salary: ₹{selectedEmp.salary}
                      </li>
                    </ul>
                  ) : (
                    <div>
                      <div className="mb-2">
                        <label>Name</label>
                        <input
                          className="form-control"
                          value={selectedEmp.name}
                          onChange={(e) =>
                            setSelectedEmp({
                              ...selectedEmp,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-2">
                        <label>Gender</label>
                        <input
                          className="form-control"
                          value={selectedEmp.gender}
                          onChange={(e) =>
                            setSelectedEmp({
                              ...selectedEmp,
                              gender: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-2">
                        <label>Experience</label>
                        <input
                          className="form-control"
                          value={selectedEmp.experiance}
                          onChange={(e) =>
                            setSelectedEmp({
                              ...selectedEmp,
                              experiance: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-2">
                        <label>Role</label>
                        <input
                          className="form-control"
                          value={selectedEmp.role}
                          onChange={(e) =>
                            setSelectedEmp({
                              ...selectedEmp,
                              role: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-2">
                        <label>Salary</label>
                        <input
                          className="form-control"
                          value={selectedEmp.salary}
                          onChange={(e) =>
                            setSelectedEmp({
                              ...selectedEmp,
                              salary: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {mode === "edit" && (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      if (!selectedEmp || !selectedEmp.id) {
                        alert("Invalid employee data.");
                        return;
                      }

                      // Convert experience and salary to numbers to avoid backend issues
                      const updatedEmp = {
                        ...selectedEmp,
                        experiance: parseInt(selectedEmp.experiance, 10),
                        salary: parseFloat(selectedEmp.salary),
                      };

                      console.log("Sending data to update:", updatedEmp); // Debug line

                      axios
                        .put(
                          `http://localhost:8082/getUpdate/${selectedEmp.id}`,
                          updatedEmp
                        )
                        .then((res) => {
                          alert("Updated successfully");

                          // Close the modal manually
                          const modalEl = document.getElementById("viewModal");
                          const modal =
                            window.bootstrap.Modal.getInstance(modalEl);
                          modal.hide();

                          // Refresh employee list
                          return axios.get("http://localhost:8082/getFindAll");
                        })
                        .then((response) => {
                          setEmployees(response.data);
                        })
                        .catch((err) => {
                          console.error("Update failed:", err);
                          alert("Update failed. Please check console.");
                        });
                    }}
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowPostForm(!showPostForm)}
        >
          {showPostForm ? "Hide Post Form" : "Add New Employee"}
        </button>

        {showPostForm && <Post />}
      </div>
    </div>
  );
}

export default GetEmpList;
