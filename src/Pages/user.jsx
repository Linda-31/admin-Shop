import React, { useEffect, useState } from 'react';
import '../Styles/style.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    const dummyUsers = [
      { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
      { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor' },
    ];
    setUsers(dummyUsers);
  }, []);

  return (
    <div className='tablewrap'>
      <h2 className="mb-4">User Management</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}

export default User;
