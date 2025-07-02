import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const UnseenDartas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDarta, setSelectedDarta] = useState(null);

  // Replace this with real unseen dartas
  const unseenDartaData = [
    {
      id: 101,
      chalaniId: 'CHL009',
      dartaId: 'D009',
      dartaNumber: 'DN2001',
      chalaniOrganizationName: 'Office X',
      chalaniSubject: 'Meeting Agenda',
      chalaniNepaliDate: '2082-03-05',
      chalaniNumber: 'CHL2009',
      securityCategory: 'General',
      urgency: 'Low',
      chalaniFiscalYear: '2081/82',
      documentUrl: 'https://example.com/doc9.pdf',
      details: 'Agenda details for upcoming meeting.'
    }
    // You can add more dummy data or connect to an API
  ];

  const handleViewDocument = (url) => {
    window.open(url, '_blank');
  };

  const handleView = (darta) => {
    setSelectedDarta(darta);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDarta(null);
  };

  const headers = [
    'ID', 'Chalani ID', 'Darta ID', 'Darta Number', 'Chalani Organization Name', 'Chalani Subject',
    'Chalani Nepali Date', 'Chalani Number', 'Security Category', 'Urgency',
    'Chalani Fiscal Year', 'Action'
  ];

  return (
    <div className="flex" style={{ marginLeft: '250px' }}>
      <Sidebar />
      
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
          ← Back to Dashboard
        </Link>
      </div>

      <h1>Unseen Dartas</h1>

      {unseenDartaData.length === 0 ? (
        <p>No unseen darta data available to display.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {headers.map(head => (
                <th key={head} style={thStyle}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {unseenDartaData.map(darta => (
              <tr key={darta.id}>
                <td style={tdStyle}>{darta.id}</td>
                <td style={tdStyle}>{darta.chalaniId}</td>
                <td style={tdStyle}>{darta.dartaId}</td>
                <td style={tdStyle}>{darta.dartaNumber}</td>
                <td style={tdStyle}>{darta.chalaniOrganizationName}</td>
                <td style={tdStyle}>{darta.chalaniSubject}</td>
                <td style={tdStyle}>{darta.chalaniNepaliDate}</td>
                <td style={tdStyle}>{darta.chalaniNumber}</td>
                <td style={tdStyle}>{darta.securityCategory}</td>
                <td style={tdStyle}>{darta.urgency}</td>
                <td style={tdStyle}>{darta.chalaniFiscalYear}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleViewDocument(darta.documentUrl)} style={actionButton}>
                    View Document
                  </button>
                  <button onClick={() => handleView(darta)} style={actionButton}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && selectedDarta && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <h2>Darta Details</h2>
            {Object.entries(selectedDarta).map(([key, value]) =>
              key !== 'documentUrl' ? (
                <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>{value}</p>
              ) : null
            )}
            <button onClick={closeModal} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  backgroundColor: '#f2f2f2',
  textAlign: 'center'
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'center',
  verticalAlign: 'middle'
};

const actionButton = {
  margin: '0 5px',
  padding: '5px 10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '25px',
  borderRadius: '8px',
  width: '400px',
  maxHeight: '80vh',
  overflowY: 'auto',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
};

const buttonStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  cursor: 'pointer',
  marginTop: '15px'
};

export default UnseenDartas;
