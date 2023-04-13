import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../all-views-scss/_datatable.scss'
import { FaEdit, FaTrash, FaInnosoft, FaFilter, FaMoneyBillAlt } from 'react-icons/fa';
import { MdMiscellaneousServices } from 'react-icons/md';
import { BsFiletypeCsv, BsFillPlusSquareFill } from 'react-icons/bs';
import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import { CFormSelect } from '@coreui/react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "src/api/axios";
const SERVICE_ADD_URL = "/service/addService";
const SERVICE_GET_URL = "/service/getAllService";
const SERVICE_UPDATE_URL = "/service/updateService/";

const ServiceList = () => {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    service_name: '',
    service_rate: '',
    status: '',
  });

  //Get Data Service
  useEffect(() => {
    axios.post(SERVICE_GET_URL).then((response) => {
      setData(response.data);
      //console.log(response.data);
    });
  }, [data]);

  $(function() {
    $("#example").dataTable();
  });

  //Add Data Service
  const [serviceName, setServiceName] = useState();
  const [serviceRate, setServiceRate] = useState();
  const [serviceStatus, setServiceStatus] = useState();
  const handleAddNewUnit = async (e) => {
    e.preventDefault()
    axios
      .post(SERVICE_ADD_URL, {
        service_name: serviceName,
        rate: serviceRate,
        status: serviceStatus,
      });
      setShowAddModal(false);
  };

   // UPDATE SERVICE
   const handleUpdateService = async (e) => {
    e.preventDefault();
    const id = formData.service_name
    try {
      await axios.put(SERVICE_UPDATE_URL + `${id}`, {
        rate: serviceRate,
      })
    } catch (error) {
      console.log(error)
    }
    setSelectedData({});
    setShowEditModal(false);
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.service_name]: event.target.value });
  };

  const handleAddNewEntry = () => {
    setShowAddModal(true);
  };

  const handleUploadEntry = () => {
    setShowUploadModal(true);
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
    const newId = data.length + 1;
    const newData = { service_name: newId, ...formData };
    setData([...data, newData]);
    setFormData({ 
      service_name: "", 
      service_rate: "", 
      });
      setShowEditModal(false);
  };

  // const handleUpdateSubmit = (event) => {
  //   event.preventDefault();
  //   const newData = data.map((item) =>
  //     item.service_name === selectedData.service_name ? formData : item
  //   );
  //   setData(newData);
  //   setFormData({ service_name: '', service_rate: '' });
  //   setSelectedData({});
  //   setShowEditModal(false);
  // };

  const handleDeleteConfirm = () => {
    const newData = data.filter((item) => item.id !== selectedData.id);
    setData(newData);
    setSelectedData({});
    setShowDeleteModal(false);
  };

  return (
    <div className="wrap"> 
      <div className="head-container">
        <div className="table-head">
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
              <BsFillPlusSquareFill /> Add New
            </Button>
            <Button className="thead-btn-quaternary" onClick={handleUploadEntry}>
              <FiUpload /> Upload
            </Button>
          </div>
        </div>
      </div>
      <br/>
      <div className="container">
        <br/>
        <div className="tbl-title">
          <h1 className="text-divider">SERVICE LIST</h1>
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
                <td>{entry.rate}</td>
                <td>
                  <Form.Label className="toggle">
                    <Form.Control type="checkbox" />
                    <span className="slider"></span>
                    <span className="labels" data-on="Active" data-off="Inactive"></span>
                  </Form.Label>
                </td>
                <td>
                  {' '}
                  <Button
                    className="service-edit"
                    onClick={() => handleEditButtonClick(entry)}
                  >
                    <FaEdit /> Edit
                  </Button>
                  {' '}
                  <Button
                    className="service-delete"
                    onClick={() => handleDeleteButtonClick(entry)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ADD MODAL START */}
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
                  onChange={(e) => setServiceName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="service_rate" className="addForm">
                <Form.Label className="formIcon"><FaMoneyBillAlt /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter service rate"
                  name="rate"
                  onChange={(e) => setServiceRate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="status" className="addForm">
                <Form.Label className="formIcon"><FaInnosoft /></Form.Label>
                <Form.Control
                  className="formField"
                  as="select"
                  name="status"
                  onChange={(e) => setServiceStatus(e.target.value)}
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
                <Button className="secondarybtn" type="submit" onClick={handleAddNewUnit}> 
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        {/* ADD MODAL END */}

        {/* UPLOAD MODAL START */}
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
        {/* UPLOAD MODAL END */}

        {/* EDIT MODAL START */}
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
                  defaultValue={formData.service_name}
                  onChange={(e) => setServiceName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="service_rate" className="addForm">
                <Form.Label className="formIcon"><FaMoneyBillAlt /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter service rate"
                  name="service_rate"
                  defaultValue={formData.rate}
                  onChange={(e) => setServiceRate(e.target.value)}
                />
              </Form.Group>
              <br />
              <Modal.Footer className="modalbtn">
                <Button className="primarybtn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button className="secondarybtn" type="submit" onClick={handleUpdateService}>
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        {/* EDIT MODAL END */}

        {/* DELETE MODAL START */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="deleteModal">
          <br/>
          <h1 className="text-divider">Delete Service</h1>
          <Modal.Body>
            <p className="confirmation">Are you sure you want to delete this service?</p>
          </Modal.Body>
          <Modal.Footer className="modalbtn">
            <Button className="primarybtn" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button className="secondarybtn" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {/* DELETE MODAL END */}
      </div>
    </div>
  );
};

export default ServiceList;