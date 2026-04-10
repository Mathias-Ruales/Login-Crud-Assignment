import { useState, useEffect } from 'react';
import { fetchDashboardUsers, updateUser, deleteUser } from '../api';

function Dashboard({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ userName: '', password: '', userRole: '' });

  useEffect(() => {
    loadUsers();
  }, [user.id]);

  const loadUsers = async () => {
    try {
      const data = await fetchDashboardUsers(user.id);
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users', err);
    }
  };

  const handleEditClick = (u) => {
    setEditId(u.id);
    setEditForm({ userName: u.userName, password: u.password, userRole: u.userRole });
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  const handleEditSave = async (id) => {
    try {
      await updateUser(id, editForm);
      setEditId(null);
      loadUsers();
    } catch (err) {
      console.error('Failed to update user', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const isAdmin = user.userRole === 'admin';

  return (
    <section id="dashboard">
      <header>
        <h1>Dashboard</h1>
        <p>Welcome, {user.userName}!</p>
      </header>

      <section>
        <h2>System Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  {editId === u.id ? (
                    <input 
                      type="text" 
                      value={editForm.userName} 
                      onChange={e => setEditForm({...editForm, userName: e.target.value})} 
                    />
                  ) : u.userName}
                </td>
                <td>
                  {editId === u.id && isAdmin ? (
                    <select 
                      value={editForm.userRole} 
                      onChange={e => setEditForm({...editForm, userRole: e.target.value})}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : u.userRole}
                </td>
                <td className="action-buttons">
                  {editId === u.id ? (
                    <>
                      <button onClick={() => handleEditSave(u.id)}>Save</button>
                      <button className="danger" onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(u)}>Edit</button>
                      
                      {isAdmin && (
                        <button className="danger" onClick={() => handleDelete(u.id)}>Delete</button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="logoutSection">
        <button onClick={onLogout}>Logout</button>
      </section>
    </section>
  );
}

export default Dashboard;
