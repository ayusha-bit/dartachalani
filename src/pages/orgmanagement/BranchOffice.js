import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const BranchOffice = () => {
  const [branches, setBranches] = useState([
    { id: 1, name: 'Branch A', code: 'BA01', address: '123 Main St' },
    { id: 2, name: 'Branch B', code: 'BB02', address: '456 Oak St' },
    { id: 3, name: 'Branch C', code: 'BC03', address: '789 Pine St' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: '', code: '', address: '' });

  const handleEdit = (id) => {
    alert(`Edit functionality triggered for branch with ID: ${id}`);
    // You can integrate a modal or form here.
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this branch?');
    if (confirmDelete) {
      setBranches(branches.filter(branch => branch.id !== id));
    }
  };

  const handleViewDepartments = (id) => {
    alert(`View Departments for Branch ID: ${id}`);
    // Link to Departments page or modal here.
  };

  const handleAddBranch = () => {
    setShowAddForm(true);
  };

  const handleAddBranchSubmit = (e) => {
    e.preventDefault();
    const newId = branches.length ? Math.max(...branches.map(b => b.id)) + 1 : 1;
    const branchToAdd = { id: newId, ...newBranch };
    setBranches([...branches, branchToAdd]);
    setNewBranch({ name: '', code: '', address: '' });
    setShowAddForm(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBranches = branches.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(branches.length / itemsPerPage);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar />

      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end', // shift to right
        padding: '30px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '80%',
          maxWidth: '1000px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0 }}>Manage Branch Office</h2>
            <button
              onClick={handleAddBranch}
              style={primaryButtonStyle}
            >
              Add Branch Office
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddBranchSubmit} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Name"
                  value={newBranch.name}
                  onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Code"
                  value={newBranch.code}
                  onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })}
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newBranch.address}
                  onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                  required
                  style={inputStyle}
                />
              </div>
              <button type="submit" style={primaryButtonStyle}>Save Branch</button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
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
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Code</th>
                <th style={thStyle}>Address</th>
                <th style={thStyle}>View</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBranches.map((branch, index) => (
                <tr key={branch.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                  <td style={tdStyle}>{indexOfFirstItem + index + 1}</td>
                  <td style={tdStyle}>{branch.id}</td>
                  <td style={tdStyle}>{branch.name}</td>
                  <td style={tdStyle}>{branch.code}</td>
                  <td style={tdStyle}>{branch.address}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleViewDepartments(branch.id)}
                      style={smallButtonStyle}
                    >
                      View Departments
                    </button>
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(branch.id)}
                      style={{ ...smallButtonStyle, backgroundColor: '#28a745' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(branch.id)}
                      style={{ ...smallButtonStyle, backgroundColor: '#dc3545' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={paginationButtonStyle}
            >
              Previous
            </button>
            <span style={{ fontWeight: 'bold' }}>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

const paginationButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px'
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  flex: '1'
};

export default BranchOffice;
