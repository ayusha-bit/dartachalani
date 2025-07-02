import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const Roles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Manager' },
    { id: 3, name: 'Employee' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRole, setNewRole] = useState({ name: '' });

  // For editing role
  const [editingRole, setEditingRole] = useState(null);

  const handleAddRole = () => {
    setShowAddForm(true);
    setEditingRole(null);
    setNewRole({ name: '' });
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setNewRole({ name: role.name });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this role?');
    if (confirmDelete) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingRole) {
      // Update existing role
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, name: newRole.name } : r));
    } else {
      // Add new role
      const newId = roles.length ? Math.max(...roles.map(r => r.id)) + 1 : 1;
      setRoles([...roles, { id: newId, name: newRole.name }]);
    }
    setShowAddForm(false);
    setNewRole({ name: '' });
    setEditingRole(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(roles.length / itemsPerPage);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '30px',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '30px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            width: '80%',
            maxWidth: '800px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h2 style={{ margin: 0 }}>Manage Roles</h2>
            <button onClick={handleAddRole} style={primaryButtonStyle}>
              Add Role
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Role Name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ name: e.target.value })}
                  required
                  style={inputStyle}
                />
              </div>
              <button type="submit" style={primaryButtonStyle}>
                {editingRole ? 'Update Role' : 'Add Role'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingRole(null);
                  setNewRole({ name: '' });
                }}
                style={{ ...primaryButtonStyle, backgroundColor: '#6c757d', marginLeft: '10px' }}
              >
                Cancel
              </button>
            </form>
          )}

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
                <th style={thStyle}>S.N.</th>
                <th style={thStyle}>Role ID</th>
                <th style={thStyle}>Role Name</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRoles.map((role, index) => (
                <tr
                  key={role.id}
                  style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}
                >
                  <td style={tdStyle}>{indexOfFirstItem + index + 1}</td>
                  <td style={tdStyle}>{role.id}</td>
                  <td style={tdStyle}>{role.name}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(role)}
                      style={{ ...smallButtonStyle, backgroundColor: '#28a745' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(role.id)}
                      style={{ ...smallButtonStyle, backgroundColor: '#dc3545' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {roles.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={paginationButtonStyle}
            >
              Previous
            </button>
            <span style={{ fontWeight: 'bold' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={paginationButtonStyle}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const thStyle = {
  padding: '12px',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
};

const primaryButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const smallButtonStyle = {
  padding: '5px 10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  color: '#fff',
  backgroundColor: '#6c757d',
  marginRight: '5px',
};

const paginationButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%',
  fontSize: '16px',
};

export default Roles;
