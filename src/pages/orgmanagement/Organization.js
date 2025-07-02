import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import { FaPlus } from 'react-icons/fa';


const Organization = () => {
  const initialOrganizations = [
    { id: 'ORG001', name: 'Organization One', code: 'ORG1', address: '123 Main Street' },
    { id: 'ORG002', name: 'Organization Two', code: 'ORG2', address: '456 Oak Avenue' },
    { id: 'ORG003', name: 'Organization Three', code: 'ORG3', address: '789 Pine Road' },
    { id: 'ORG004', name: 'Organization Four', code: 'ORG4', address: '987 Maple Drive' },
    { id: 'ORG005', name: 'Organization Five', code: 'ORG5', address: '654 Elm Street' },
    { id: 'ORG006', name: 'Organization Six', code: 'ORG6', address: '321 Cedar Lane' },
    { id: 'ORG007', name: 'Organization Seven', code: 'ORG7', address: '555 Spruce Blvd' },
  ];

  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOrg, setNewOrg] = useState({ id: '', name: '', code: '', address: '' });

  // Responsive hook
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(organizations.length / itemsPerPage);

  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = organizations.slice(indexOfFirstItem, indexOfLastItem);

  const handleEditClick = (index) => {
    const realIndex = indexOfFirstItem + index;
    setEditIndex(realIndex);
    setEditData({ ...organizations[realIndex] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    const updated = [...organizations];
    updated[editIndex] = editData;
    setOrganizations(updated);
    setEditIndex(null);
    setEditData({});
  };

  const handleDeleteClick = (index) => {
    const realIndex = indexOfFirstItem + index;
    setDeleteIndex(realIndex);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    const updated = organizations.filter((_, idx) => idx !== deleteIndex);
    setOrganizations(updated);
    setShowDeleteModal(false);
    if (indexOfFirstItem >= updated.length && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewOrg((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrganization = () => {
    if (!newOrg.id || !newOrg.name || !newOrg.code || !newOrg.address) {
      alert('Please fill all fields');
      return;
    }
    setOrganizations([...organizations, newOrg]);
    setNewOrg({ id: '', name: '', code: '', address: '' });
    setShowAddModal(false);
  };

  return (
    <div className="d-flex" style={{ marginLeft: isMobile ? 0 : '250px', flexDirection: isMobile ? 'column' : 'row' }}>
      <Sidebar />

      <div className="flex-grow-1 p-3">
        {/* Header with Add Button */}
       {/* Header with Add Button */}
<div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between align-items-center'} mb-3`}>
  <h2 className="mb-2">Manage Organization</h2>
  <Button variant="primary" onClick={() => setShowAddModal(true)}>
    <FaPlus style={{ marginRight: '8px' }} />
    Add Organization
  </Button>
</div>


        {/* Table inside responsive wrapper */}
        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>S.N.</th>
                <th>ID</th>
                <th>Name</th>
                <th>Code</th>
                <th>Address</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((org, index) => (
                <tr key={index}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  {editIndex === indexOfFirstItem + index ? (
                    <>
                      <td><Form.Control name="id" value={editData.id} onChange={handleEditChange} /></td>
                      <td><Form.Control name="name" value={editData.name} onChange={handleEditChange} /></td>
                      <td><Form.Control name="code" value={editData.code} onChange={handleEditChange} /></td>
                      <td><Form.Control name="address" value={editData.address} onChange={handleEditChange} /></td>
                    </>
                  ) : (
                    <>
                      <td>{org.id}</td>
                      <td>{org.name}</td>
                      <td>{org.code}</td>
                      <td>{org.address}</td>
                    </>
                  )}
                  <td>
                    <Button variant="info" size="sm" className="me-2 mb-1">View Branches</Button>
                    <Button variant="info" size="sm" className="mb-1">View Departments</Button>
                  </td>
                  <td>
                    {editIndex === indexOfFirstItem + index ? (
                      <Button variant="success" size="sm" onClick={handleSaveEdit}>Save</Button>
                    ) : (
                      <>
                        <Button variant="warning" size="sm" className="me-2 mb-1" onClick={() => handleEditClick(index)}>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteClick(index)}>Delete</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className={`d-flex ${isMobile ? 'flex-column align-items-center' : 'justify-content-between'} mt-3`}>
          <Button variant="secondary" onClick={handlePrevious} disabled={currentPage === 1} className="mb-2">
            Previous
          </Button>
          <span className="mb-2">Page {currentPage} of {totalPages}</span>
          <Button variant="secondary" onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>

        {/* Delete Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this organization?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>

        {/* Add Modal */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Organization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {['id', 'name', 'code', 'address'].map((field, idx) => (
                <Form.Group controlId={`formOrg${field}`} key={idx} className="mb-2">
                  <Form.Label>{field.toUpperCase()}</Form.Label>
                  <Form.Control
                    type="text"
                    name={field}
                    value={newOrg[field]}
                    onChange={handleAddChange}
                    placeholder={`Enter ${field}`}
                  />
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddOrganization}>Add Organization</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Organization;
