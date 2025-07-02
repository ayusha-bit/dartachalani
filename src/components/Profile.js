import React, { useState } from 'react';

function Profile() {
  const [isEditing, setIsEditing] = useState({
    userInfo: false,
    personDetails: false,
    organizationDetails: false,
    tokenDetails: false,
  });

  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    permissions: {
      dartaRead: false,
      user: false,
    },
    role: 'admin',
  });

  const [personDetails, setPersonDetails] = useState({
    fullName: 'John Doe',
    dob: '1990-01-01',
    email: 'john@example.com',
    phone: '123-456-7890',
    details: 'Additional person details here',
  });

  const [organizationDetails, setOrganizationDetails] = useState({
    name: 'Example Organization',
    email: 'contact@example.org',
    phone: '987-654-3210',
    address: '123 Example Street',
    code: 'ORG123',
  });

  const [tokenDetails, setTokenDetails] = useState({
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    refreshToken: 'def50200aef3a8c8f12e7a...',
  });

  const handleEditToggle = (section) => {
    setIsEditing((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (section, field, value) => {
    const setters = {
      userInfo: setUserInfo,
      personDetails: setPersonDetails,
      organizationDetails: setOrganizationDetails,
      tokenDetails: setTokenDetails,
    };

    const currentState = {
      userInfo,
      personDetails,
      organizationDetails,
      tokenDetails,
    };

    if (section === 'userInfo' && (field === 'dartaRead' || field === 'user')) {
      setters[section]({
        ...currentState[section],
        permissions: {
          ...currentState[section].permissions,
          [field]: value,
        },
      });
    } else {
      setters[section]({
        ...currentState[section],
        [field]: value,
      });
    }
  };

  const renderField = (section, field, label, type = 'text') => {
    const value =
      section === 'userInfo' && (field === 'dartaRead' || field === 'user')
        ? userInfo.permissions[field]
        : section === 'userInfo' && field === 'permissions'
        ? userInfo.permissions
        : section === 'userInfo'
        ? userInfo[field]
        : section === 'personDetails'
        ? personDetails[field]
        : section === 'organizationDetails'
        ? organizationDetails[field]
        : tokenDetails[field];

    if (typeof value === 'boolean') {
      return (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id={`${section}-${field}`}
            checked={value}
            onChange={(e) => handleInputChange(section, field, e.target.checked)}
            disabled={!isEditing[section]}
          />
          <label className="form-check-label" htmlFor={`${section}-${field}`}>
            {label}
          </label>
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div>
          <strong>{label}:</strong>
          <ul className="list-group list-group-flush">
            {Object.entries(value).map(([key, val]) => (
              <li key={key} className="list-group-item px-0">
                <span className="text-capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>{' '}
                <span>{String(val)}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <>
        <label className="form-label">{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => handleInputChange(section, field, e.target.value)}
          className="form-control"
          disabled={!isEditing[section]}
        />
      </>
    );
  };

  const handleLogout = () => {
    alert('Logged out!');
    // Implement your logout logic here
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div className="card shadow p-4" style={{ maxWidth: '700px', width: '100%' }}>
        <h2 className="mb-4 text-center">User Profile</h2>

        {/* User Information */}
        <section className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">User Information</h4>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleEditToggle('userInfo')}
            >
              {isEditing.userInfo ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="mb-3">{renderField('userInfo', 'name', 'Name')}</div>
          <div className="mb-3">{renderField('userInfo', 'email', 'Email')}</div>
          <div className="mb-3">{renderField('userInfo', 'dartaRead', 'Has Permission: Darta Read', 'checkbox')}</div>
          <div className="mb-3">{renderField('userInfo', 'user', 'Has Permission: User', 'checkbox')}</div>
          <div className="mb-3">{renderField('userInfo', 'role', 'Role')}</div>
          <div className="mb-3">{renderField('userInfo', 'permissions', 'Permissions')}</div>
        </section>

        {/* Person Details */}
        <section className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Person Details</h4>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleEditToggle('personDetails')}
            >
              {isEditing.personDetails ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="mb-3">{renderField('personDetails', 'fullName', 'Full Name')}</div>
          <div className="mb-3">{renderField('personDetails', 'dob', 'Date of Birth', 'date')}</div>
          <div className="mb-3">{renderField('personDetails', 'email', 'Email')}</div>
          <div className="mb-3">{renderField('personDetails', 'phone', 'Phone')}</div>
          <div className="mb-3">{renderField('personDetails', 'details', 'Details')}</div>
        </section>

        {/* Organization Details */}
        <section className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Organization Details</h4>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleEditToggle('organizationDetails')}
            >
              {isEditing.organizationDetails ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="mb-3">{renderField('organizationDetails', 'name', 'Name')}</div>
          <div className="mb-3">{renderField('organizationDetails', 'email', 'Email')}</div>
          <div className="mb-3">{renderField('organizationDetails', 'phone', 'Phone')}</div>
          <div className="mb-3">{renderField('organizationDetails', 'address', 'Address')}</div>
          <div className="mb-3">{renderField('organizationDetails', 'code', 'Code')}</div>
        </section>

        {/* Token Details */}
        <section className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Token Details</h4>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleEditToggle('tokenDetails')}
            >
              {isEditing.tokenDetails ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="mb-3">{renderField('tokenDetails', 'accessToken', 'Access Token')}</div>
          <div className="mb-3">{renderField('tokenDetails', 'refreshToken', 'Refresh Token')}</div>
        </section>

        <button className="btn btn-danger w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
