import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

import Post from "./Post";

function GetEmpList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [mode, setMode] = useState("view");
  const [showPostForm, setShowPostForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5;

  //  Filter employees
  const filteredEmployees = React.useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return employees.filter((emp) => {
      const name = emp.name?.toLowerCase() || "";
      return name.startsWith(term) || name.includes(term);
    });
  }, [employees, searchTerm]);

  // Paginate filtered employees
  const currentEmployees = React.useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredEmployees, currentPage]);

  // Load employees
  useEffect(() => {
    axios
      .get("http://localhost:8082/getFindAll")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  //  View or update modal handling
  const handleView = (emp, mode = "view") => {
    setSelectedEmp(emp);
    setMode(mode);
    const modal = new window.bootstrap.Modal(
      document.getElementById("viewModal")
    );
    modal.show();
  };

  //  Delete employee
  const handleDelete = (emp) => {
    axios
      .delete(`http://localhost:8082/getDeleteById/${emp.id}`)
      .then(() => {
        setEmployees((prev) => prev.filter((e) => e.id !== emp.id));
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employee List</h2>

      {/* Search */}
      <div className="d-flex justify-content-end mb-3">
        <div className="input-group w-25">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
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
          {currentEmployees.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-danger">
                No matching employee found
              </td>
            </tr>
          ) : (
            currentEmployees.map((emp) => (
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
                    onClick={() => handleView(emp, "view")}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleView(emp, "edit")}
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
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              {"<"}
            </button>
          </li>
          {Array.from(
            { length: Math.ceil(filteredEmployees.length / itemsPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
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
              currentPage === Math.ceil(filteredEmployees.length / itemsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              {">"}
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
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              {mode === "edit" && (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    const updatedEmp = {
                      ...selectedEmp,
                      experiance: parseInt(selectedEmp.experiance, 10),
                      salary: parseFloat(selectedEmp.salary),
                    };
                    axios
                      .put(
                        `http://localhost:8082/getUpdate/${updatedEmp.id}`,
                        updatedEmp
                      )
                      .then(() => {
                        const modalEl = document.getElementById("viewModal");
                        window.bootstrap.Modal.getInstance(modalEl).hide();
                        return axios.get("http://localhost:8082/getFindAll");
                      })
                      .then((res) => setEmployees(res.data))
                      .catch((err) => console.error("Update failed:", err));
                  }}
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post Form */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowPostForm(!showPostForm)}
      >
        {showPostForm ? "Hide Post Form" : "Add New Employee"}
      </button>
      {showPostForm && <Post />}
    </div>
  );
}

export default GetEmpList;
