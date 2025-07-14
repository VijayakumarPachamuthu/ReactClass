import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import Post from "./Post";
import ForwordAndBack from "./ForwordAndBack.js";
import UpdateModel from "./UpdateModel.js";

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
            <i className="bi bi-search-heart"></i>
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
      <UpdateModel
        mode={mode}
        selectedEmp={selectedEmp}
        setSelectedEmp={setSelectedEmp}
        fetchEmployees={fetchEmployees}
      />

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
