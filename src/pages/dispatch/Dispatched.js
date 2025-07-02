import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'; 

const Dispatched = () => {
  const [dispatchData] = useState([
    {
      id: 1,
      chalaniNumber: 'CHL001',
      subject: 'Project Proposal',
      to: 'Office A',
      chalaniDate: '2025-06-10',
      chalaniNepaliDate: '2082-02-28',
      chalaniStatus: 'Dispatched',
      urgency: 'High',
      remarks: 'Urgent delivery',
      documentUrl: 'https://example.com/doc1.pdf',
      details: 'Detailed information about Project Proposal CHL001...'
    },
    {
      id: 2,
      chalaniNumber: 'CHL002',
      subject: 'Budget Report',
      to: 'Office B',
      chalaniDate: '2025-06-08',
      chalaniNepaliDate: '2082-02-26',
      chalaniStatus: 'Dispatched',
      urgency: 'Medium',
      remarks: 'Review ASAP',
      documentUrl: 'https://example.com/doc2.pdf',
      details: 'Detailed information about Budget Report CHL002...'
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const handleViewDocument = (url) => {
    window.open(url, '_blank');
  };

  const handleView = (item) => {
    setSelectedDetail(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDetail(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div style={{ padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh', marginLeft: '250px', width: '100%' }}>
        <h1 style={{ marginBottom: '20px' }}>External Chalani Dispatch</h1>

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

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['ID', 'Chalani Number', 'Subject', 'To', 'Chalani Date', 'Chalani Nepali Date', 'Chalani Status', 'Urgency', 'Remarks', 'Action'].map((heading) => (
                <th key={heading} style={thStyle}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dispatchData.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.id}</td>
                <td style={tdStyle}>{item.chalaniNumber}</td>
                <td style={tdStyle}>{item.subject}</td>
                <td style={tdStyle}>{item.to}</td>
                <td style={tdStyle}>{item.chalaniDate}</td>
                <td style={tdStyle}>{item.chalaniNepaliDate}</td>
                <td style={tdStyle}>{item.chalaniStatus}</td>
                <td style={tdStyle}>{item.urgency}</td>
                <td style={tdStyle}>{item.remarks}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleViewDocument(item.documentUrl)} style={actionButton}>View Document</button>
                  <button onClick={() => handleView(item)} style={actionButton}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalOpen && selectedDetail && (
          <div style={modalOverlayStyle} onClick={closeModal}>
            <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
              <h2>Details for {selectedDetail.chalaniNumber}</h2>
              <p><strong>Subject:</strong> {selectedDetail.subject}</p>
              <p><strong>To:</strong> {selectedDetail.to}</p>
              <p><strong>Chalani Date:</strong> {selectedDetail.chalaniDate}</p>
              <p><strong>Chalani Nepali Date:</strong> {selectedDetail.chalaniNepaliDate}</p>
              <p><strong>Status:</strong> {selectedDetail.chalaniStatus}</p>
              <p><strong>Urgency:</strong> {selectedDetail.urgency}</p>
              <p><strong>Remarks:</strong> {selectedDetail.remarks}</p>
              <p><strong>Details:</strong> {selectedDetail.details}</p>
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

export default Dispatched;
