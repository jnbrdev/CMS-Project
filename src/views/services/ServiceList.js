import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../all-views-scss/_datatable.scss'
import { FaEdit, FaTrash, FaEye, FaHospitalUser, FaBuilding, FaLayerGroup, FaInnosoft, FaFilter, FaMoneyBillAlt } from 'react-icons/fa';
import { MdNumbers, MdMiscellaneousServices } from 'react-icons/md';
import { BsFillBuildingsFill, BsFiletypeCsv, BsFillPlusSquareFill } from 'react-icons/bs';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import { CFormSelect } from '@coreui/react';
import { Modal, Button, Form } from 'react-bootstrap';

const ServiceList = () => {
  const [data, setData] = useState([
    { id: '1', service_name: 'Parking (Night)', service_rate: '200 PHP', status: 'Active' },
    { id: '2', service_name: 'Club House', service_rate: '150 PHP', status: 'Inactive' },
    { id: '3', service_name: 'Gym', service_rate: '80 PHP', status: 'Active' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  // const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    service_name: '',
    service_rate: '',
    status: '',
  });

  useEffect(() => {
    $('#example').DataTable();
  }, []);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.service_name]: event.target.value });
  };

  const handleAddNewEntry = () => {
    setShowAddModal(true);
  };

  const handleUploadEntry = () => {
    setShowUploadModal(true);
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

  // const handleDeleteButtonClick = (data) => {
  //   setSelectedData(data);
  //   setShowDeleteModal(true);
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ service_name: '', service_rate: '', status: '' });
    setShowAddModal(false);
  };

  const handleUploadFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ service_name: '', service_rate: '', status: '' });
    setShowUploadModal(false);
  };


  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newData = data.map((item) =>
      item.id === selectedData.id ? formData : item
    );
    setData(newData);
    setFormData({ service_name: '', service_rate: '', status: '' });
    setSelectedData({});
    setShowEditModal(false);
  };

  // const handleDeleteConfirm = () => {
  //   const newData = data.filter((item) => item.id !== selectedData.id);
  //   setData(newData);
  //   setSelectedData({});
  //   setShowDeleteModal(false);
  // };

  return (
    <div className="container">
      <br />
      <div className="tbl-title">
        <h1 className="text-divider">SERVICE LIST</h1>
      </div>
      <div className="table-head">
        <Form.Group controlId="dateFrom" className="filter-date-from">
          <Form.Label className="filter-date-label">From</Form.Label>
          <Form.Control
            className="filter-date-input"
            type="date"
            placeholder="yyyy-mm-dd"
            name="datFrom"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="dateTo" className="filter-date-to">
          <Form.Label className="filter-date-label">To</Form.Label>
          <Form.Control
            className="filter-date-input"
            type="date"
            placeholder="yyyy-mm-dd"
            name="dateTo"
            onChange={handleInputChange}
          />
        </Form.Group>
        <CFormSelect className="costum-select">
          <option value="">Filter by Status</option>
          <option value="Acive">Acive</option>
          <option value="Inactive">Inactive</option>
        </CFormSelect>
        <div className="thead-btn">
          <Button className="thead-btn-primary" name="filter" type="submit">
            <FaFilter />
          </Button>
          <Button className="thead-btn-secondary">
            <FiRefreshCcw />
          </Button>
          <Button className="thead-btn-tertiary" onClick={handleAddNewEntry}>
            <BsFillPlusSquareFill />
          </Button>
          <Button className="thead-btn-quaternary" onClick={handleUploadEntry}>
            <FiUpload />
          </Button>
        </div>
      </div>

      <div className="divider"></div><hr />
      <table id="example" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Service Rate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.service_name}</td>
              <td>{entry.service_rate}</td>
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
                  className="service-edit"
                  onClick={() => handleEditButtonClick(entry)}
                >
                  <FaEdit /> Edit
                </Button>
                {/* {' '}
                <Button
                  className="delete"
                  onClick={() => handleDeleteButtonClick(entry)}
                >
                  <FaTrash />
                </Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <br />
        <h1 className="text-divider">Add New Service</h1>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
          <Form.Label className="formIcon"><MdMiscellaneousServices /></Form.Label>
            <Form.Group controlId="service_name" className="addForm">
            
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter service name"
                name="service_name"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="service_rate" className="addForm">
              <Form.Label className="formIcon"><FaMoneyBillAlt /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter service rate"
                name="service_rate"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="status" className="addForm">
              <Form.Label className="formIcon"><FaInnosoft /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="status"
                onChange={handleInputChange}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
            </Form.Group>

            <br />
            <Modal.Footer className="modalbtn">
              <Button className="primarybtn" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <br />
        <h1 className="text-divider">Upload CSV</h1>
        <Modal.Body>
          <Form onSubmit={handleUploadFormSubmit}>

            <Form.Group controlId="service_upload" className="addForm">
              <Form.Label className="formIcon"><BsFiletypeCsv /></Form.Label>
              <Form.Control
                className="formField"
                type="file"
                placeholder="Upload CSV"
                name="service_upload"
                onChange={handleInputChange}
              />
            </Form.Group>

            <br />
            <Modal.Footer className="modalbtn">
              <Button className="primarybtn" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <h1 className="modal-divider">Condo Unit Details</h1>
          <div className="viewModal">
            <div className="col-md-6">
              <p><strong>Unit Number:</strong> <br /> {selectedData.service_name}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Unit Owner:</strong> <br /> {selectedData.service_rate}</p>
            </div>
          </div>

          <div className="viewModal">
            <div className="col-md-6">
              <p><strong>Unit Tower:</strong> <br /> {selectedData.unitTower}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Unit Floor:</strong> <br /> {selectedData.unitFloor}</p>
            </div>
          </div>

          <div className="viewModal">
            <div className="col-md-6">
              <p><strong>Unit Size:</strong> <br /> {selectedData.unitSize}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Status:</strong> <br /> {selectedData.status}</p>
            </div>
          </div><br />

          <h1 className="modal-divider">Tenant Details</h1>
          <div className="viewModal">
            <div className="col-md-6">
              <p><strong>Main Tenant:</strong> <br /> {selectedData.mainTenant}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Number of Occupants:</strong> <br /> {selectedData.numOccupants}</p>
            </div>
          </div>

          <div className="viewModal">
            <div className="col-md-6">
              <p><strong>Assoc Dues Billed to:</strong> <br /> {selectedData.assocBills}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Water Bills Billed to:</strong> <br /> {selectedData.waterBills}</p>
            </div>
          </div>

          <div className="viewModal">
            <div className="col-md-6">
              <p><strong>Date Move In:</strong> <br /> {selectedData.dateMoveIn}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Date Move Out:</strong> <br /> {selectedData.dateMoveOut}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <br />
        <h1 className="text-divider">Edit Service</h1>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>

            <Form.Group controlId="service_name" className="addForm">
              <Form.Label className="formIcon"><MdMiscellaneousServices /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter service name"
                name="service_name"
                value={formData.service_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="service_rate" className="addForm">
              <Form.Label className="formIcon"><FaMoneyBillAlt /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter service rate"
                name="service_rate"
                value={formData.service_rate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="status" className="addForm">
              <Form.Label className="formIcon"><FaInnosoft /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="status"
                onChange={handleInputChange}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
            </Form.Group>

            <br />
            <Modal.Footer className="modalbtn">
              <Button className="primarybtn" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="deleteModal">
        <br/>
        <h1 className="text-divider">Delete Unit</h1>
        <Modal.Body>
          <p className="confirmation">Are you sure you want to delete this unit?</p>
        </Modal.Body>
        <Modal.Footer className="modalbtn">
          <Button className="primarybtn" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button className="secondarybtn" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default ServiceList;