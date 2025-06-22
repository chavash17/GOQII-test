import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // custom styling


function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', dob: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const apiUrl = 'http://localhost/GOQii-Test/backend/user.php';

  const getUsers = () => {
    axios.get(apiUrl)
      .then(res => setUsers(res.data))
      .catch(() => toast.error("Failed to fetch users"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || (!editMode && !form.password) || !form.dob) {
      toast.error("All fields are required");
      return;
    }

    const postData = { ...form };
    if (editMode) {
      postData.id = editId;
      axios.put(apiUrl, postData)
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            toast.success("User updated");
            resetForm();
            getUsers();
          }
        });
    } else {
      axios.post(apiUrl, postData)
        .then(res => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            toast.success("User added");
            resetForm();
            getUsers();
          }
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`${apiUrl}?id=${id}`)
        .then(() => {
          toast.success("User deleted");
          getUsers();
        })
        .catch(() => toast.error("Delete failed"));
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, password: '', dob: user.dob });
    setEditMode(true);
    setEditId(user.id);
  };

  const resetForm = () => {
    setForm({ name: '', email: '', password: '', dob: '' });
    setEditMode(false);
    setEditId(null);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <ToastContainer />
      <h2>{editMode ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="form-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="form-input"
        />
        {!editMode && (
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="form-input"
          />
        )}
        <DatePicker
          selected={form.dob ? new Date(form.dob) : null}
          onChange={(date) => setForm({ ...form, dob: date.toISOString().split('T')[0] })}
          placeholderText="Select DOB"
          dateFormat="yyyy-MM-dd"
          className="form-input custom-datepicker"
        />

        <button type="submit" className="btn primary">
          {editMode ? 'Update' : 'Add'} User
        </button>
        {editMode && (
          <button type="button" onClick={resetForm} className="btn secondary">
            Cancel
          </button>
        )}
      </form>

      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>DOB</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="btn action edit">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="btn action delete">Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
