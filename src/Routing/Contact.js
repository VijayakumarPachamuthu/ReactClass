import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Contact() {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);

  useEffect(() => {
    console.log('Component Init');
  }, [names]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">📞 Contact Page</h2>

      {/* Input + Button */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="btn btn-success"
          onClick={() => {
            if (name.trim() !== '') {
              setNames([...names, name]);
              setName('');
            }
          }}
        >
          Save
        </button>
      </div>

      {/* Display list */}
      <ul className="list-group">
        {names.map((name, index) => (
          <li key={index} className="list-group-item">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contact;
