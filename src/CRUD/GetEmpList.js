import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import Post from "./Post";
import Pagination from "./ForwordAndBack.js";
import ForwordAndBack from "./ForwordAndBack.js";

function GetEmpList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [mode, setMode] = useState("view");
  const [showPostForm, setShowPostForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8082/getFindAll")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  };

  const filteredEmployees = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return employees.filter((emp) => emp.name?.toLowerCase().includes(term));
  }, [employees, searchTerm]);

  const currentEmployees = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredEmployees, currentPage]);

  const handleView = (emp, mode = "view") => {
    setSelectedEmp(emp);
    setMode(mode);
    const modal = new window.bootstrap.Modal(
      document.getElementById("viewModal")
    );
    modal.show();
  };

  const handleDelete = (emp) => {
    axios
      .delete(`http://localhost:8082/getDeleteById/${emp.id}`)
      .then(() => setEmployees((prev) => prev.filter((e) => e.id !== emp.id)))
      .catch((error) => console.error("Error deleting employee:", error));
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
                <td className="align-middle mx-4">
                  <div className="d-flex justify-content-between ">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleView(emp, "view")}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
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
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <ForwordAndBack
        totalPages={Math.ceil(filteredEmployees.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
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
              <h5 className="modal-title">
                {mode === "view" ? "Employee Details" : "Edit Employee"}
              </h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
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
                  <form>
                    {["name", "gender", "experiance", "role", "salary"].map(
                      (field) => (
                        <div className="mb-2" key={field}>
                          <label className="form-label">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <input
                            className="form-control"
                            value={selectedEmp[field]}
                            onChange={(e) =>
                              setSelectedEmp({
                                ...selectedEmp,
                                [field]: e.target.value,
                              })
                            }
                          />
                        </div>
                      )
                    )}
                  </form>
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
                      experiance: parseInt(selectedEmp.experiance),
                      salary: parseFloat(selectedEmp.salary),
                    };
                    axios
                      .put(
                        `http://localhost:8082/getUpdate/${updatedEmp.id}`,
                        updatedEmp
                      )
                      .then(() => {
                        window.bootstrap.Modal.getInstance(
                          document.getElementById("viewModal")
                        ).hide();
                        fetchEmployees();
                      })
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
        className="btn btn-primary my-3"
        onClick={() => setShowPostForm(!showPostForm)}
      >
        {showPostForm ? "Hide Post Form" : "Add New Employee"}
      </button>
      {showPostForm && <Post onAdd={fetchEmployees} />}
    </div>
  );
}

export default GetEmpList;
