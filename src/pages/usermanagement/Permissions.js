import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const Permissions = () => {
  const [permissions, setPermissions] = useState([
    { id: 1, name: 'View Dashboard' },
    { id: 2, name: 'Edit Users' },
    { id: 3, name: 'Delete Posts' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPermission, setNewPermission] = useState({ name: '' });

  // For editing permission
  const [editingPermission, setEditingPermission] = useState(null);

  const handleAddPermission = () => {
    setShowAddForm(true);
    setEditingPermission(null);
    setNewPermission({ name: '' });
  };

  const handleEdit = (permission) => {
    setEditingPermission(permission);
    setNewPermission({ name: permission.name });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this permission?');
    if (confirmDelete) {
      setPermissions(permissions.filter(p => p.id !== id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingPermission) {
      // Update existing permission
      setPermissions(permissions.map(p => p.id === editingPermission.id ? { ...p, name: newPermission.name } : p));
    } else {
      // Add new permission
      const newId = permissions.length ? Math.max(...permissions.map(p => p.id)) + 1 : 1;
      setPermissions([...permissions, { id: newId, name: newPermission.name }]);
    }
    setShowAddForm(false);
    setNewPermission({ name: '' });
    setEditingPermission(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPermissions = permissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(permissions.length / itemsPerPage);

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
            <h2 style={{ margin: 0 }}>Manage Permissions</h2>
            <button onClick={handleAddPermission} style={primaryButtonStyle}>
              Add Permission
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Permission Name"
                  value={newPermission.name}
                  onChange={(e) => setNewPermission({ name: e.target.value })}
                  required
                  style={inputStyle}
                />
              </div>
              <button type="submit" style={primaryButtonStyle}>
                {editingPermission ? 'Update Permission' : 'Add Permission'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingPermission(null);
                  setNewPermission({ name: '' });
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
                <th style={thStyle}>Permission ID</th>
                <th style={thStyle}>Permission Name</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPermissions.map((permission, index) => (
                <tr
                  key={permission.id}
                  style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}
                >
                  <td style={tdStyle}>{indexOfFirstItem + index + 1}</td>
                  <td style={tdStyle}>{permission.id}</td>
                  <td style={tdStyle}>{permission.name}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(permission)}
                      style={{ ...smallButtonStyle, backgroundColor: '#28a745' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(permission.id)}
                      style={{ ...smallButtonStyle, backgroundColor: '#dc3545' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {permissions.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                    No permissions found.
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

// Styles (same as Roles.js)
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

export default Permissions;
