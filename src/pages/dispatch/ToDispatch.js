import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar'; 

const ToDispatch = () => {
  const [dispatchList] = useState([
    {
      id: 1,
      code: 'TD001',
      dartaId: 'D123',
      deliveryMethod: 'Courier',
      initDep: 'Department A',
      toNdk: 'Office X',
      toDefined: 'Office X Branch 1',
      chalaniDate: '2025-06-11',
      chalaniNepaliDate: '2082-03-01',
      chalaniStatus: 'Pending',
      urgency: 'High',
      remarks: 'Handle with care',
      details: 'This is the detailed information for dispatch code TD001.'
    },
    {
      id: 2,
      code: 'TD002',
      dartaId: 'D124',
      deliveryMethod: 'Hand Delivery',
      initDep: 'Department B',
      toNdk: 'Office Y',
      toDefined: 'Undefined',
      chalaniDate: '2025-06-09',
      chalaniNepaliDate: '2082-02-27',
      chalaniStatus: 'Dispatched',
      urgency: 'Medium',
      remarks: 'Standard priority',
      details: 'This is the detailed information for dispatch code TD002.'
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState(null);

  const handleView = (item) => {
    setSelectedDispatch(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDispatch(null);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div style={{ marginLeft: '250px', padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh', flex: 1 }}>
        <h1 style={{ marginBottom: '20px' }}>To Dispatch List</h1>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['ID', 'Code', 'Darta ID', 'Delivery Method', 'Init Dep', 'To (NDK)', 'To (Defined or Undefined)', 'Chalani Date', 'Chalani Nepali Date', 'Chalani Status', 'Urgency', 'Remarks', 'Action'].map(header => (
                <th key={header} style={thStyle}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dispatchList.map(item => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.id}</td>
                <td style={tdStyle}>{item.code}</td>
                <td style={tdStyle}>{item.dartaId}</td>
                <td style={tdStyle}>{item.deliveryMethod}</td>
                <td style={tdStyle}>{item.initDep}</td>
                <td style={tdStyle}>{item.toNdk}</td>
                <td style={tdStyle}>{item.toDefined}</td>
                <td style={tdStyle}>{item.chalaniDate}</td>
                <td style={tdStyle}>{item.chalaniNepaliDate}</td>
                <td style={tdStyle}>{item.chalaniStatus}</td>
                <td style={tdStyle}>{item.urgency}</td>
                <td style={tdStyle}>{item.remarks}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleView(item)} style={actionButton}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalOpen && selectedDispatch && (
          <div style={modalOverlayStyle} onClick={closeModal}>
            <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
              <h2>Details for {selectedDispatch.code}</h2>
              <p><strong>ID:</strong> {selectedDispatch.id}</p>
              <p><strong>Code:</strong> {selectedDispatch.code}</p>
              <p><strong>Darta ID:</strong> {selectedDispatch.dartaId}</p>
              <p><strong>Delivery Method:</strong> {selectedDispatch.deliveryMethod}</p>
              <p><strong>Initial Department:</strong> {selectedDispatch.initDep}</p>
              <p><strong>To (NDK):</strong> {selectedDispatch.toNdk}</p>
              <p><strong>To (Defined or Undefined):</strong> {selectedDispatch.toDefined}</p>
              <p><strong>Chalani Date:</strong> {selectedDispatch.chalaniDate}</p>
              <p><strong>Chalani Nepali Date:</strong> {selectedDispatch.chalaniNepaliDate}</p>
              <p><strong>Status:</strong> {selectedDispatch.chalaniStatus}</p>
              <p><strong>Urgency:</strong> {selectedDispatch.urgency}</p>
              <p><strong>Remarks:</strong> {selectedDispatch.remarks}</p>
              <p><strong>Details:</strong> {selectedDispatch.details}</p>

              <button onClick={closeModal} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles remain the same
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
  width: '450px',
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

export default ToDispatch;
