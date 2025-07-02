import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const DigitalChalani = () => {
  const [activePage, setActivePage] = useState('Initiate');

  const [formData, setFormData] = useState({
    chalaniType: '',
    destinationOffice: '',
    cc: '',
    bcc: '',
    date: '',
    documentDate: '',
    subject: '',
    body: '',
    classification: '',
    securityCategory: '',
    urgency: '',
    remarks: ''
  });

  const dummyData = [
    {
      id: 1,
      chalaniNumber: 'CN001',
      subject: 'Subject 1',
      to: 'Office A',
      chalaniDate: '2025-06-12',
      chalaniNepaliDate: '2082-02-30',
      chalaniStatus: 'Pending',
      urgency: 'High',
      remarks: 'Urgent delivery',
      status: 'In Progress'
    },
    {
      id: 2,
      chalaniNumber: 'CN002',
      subject: 'Subject 2',
      to: 'Office B',
      chalaniDate: '2025-06-10',
      chalaniNepaliDate: '2082-02-28',
      chalaniStatus: 'Rejected',
      urgency: 'Low',
      remarks: 'Not required now',
      status: 'Rejected'
    },
    {
      id: 3,
      chalaniNumber: 'CN003',
      subject: 'Subject 3',
      to: 'Office C',
      chalaniDate: '2025-06-08',
      chalaniNepaliDate: '2082-02-26',
      chalaniStatus: 'Approved',
      urgency: 'Medium',
      remarks: 'Send by next week',
      status: 'Approved'
    },
    {
      id: 4,
      chalaniNumber: 'CN004',
      subject: 'Subject 4',
      to: 'Office D',
      chalaniDate: '2025-06-01',
      chalaniNepaliDate: '2082-02-19',
      chalaniStatus: 'Dispatched',
      urgency: 'High',
      remarks: 'Sent',
      status: 'Dispatched'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const formGrid = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'space-between'
};

  const handleReset = () => {
    setFormData({
      chalaniType: '',
      destinationOffice: '',
      cc: '',
      bcc: '',
      date: '',
      documentDate: '',
      subject: '',
      body: '',
      classification: '',
      securityCategory: '',
      urgency: '',
      remarks: ''
    });
  };

  const handleSave = () => {
    alert('Save functionality triggered. Data: ' + JSON.stringify(formData, null, 2));
  };

  const renderTable = (status) => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {['ID', 'Chalani Number', 'Subject', 'To', 'Chalani Date', 'Chalani Nepali Date', 'Chalani Status', 'Urgency', 'Remarks', 'Status', 'Actions'].map((heading) => (
            <th key={heading} style={thStyle}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dummyData.filter(d => d.chalaniStatus === status).map((data) => (
          <tr key={data.id}>
            <td style={tdStyle}>{data.id}</td>
            <td style={tdStyle}>{data.chalaniNumber}</td>
            <td style={tdStyle}>{data.subject}</td>
            <td style={tdStyle}>{data.to}</td>
            <td style={tdStyle}>{data.chalaniDate}</td>
            <td style={tdStyle}>{data.chalaniNepaliDate}</td>
            <td style={tdStyle}>{data.chalaniStatus}</td>
            <td style={tdStyle}>{data.urgency}</td>
            <td style={tdStyle}>{data.remarks}</td>
            <td style={tdStyle}>{data.status}</td>
            <td style={tdStyle}>
              <button style={actionButton}>Update</button>
              <button style={actionButton}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const navItems = ['Initiate', 'Pending', 'Rejected', 'Approved', 'Dispatch'];

  return (
    <>
      {/* Sidebar component */}
      <Sidebar />

      {/* Main content shifted right by sidebar width */}
      <div style={{ marginLeft: '250px', padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Manual Chalani Process</h1>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
            &larr; Back to Dashboard
          </Link>
        </div>

        <nav style={{ marginBottom: '20px' }}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              style={{
                padding: '10px 15px',
                marginRight: '10px',
                backgroundColor: activePage === item ? '#007bff' : '#e0e0e0',
                color: activePage === item ? '#fff' : '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {item}
            </button>
          ))}
        </nav>

       {activePage === 'Initiate' && (
  <div style={cardStyle}>
    <h2 style={{ marginBottom: '20px' }}>Initiate Chalani</h2>
    <form>
      <div style={formGrid}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={formGroup}>
            <label style={{ textTransform: 'capitalize', marginBottom: '5px', display: 'block' }}>{key}:</label>
            {key === 'body' || key === 'remarks' ? (
              <textarea
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                style={{ ...inputStyle, height: '80px' }}
              />
            ) : (
              <input
                type={key.includes('date') ? 'date' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                style={inputStyle}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" onClick={handleReset} style={{ ...buttonStyle, backgroundColor: '#6c757d', marginRight: '10px' }}>
          Reset
        </button>
        <button type="button" onClick={handleSave} style={{ ...buttonStyle, backgroundColor: '#28a745' }}>
          Save
        </button>
      </div>
    </form>
  </div>
)}


        {['Pending', 'Rejected', 'Approved', 'Dispatch'].includes(activePage) && (
          <div style={cardStyle}>
            <h2>{activePage} Chalani</h2>
            {renderTable(activePage)}
          </div>
        )}
      </div>
    </>
  );
};

// Styles
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
  padding: '10px 20px',
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
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default DigitalChalani;
