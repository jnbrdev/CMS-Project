import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../all-views-scss/_datatable.scss'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';

const UnitList = () => {
  const [data, setData] = useState([
    { unitID: '1', unitNum: '104', unitOwner: 'John', unitTower: 'Tower 1', unitFloor: '1st Floor', unitSize: '10 sqm', dateAdded: '2023-05-01', status: 'Owner Occupied' },
    { unitID: '2', unitNum: '253', unitOwner: 'Jane', unitTower: 'Tower 2', unitFloor: '2nd Floor', unitSize: '15 sqm', dateAdded: '2023-05-02', status: 'Tenant Occupied' },
    { unitID: '3', unitNum: '303', unitOwner: 'Bob', unitTower: 'Tower 3', unitFloor: '3rd Floor', unitSize: '20 sqm', dateAdded: '2023-05-03', status: 'Vacant' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  // const [showViewModal, setShowViewModal] = useState(false);
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

  // const handleViewButtonClick = (data) => {
  //   setSelectedData(data);
  //   setShowViewModal(true);
  // };

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
    <div className="container">
      <div className="addnewbtn">
        <Button variant="primary" onClick={handleAddNewEntry}>
          Add New Unit
        </Button>
      </div>
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
                {/* <Button
                  className="view"
                  onClick={() => handleViewButtonClick(entry)}
                >
                  <FaEye />
                </Button> */}
                {' '}
                <Button
                  className="edit"
                  onClick={() => handleEditButtonClick(entry)}
                >
                  <FaEdit />
                </Button>
                {' '}
                <Button
                  className="delete"
                  onClick={() => handleDeleteButtonClick(entry)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>

            <Form.Group controlId="unitNum" className="addForm">
              <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit number"
                name="unitNum"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="unitOwner" className="addForm">
              <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit owner"
                name="unitOwner"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="unitTower" className="addForm">
              <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unitTower"
                onChange={handleInputChange}
              >
                <option value="">Select Tower</option>
                <option value="Tower 1">Tower 1</option>
                <option value="Tower 2">Tower 2</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="unitFloor" className="addForm">
              <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unitFloor"
                onChange={handleInputChange}
              >
                <option value="">Select Floor</option>
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floo">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor">4th Floor</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="unitSize" className="addForm">
              <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unitSize"
                onChange={handleInputChange}
              >
                <option value="">Select Unit Size</option>
                <option value="5 sqm">5 sqm</option>
                <option value="10 sqm">10 sqm</option>
                <option value="15 sqm">15 sqm</option>
                <option value="20 sqm">20 sqm</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="dateAdded" className="addForm">
              <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                placeholder="yyyy-mm-dd"
                name="dateAdded"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="status" className="addForm">
              <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="status"
                onChange={handleInputChange}
              >
                <option value="">Select Status</option>
                <option value="Owner Occupied">Owner Occupied</option>
                <option value="Tenant Occupied">Tenant Occupied</option>
                <option value="Vacant">Vacant</option>
              </Form.Control>
            </Form.Group>
            <br />
            <Button className="modalbtn" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Unit Owner:</strong> {selectedData.unitOwner}</p>
          <p><strong>Unit Tower:</strong> {selectedData.unitTower}</p>
          <p><strong>Unit Floor:</strong> {selectedData.unitFloor}</p>
          <p><strong>Unit Size:</strong> {selectedData.unitOwner}</p>
          <p><strong>Status:</strong> {selectedData.unitTower}</p>
          <p><strong>Gender:</strong> {selectedData.unitFloor}</p>
        </Modal.Body>
      </Modal> */}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="unitNum" className="editForm">
            <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit number"
                name="unitNum"
                value={formData.unitNum}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="unitOwner" className="editForm">
            <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit owner"
                name="unitOwner"
                value={formData.unitOwner}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="unitTower" className="editForm">
            <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unitTower"
                value={formData.unitTower}
                onChange={handleInputChange}
              >
                <option value="Tower 1">Tower 1</option>
                <option value="Tower 2">Tower 2</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="unitFloor" className="editForm">
            <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unitFloor"
                value={formData.unitFloor}
                onChange={handleInputChange}
              >
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floo">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor">4th Floor</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="unitSize" className="editForm">
            <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unitSize"
                value={formData.unitSize}
                onChange={handleInputChange}
              >
                <option value="5 sqm">5 sqm</option>
                <option value="10 sqm">10 sqm</option>
                <option value="15 sqm">15 sqm</option>
                <option value="20 sqm">20 sqm</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="dateAdded" className="editForm">
            <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                placeholder="yyyy-mm-dd"
                name="dateAdded"
                value={formData.dateAdded}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="status" className="editForm">
            <Form.Label className="formIcon"><FaEdit /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Owner Occupied">Owner Occupied</option>
                <option value="Tenant Occupied">Tenant Occupied</option>
                <option value="Vacant">Vacant</option>
              </Form.Control>
            </Form.Group>
            <br />
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