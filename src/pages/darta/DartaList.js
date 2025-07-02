import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const DartaList = () => {
  const [activeTab, setActiveTab] = useState('Initiate');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const notRegisteredData = [
    { id: 1, name: 'John Doe', subject: 'Missing Form', date: '2025-06-10' },
    { id: 2, name: 'Jane Smith', subject: 'No Document', date: '2025-06-11' }
  ];

  const uploadedDocuments = [
    { id: 1, uploader: 'Alice Johnson', docName: 'Report A.pdf', date: '2025-06-10' },
    { id: 2, uploader: 'Bob Lee', docName: 'Summary.docx', date: '2025-06-11' }
  ];

  const registeredData = [
    { id: 1, dartaNumber: 'D1001', name: 'Michael Fox', subject: 'Approved Darta', date: '2025-06-09' },
    { id: 2, dartaNumber: 'D1002', name: 'Nancy Drew', subject: 'Final Submission', date: '2025-06-08' }
  ];

  const [formData, setFormData] = useState({
    dartaType: '',
    senderOffice: '',
    date: '',
    documentDate: '',
    subject: '',
    body: '',
    classification: '',
    urgency: '',
    remarks: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      dartaType: '',
      senderOffice: '',
      date: '',
      documentDate: '',
      subject: '',
      body: '',
      classification: '',
      urgency: '',
      remarks: ''
    });
  };

  const handleSave = () => {
    alert('Darta saved:\n' + JSON.stringify(formData, null, 2));
  };

  const openModal = (row, editMode = false) => {
    setSelectedRow(row);
    setIsEditMode(editMode);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRow(null);
    setIsEditMode(false);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prev) => ({ ...prev, [name]: value }));
  };

  const renderTable = (columns, data) => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} style={thStyle}>{col}</th>
          ))}
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {Object.keys(row).map((key) => (
              <td key={key} style={tdStyle}>{row[key]}</td>
            ))}
            <td style={tdStyle}>
              <button style={actionButton} onClick={() => openModal(row, false)}>View</button>
              <button style={actionButton} onClick={() => openModal(row, true)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderModal = () => {
    if (!selectedRow) return null;

    return (
      <div style={modalOverlay}>
        <div style={modalContent}>
          <h3>{isEditMode ? 'Edit Entry' : 'View Entry'}</h3>
          {Object.entries(selectedRow).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '10px' }}>
              <label style={{ fontWeight: 'bold', display: 'block' }}>{key}</label>
              {isEditMode ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleModalChange}
                  style={inputStyle}
                />
              ) : (
                <div style={{ padding: '5px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                  {value}
                </div>
              )}
            </div>
          ))}
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button style={{ ...buttonStyle, backgroundColor: '#6c757d' }} onClick={closeModal}>Close</button>
            {isEditMode && (
              <button
                style={{ ...buttonStyle, backgroundColor: '#28a745', marginLeft: '10px' }}
                onClick={() => {
                  alert('Updated data:\n' + JSON.stringify(selectedRow, null, 2));
                  closeModal();
                }}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginLeft: '250px' }}>
      <Sidebar />

      <div style={{ flex: 1, padding: '30px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Darta List</h1>

        <Link to="/" style={{ display: 'inline-block', marginBottom: '20px' }}>
          &larr; Back to Dashboard
        </Link>

        <nav style={{ marginBottom: '20px' }}>
          {['Initiate', 'Not Registered', 'Uploaded Document', 'Registered'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 15px',
                marginRight: '10px',
                backgroundColor: activeTab === tab ? '#007bff' : '#e0e0e0',
                color: activeTab === tab ? '#fff' : '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div style={cardStyle}>
          {activeTab === 'Initiate' && (
            <>
              <h2>Initiate New Darta</h2>
              <form>
                {Object.keys(formData).map((key) => (
                  <div key={key} style={formGroup}>
                    <label style={{ textTransform: 'capitalize' }}>{key}:</label>
                    <input
                      type={key.includes('date') ? 'date' : 'text'}
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                ))}
                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={handleReset}
                    style={{ ...buttonStyle, backgroundColor: '#6c757d', marginRight: '10px' }}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    style={{ ...buttonStyle, backgroundColor: '#28a745' }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </>
          )}

          {activeTab === 'Not Registered' && renderTable(['ID', 'Name', 'Subject', 'Date'], notRegisteredData)}

          {activeTab === 'Uploaded Document' &&
            renderTable(['ID', 'Uploader', 'Document Name', 'Date'], uploadedDocuments)}

          {activeTab === 'Registered' &&
            renderTable(['ID', 'Darta Number', 'Name', 'Subject', 'Date'], registeredData)}
        </div>

        {modalVisible && renderModal()}
      </div>
    </div>
  );
};

// 🔧 Styles
const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
};

const formGroup = {
  marginBottom: '15px'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  cursor: 'pointer'
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  backgroundColor: '#f2f2f2'
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'center'
};

const actionButton = {
  margin: '0 5px',
  padding: '5px 10px',
  cursor: 'pointer',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007bff',
  color: '#fff'
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContent = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  maxHeight: '80vh',
  overflowY: 'auto',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
};

export default DartaList;
