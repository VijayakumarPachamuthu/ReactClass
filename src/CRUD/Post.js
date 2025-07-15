import React, { useState } from "react";
import axios from "axios";

function Post({ onAdd }) {
  const [emp, setEmp] = useState({
    name: "",
    gender: "",
    experiance: "",
    role: "",
    salary: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmp = { ...emp };

    axios
      .post("http://localhost:8082/postSingleObject", newEmp)
      .then(() => {
        setEmp({
          name: "",
          gender: "",
          experiance: "",
          role: "",
          salary: "",
        });
        if (onAdd) onAdd();

        // Show Bootstrap toast
        const toastEl = document.getElementById("successToast");
        const bsToast = new window.bootstrap.Toast(toastEl);
        bsToast.show();
      })
      .catch((err) => console.error("Error adding employee:", err));
  };

  return (
    <div className="container m-5">
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded bg-light shadow-sm"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <h5 className="mb-3 text-center text-primary">Add New Employee</h5>
        {["name", "gender", "experiance", "role", "salary"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label fw-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={
                field === "experiance" || field === "salary" ? "number" : "text"
              }
              className="form-control"
              placeholder={`Enter ${field}`}
              value={emp[field]}
              onChange={(e) => setEmp({ ...emp, [field]: e.target.value })}
              required
            />
          </div>
        ))}
        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>

      {/* ✅ Bootstrap Toast */}
      <div
        className="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-4"
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
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Post;
