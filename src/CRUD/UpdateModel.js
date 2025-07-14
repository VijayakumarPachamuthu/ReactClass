import React from "react";
import axios from "axios";

const fieldList = ["name", "gender", "experiance", "role", "salary"];

function UpdateModel({ mode, selectedEmp, setSelectedEmp, fetchEmployees }) {
  const handleChange = (field, value) => {
    setSelectedEmp({
      ...selectedEmp,
      [field]: value,
    });
  };

  const handleSave = () => {
    const updatedEmp = {
      ...selectedEmp,
      experiance: parseFloat(selectedEmp.experiance),
    };

    axios
      .put(`http://localhost:8082/getUpdate/${updatedEmp.id}`, updatedEmp)
      .then(() => {
        const modalEl = document.getElementById("viewModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
        modalInstance.hide();
        fetchEmployees();
      })
      .catch((err) => console.error("Update failed:", err));
  };

  const renderFormFields = () =>
    fieldList.map((field) => (
      <div className="mb-2" key={field}>
        <label className="form-label">
          {field.charAt(0).toUpperCase() + field.slice(1)}
        </label>
        <input
          className="form-control"
          value={selectedEmp[field]}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      </div>
    ));

  return (
    <div>
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
                  <form>{renderFormFields()}</form>
                ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              {mode === "edit" && (
                <button className="btn btn-success" onClick={handleSave}>
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateModel;
