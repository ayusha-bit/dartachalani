import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const Department = () => {
  // Sample initial departments data
  const [departments, setDepartments] = useState([
    { id: 1, name: 'HR', branchOffice: 'Headquarters', code: 'HR01' },
    { id: 2, name: 'IT', branchOffice: 'Branch 2', code: 'IT02' },
    { id: 3, name: 'Finance', branchOffice: 'Branch 1', code: 'FN03' },
    { id: 4, name: 'Marketing', branchOffice: 'Headquarters', code: 'MK04' },
    { id: 5, name: 'Sales', branchOffice: 'Branch 3', code: 'SL05' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [showAddForm, setShowAddForm] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ name: '', branchOffice: '', code: '' });

  // Edit handler (can replace alert with modal later)
  const handleEdit = (id) => {
    const dep = departments.find(d => d.id === id);
    alert(`Edit Department\n\nID: ${dep.id}\nName: ${dep.name}\nBranch Office: ${dep.branchOffice}\nCode: ${dep.code}`);
  };

  // Delete handler with confirm
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dep => dep.id !== id));
      // If last item on page deleted, move to previous page if needed
      if ((departments.length - 1) <= (currentPage - 1) * itemsPerPage && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Show add form
  const handleAddClick = () => setShowAddForm(true);

  // Add form submission
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = departments.length ? Math.max(...departments.map(d => d.id)) + 1 : 1;
    setDepartments([...departments, { id: newId, ...newDepartment }]);
    setNewDepartment({ name: '', branchOffice: '', code: '' });
    setShowAddForm(false);
    setCurrentPage(Math.ceil((departments.length + 1) / itemsPerPage)); // Go to last page after adding
  };

  // Pagination controls
  const totalPages = Math.ceil(departments.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentDepartments = departments.slice(indexOfFirst, indexOfLast);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '30px 40px', marginLeft: '220px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2>Manage Department</h2>
          <button
            onClick={handleAddClick}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add Department
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddSubmit}
            style={{
              marginBottom: 30,
              padding: 20,
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              maxWidth: 500,
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <label>Name:</label><br />
              <input
                type="text"
                required
                value={newDepartment.name}
                onChange={e => setNewDepartment({ ...newDepartment, name: e.target.value })}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Branch Office:</label><br />
              <input
                type="text"
                required
                value={newDepartment.branchOffice}
                onChange={e => setNewDepartment({ ...newDepartment, branchOffice: e.target.value })}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Code:</label><br />
              <input
                type="text"
                required
                value={newDepartment.code}
                onChange={e => setNewDepartment({ ...newDepartment, code: e.target.value })}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: 10,
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </form>
        )}

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            borderRadius: 6,
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#4CAF50', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '12px 15px' }}>S.N.</th>
              <th style={{ padding: '12px 15px' }}>ID</th>
              <th style={{ padding: '12px 15px' }}>Name</th>
              <th style={{ padding: '12px 15px' }}>Branch Office</th>
              <th style={{ padding: '12px 15px' }}>Code</th>
              <th style={{ padding: '12px 15px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentDepartments.map((dep, idx) => (
              <tr key={dep.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px 15px' }}>{indexOfFirst + idx + 1}</td>
                <td style={{ padding: '10px 15px' }}>{dep.id}</td>
                <td style={{ padding: '10px 15px' }}>{dep.name}</td>
                <td style={{ padding: '10px 15px' }}>{dep.branchOffice}</td>
                <td style={{ padding: '10px 15px' }}>{dep.code}</td>
                <td style={{ padding: '10px 15px' }}>
                  <button
                    onClick={() => handleEdit(dep.id)}
                    style={{
                      marginRight: 8,
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dep.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentDepartments.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: 4,
            }}
          >
            Previous
          </button>
          <span style={{ alignSelf: 'center' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: 4,
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Department;
