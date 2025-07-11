import  { useState } from 'react'
import { addCustomer, addCustomerData } from '../Slice/Slice';
import { useDispatch } from 'react-redux';
import Counts from './Counts';

function UserForm() {
    const [user, setUser] = useState("");
    // const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

   function sendStore(){
    dispatch(addCustomerData(user));
   }
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">React Redux</h2>

        <div className="mb-3">
          <label htmlFor="userInput" className="form-label">Enter Name</label>
          <input
            id="userInput"
            type="text"
            className="form-control"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter customer name"
          />
        </div>

        
      </div>
      <button className=" my-2 btn btn-primary" onClick={sendStore}>Save</button>

      <Counts/>
    </div>
  )
}

export default UserForm