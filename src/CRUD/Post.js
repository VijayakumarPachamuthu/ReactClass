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
    const newEmp = {
      name: emp.name,
      gender: emp.gender,
      experiance: emp.experiance,
      role: emp.role,
      salary: emp.salary,
    };

    axios.post("http://localhost:8082/postSingleObject", newEmp)
      .then(() => {
        setEmp({ name: "", gender: "", experiance: "", role: "", salary: "" });
        if (onAdd) onAdd(); // refresh employee list
      })
      .catch((err) => console.error("Error adding employee:", err));
  };

  return (
    <div className="container m-5">
      <form
        onSubmit={handleSubmit}
        className="border  p-4 rounded bg-light shadow-sm"
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
    </div>
  );
}

export default Post;
