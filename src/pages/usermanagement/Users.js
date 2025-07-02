import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      personId: 'P001',
      fullName: 'Alice Johnson',
      phoneNumber: '123-456-7890',
      dob: '1990-05-15',
      credentials: { user: 'alicej', email: 'alice@example.com', role: 'Admin' },
      organization: 'Org A'
    },
    {
      id: 2,
      personId: 'P002',
      fullName: 'Bob Smith',
      phoneNumber: '234-567-8901',
      dob: '1985-09-20',
      credentials: { user: 'bobsmith', email: 'bob@example.com', role: 'Editor' },
      organization: 'Org B'
    },
    {
      id: 3,
      personId: 'P003',
      fullName: 'Carol Williams',
      phoneNumber: '345-678-9012',
      dob: '1992-12-05',
      credentials: { user: 'carolw', email: 'carol@example.com', role: 'Viewer' },
      organization: 'Org C'
    },
  ]);

  const handleEdit = (id) => {
    alert(`Edit functionality triggered for user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar />

      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '30px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '80%',
          maxWidth: '1200px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0 }}>Manage Users</h2>
            <button
              onClick={() => alert('Add User functionality to be implemented')}
              style={primaryButtonStyle}
            >
              Add User
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
                <th style={thStyle}>S.N.</th>
                <th style={thStyle}>Person ID</th>
                <th style={thStyle}>Full Name</th>
                <th style={thStyle}>Phone Number</th>
                <th style={thStyle}>DOB</th>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Organization</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{user.personId}</td>
                  <td style={tdStyle}>{user.fullName}</td>
                  <td style={tdStyle}>{user.phoneNumber}</td>
                  <td style={tdStyle}>{user.dob}</td>
                  <td style={tdStyle}>{user.credentials.user}</td>
                  <td style={tdStyle}>{user.credentials.email}</td>
                  <td style={tdStyle}>{user.credentials.role}</td>
                  <td style={tdStyle}>{user.organization}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(user.id)}
                      style={{ ...smallButtonStyle, backgroundColor: '#28a745' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{ ...smallButtonStyle, backgroundColor: '#dc3545' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Styles
const thStyle = {
  padding: '12px',
  textAlign: 'left'
};

const tdStyle = {
  padding: '10px'
};

const primaryButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px'
};

const smallButtonStyle = {
  padding: '5px 10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  color: '#fff',
  backgroundColor: '#6c757d',
  marginRight: '5px'
};

export default Users;
