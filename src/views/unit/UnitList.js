import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const UnitList = () => {
  const [data, setData] = useState([
    { unitID: '1', unitNum: '104', unitOwner: 'John', unitTower: 'Tower 1', unitFloor: '1st Floor', unitSize: '10 sqm', dateAdded: '2023-05-01', status: 'Owner Occupied' },
    { unitID: '2', unitNum: '253', unitOwner: 'Jane', unitTower: 'Tower 2', unitFloor: '2nd Floor', unitSize: '15 sqm', dateAdded: '2023-05-02', status: 'Tenant Occupied' },
    { unitID: '3', unitNum: '303', unitOwner: 'Bob', unitTower: 'Tower 3', unitFloor: '3rd Floor', unitSize: '20 sqm', dateAdded: '2023-05-03', status: 'Vacant' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    unitNum: '',
    unitOwner: '',
    unitTower: '',
    unitFloor: '',
    unitSize: '',
    dateAdded: '',
    status: '',
  });

  useEffect(() => {
    $('#example').DataTable();
  }, []);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.unitNum]: event.target.value });
  };

  const handleAddNewEntry = () => {
    setShowAddModal(true);
  };

  const handleViewButtonClick = (data) => {
    setSelectedData(data);
    setShowViewModal(true);
  };

  const handleEditButtonClick = (data) => {
    setSelectedData(data);
    setFormData(data);
    setShowEditModal(true);
  };

  const handleDeleteButtonClick = (data) => {
    setSelectedData(data);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { unitID: newId, ...formData };
    setData([...data, newData]);
    setFormData({ unitNum: '', unitOwner: '', unitTower: '', unitFloor: '', unitSize: '', dateAdded: '', status: '' });
    setShowAddModal(false);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newData = data.map((item) =>
      item.unitID === selectedData.unitID ? formData : item
    );
    setData(newData);
    setFormData({ unitNum: '', unitOwner: '', unitTower: '', unitFloor: '', unitSize: '', dateAdded: '', status: '' });
    setSelectedData({});
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    const newData = data.filter((item) => item.unitID !== selectedData.unitID);
    setData(newData);
    setSelectedData({});
    setShowDeleteModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleAddNewEntry}>
        Add New Entry
      </Button>

      <table id="example" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Unit #</th>
            <th>Unit Owner</th>
            <th>Unit Tower</th>
            <th>Unit Floor</th>
            <th>Unit Size</th>
            <th>Date Added</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.unitID}>
              <td>{entry.unitNum}</td>
              <td>{entry.unitOwner}</td>
              <td>{entry.unitTower}</td>
              <td>{entry.unitFloor}</td>
              <td>{entry.unitSize}</td>
              <td>{entry.dateAdded}</td>
              <td>{entry.status}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleViewButtonClick(entry)}
                >
                  View
                </Button>
                {' '}
                <Button
                  variant="warning"
                  onClick={() => handleEditButtonClick(entry)}
                >
                  Edit
                </Button>
                {' '}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteButtonClick(entry)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Unit Owner</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.unitOwner}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Unit Tower</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                name="age"
                value={formData.unitTower}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> {selectedData.unitOwner}</p>
          <p><strong>Age:</strong> {selectedData.unitTower}</p>
          <p><strong>Gender:</strong> {selectedData.unitFloor}</p>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this entry?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UnitList;