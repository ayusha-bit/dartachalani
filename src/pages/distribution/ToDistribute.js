import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const ToDistribute = () => {
  const [popupData, setPopupData] = useState(null);
  const [assignPopupData, setAssignPopupData] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const dummyData = [
    {
      id: 1,
      chalaniId: 'CH001',
      dartaDate: '2025-06-12',
      dartaNumber: 'D001',
      chalaniOrgName: 'Organization A',
      chalaniSubject: 'Subject A',
      chalaniNepaliDate: '2082-02-30',
      chalaniNumber: 'CN001',
      securityCategory: 'Confidential',
      urgency: 'High',
      chalaniFiscalYear: '2078/79'
    },
    {
      id: 2,
      chalaniId: 'CH002',
      dartaDate: '2025-06-10',
      dartaNumber: 'D002',
      chalaniOrgName: 'Organization B',
      chalaniSubject: 'Subject B',
      chalaniNepaliDate: '2082-02-28',
      chalaniNumber: 'CN002',
      securityCategory: 'Secret',
      urgency: 'Medium',
      chalaniFiscalYear: '2079/80'
    },
    // Add more dummy rows as needed
  ];

  const openViewPopup = (data) => {
    setPopupData(data);
  };

  const closeViewPopup = () => {
    setPopupData(null);
  };

  const openAssignPopup = (data) => {
    setAssignPopupData(data);
    setSelectedDepartment('');
  };

  const closeAssignPopup = () => {
    setAssignPopupData(null);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleAssign = () => {
    alert(`Assigned department "${selectedDepartment}" for Darta ID: ${assignPopupData?.dartaNumber}`);
    closeAssignPopup();
  };

  return (
    <div className="flex" style={{ marginLeft: '250px' }}>
      <Sidebar />
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1>Darta Distribution</h1>
      <h2 style={{ marginTop: '20px' }}>To Distribute</h2>

      <Link
      to="/"
      style={{
        display: 'inline-block',
        marginBottom: '20px',
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}
    >
      ← Back to Dashboard
    </Link>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            {[
              'ID',
              'Chalani ID',
              'Darta Date',
              'Darta Number',
              'Chalani Organization Name',
              'Chalani Subject',
              'Chalani Nepali Date',
              'Chalani Number',
              'Security Category',
              'Urgency',
              'Chalani Fiscal Year',
              'Action'
            ].map((heading) => (
              <th key={heading} style={thStyle}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dummyData.map((row) => (
            <tr key={row.id} style={{ textAlign: 'center' }}>
              <td style={tdStyle}>{row.id}</td>
              <td style={tdStyle}>{row.chalaniId}</td>
              <td style={tdStyle}>{row.dartaDate}</td>
              <td style={tdStyle}>{row.dartaNumber}</td>
              <td style={tdStyle}>{row.chalaniOrgName}</td>
              <td style={tdStyle}>{row.chalaniSubject}</td>
              <td style={tdStyle}>{row.chalaniNepaliDate}</td>
              <td style={tdStyle}>{row.chalaniNumber}</td>
              <td style={tdStyle}>{row.securityCategory}</td>
              <td style={tdStyle}>{row.urgency}</td>
              <td style={tdStyle}>{row.chalaniFiscalYear}</td>
              <td style={tdStyle}>
                <button style={actionButton} onClick={() => openViewPopup(row)}>View Document</button>
                <button style={{ ...actionButton, backgroundColor: '#28a745', marginLeft: '5px' }} onClick={() => openAssignPopup(row)}>Action</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Document Popup */}
      {popupData && (
        <div style={popupOverlayStyle} onClick={closeViewPopup}>
          <div style={popupContentStyle} onClick={e => e.stopPropagation()}>
            <h3>Document Details</h3>
            <p><strong>ID:</strong> {popupData.id}</p>
            <p><strong>Chalani ID:</strong> {popupData.chalaniId}</p>
            <p><strong>Darta Date:</strong> {popupData.dartaDate}</p>
            <p><strong>Darta Number:</strong> {popupData.dartaNumber}</p>
            <p><strong>Organization Name:</strong> {popupData.chalaniOrgName}</p>
            <p><strong>Subject:</strong> {popupData.chalaniSubject}</p>
            <p><strong>Nepali Date:</strong> {popupData.chalaniNepaliDate}</p>
            <p><strong>Chalani Number:</strong> {popupData.chalaniNumber}</p>
            <p><strong>Security Category:</strong> {popupData.securityCategory}</p>
            <p><strong>Urgency:</strong> {popupData.urgency}</p>
            <p><strong>Fiscal Year:</strong> {popupData.chalaniFiscalYear}</p>
            <button onClick={closeViewPopup} style={buttonCloseStyle}>Close</button>
          </div>
        </div>
      )}

      {/* Assign Organization Popup */}
      {assignPopupData && (
        <div style={popupOverlayStyle} onClick={closeAssignPopup}>
          <div style={popupContentStyle} onClick={e => e.stopPropagation()}>
            <h3>Assign Organization</h3>
            <p><strong>Darta ID:</strong> {assignPopupData.dartaNumber}</p>

            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <button
                style={deleteDeptButton}
                onClick={() => setSelectedDepartment('')}
              >
                Delete Department
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>
                Choose a Department:{' '}
                <select value={selectedDepartment} onChange={handleDepartmentChange} style={selectStyle}>
                  <option value="">--Select--</option>
                  <option value="GSD">GSD</option>
                  <option value="Legal Document">Legal Document</option>
                  <option value="IT">IT</option>
                  <option value="Account">Account</option>
                </select>
              </label>
            </div>

            <div>
              <button
                onClick={handleAssign}
                style={{ ...actionButton, backgroundColor: '#007bff', marginRight: '10px' }}
                disabled={!selectedDepartment}
              >
                Assign
              </button>
              <button onClick={closeAssignPopup} style={buttonCloseStyle}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

// Styles
const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  backgroundColor: '#f2f2f2',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '10px',
};

const actionButton = {
  padding: '5px 10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const popupContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  maxHeight: '80vh',
  overflowY: 'auto',
};

const buttonCloseStyle = {
  marginTop: '20px',
  padding: '8px 16px',
  backgroundColor: '#6c757d',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer',
};

const deleteDeptButton = {
  backgroundColor: '#dc3545',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const selectStyle = {
  padding: '6px 12px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

export default ToDistribute;
