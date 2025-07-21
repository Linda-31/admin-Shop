import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import '../Styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function User() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/users')
      .then(res => {
        setUsers(res.data);

      })
      .catch(err => {
        console.error("Error fetching users:", err);
      });
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const searchUsers = async () => {
        try {
          if (searchQuery.trim() === "") {
            const res = await axios.get("http://localhost:4000/api/users");
            setUsers(res.data);
          } else {
            const res = await axios.get(`http://localhost:4000/api/users/search?q=${searchQuery}`);
            setUsers(res.data);
          }
        } catch (error) {
          console.error("Search failed:", error);
          toast.error("Search request failed");
        }
      };

      searchUsers();
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/users/${id}`)
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        toast.success("User deleted successfully");
      })
      .catch(err => {
        console.error("Error deleting user:", err);
        toast.error("Failed to delete user");
      });
  };

  const handleView = (id) => {
    navigate(`/users/${id}`);
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setEditedUser({ ...user });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (id) => {
    axios.put(`http://localhost:4000/api/users/${id}`, {
      fullName: editedUser.fullName,
      email: editedUser.email,
      mobile: editedUser.mobile,
      deliveryAddress: editedUser.deliveryAddress,
      status: editedUser.status
    })
      .then(() => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user._id === id ? editedUser : user
          )
        );
        setEditingId(null);
        toast.success("User updated successfully");
      })
      .catch(err => {
        console.error("Error updating user:", err);
        toast.error("Failed to update user");
      });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedUser({});
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className='tablewrap'>
        <h2 className="mb-4">Customers</h2>
        <div className="mb-4">
          <input
            type="search"
            className="form-control w-50"
            placeholder="Search users..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th style={{ width: "110px" }}>Status</th>
              <th style={{ width: "200px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="6" className="text-center">No users found</td></tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  {editingId === user._id ? (
                    <>
                      <td><input name="fullName" value={editedUser.fullName} onChange={handleInputChange} className="form-control" /></td>
                      <td><input name="email" value={editedUser.email} onChange={handleInputChange} className="form-control" /></td>
                      <td><input name="mobile" value={editedUser.mobile} onChange={handleInputChange} className="form-control" /></td>
                      <td><input name="deliveryAddress" value={editedUser.deliveryAddress} onChange={handleInputChange} className="form-control" /></td>
                      <td>
                        <select name="status" value={editedUser.status} onChange={handleInputChange} className="form-select">
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                      <td>
                        <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(user._id)}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.fullName}</td>

                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.deliveryAddress}</td>
                      <td>{user.status}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(user)}>Edit</button>
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleView(user._id)}>View</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default User;
