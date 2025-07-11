
import { useSelector } from 'react-redux';
function UserList() {
    const renderData = useSelector((state) => state.userData);
  return (
   <div className="container mt-4">
      <div className="card shadow p-3">
        <h5 className="card-title mb-3">Users List Component</h5>
        <ul className="list-group">
          {renderData.map((user, i) => (
            <li key={i} className="list-group-item">
              {user}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserList