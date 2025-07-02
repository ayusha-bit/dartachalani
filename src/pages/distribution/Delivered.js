import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Delivered = () => {
  const [deliveredData] = useState([
    {
      id: 201,
      letterNumber: 'LTR201',
      subject: 'Budget Report',
      from: 'Office Z',
      receivedDate: '2025-06-08',
      nepaliReceivedDate: '2082-02-28',
      distributionStatus: 'Delivered',
      urgency: 'Medium',
      remarks: 'Delivered to Finance Dept',
      details: 'Details about LTR201...'
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const handleView = (item) => {
    setSelectedDetail(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDetail(null);
  };

  const filteredData = deliveredData.filter(item => item.distributionStatus === 'Delivered');

  return (
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '10px' }}>Delivered Letters</h1>

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

      {filteredData.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: 'gray' }}>No data available.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['ID', 'Letter Number', 'Subject', 'From', 'Received Date', 'Nepali Received Date', 'Distribution Status', 'Urgency', 'Remarks', 'Action'].map((heading) => (
                <th key={heading} style={thStyle}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.id}</td>
                <td style={tdStyle}>{item.letterNumber}</td>
                <td style={tdStyle}>{item.subject}</td>
                <td style={tdStyle}>{item.from}</td>
                <td style={tdStyle}>{item.receivedDate}</td>
                <td style={tdStyle}>{item.nepaliReceivedDate}</td>
                <td style={tdStyle}>{item.distributionStatus}</td>
                <td style={tdStyle}>{item.urgency}</td>
                <td style={tdStyle}>{item.remarks}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleView(item)} style={actionButton}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && selectedDetail && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
            <h2>Details for {selectedDetail.letterNumber}</h2>
            <p><strong>Subject:</strong> {selectedDetail.subject}</p>
            <p><strong>From:</strong> {selectedDetail.from}</p>
            <p><strong>Received Date:</strong> {selectedDetail.receivedDate}</p>
            <p><strong>Nepali Received Date:</strong> {selectedDetail.nepaliReceivedDate}</p>
            <p><strong>Status:</strong> {selectedDetail.distributionStatus}</p>
            <p><strong>Urgency:</strong> {selectedDetail.urgency}</p>
            <p><strong>Remarks:</strong> {selectedDetail.remarks}</p>
            <p><strong>Details:</strong> {selectedDetail.details}</p>
            <button onClick={closeModal} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>Close</button>
          </div>
        </div>
      )}
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

export default Delivered;
