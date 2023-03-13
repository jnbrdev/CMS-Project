import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../all-views-scss/_datatable.scss'
import { FaEdit, FaTrash, FaEye, FaFilter, FaUsersCog } from 'react-icons/fa';
import { MdDriveFileRenameOutline, MdContactPhone, MdCake, MdEmail } from 'react-icons/md';
import { BsFiletypeCsv, BsFillPlusSquareFill, BsFillShieldLockFill } from 'react-icons/bs';
import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import { HiIdentification } from 'react-icons/hi';
import { CFormSelect } from '@coreui/react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "src/api/axios";

const USER_ADD_URL = "/users/addUser";
const USER_SHOW_URL = "/users/getAllUser";
const USER_UPDATE_URL = "/users/updateUnit/";
const UserList_adminteam = () => {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    contact_no: '',
    birthdate: '',
    role: '',
    status: '',
  });

  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [userFname, setFname] = useState();
  const [userLname, setLname] = useState();
  const [userContactNo, setContactNo] = useState();
  const [userBirthdate, setBdate] = useState();
  const [userRole, setRole] = useState();
  const [userStatus, setStatus] = useState();

  //Add User
  const handleAddNewUser = async (e) => {
    e.preventDefault()
    const fname = userFname + " " + userLname
    const uStatus = "Active"
    console.log(fname)
    try {
      axios
      .post(USER_ADD_URL, {
        email: userEmail,
        password: userPassword,
        full_name: fname,
        contact_no: userContactNo,
        birthdate: userBirthdate,
        role: userRole,
        status: uStatus,
        
      }).then((response) => {
        console.log(response.data)
      });
      setShowAddModal(false);
    } catch (error) {
      console.log(error)
    }
    
  };

  useEffect(() => {
    axios.get(USER_SHOW_URL).then((response) => {
      setData(response.data);
      //console.log(response.data);
    });
    //$('#example').DataTable();
  }, [data]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.email]: event.target.value });
  };

  const handleAddNewEntry = () => {
    setShowAddModal(true);
  };

  const handleUploadEntry = () => {
    setShowUploadModal(true);
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

  // const handleDeleteButtonClick = (data) => {
  //   setSelectedData(data);
  //   setShowDeleteModal(true);
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { unit_id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ email: '', password: '', first_name: '', last_name: '', contact_no: '', birthdate: '', role: '', status: '' });
    setShowAddModal(false);
  };

  const handleUploadFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { unit_id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ email: '', password: '', first_name: '', last_name: '', contact_no: '', birthdate: '', role: '', status: '' });
    setShowUploadModal(false);
  };


  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newData = data.map((item) =>
      item.unit_id === selectedData.unit_id ? formData : item
    );
    setData(newData);
    setFormData({ email: '', password: '', first_name: '', last_name: '', contact_no: '', birthdate: '', role: '', status: '' });
    setSelectedData({});
    setShowEditModal(false);
  };

  // const handleDeleteConfirm = () => {
  //   const newData = data.filter((item) => item.unit_id !== selectedData.unit_id);
  //   setData(newData);
  //   setSelectedData({});
  //   setShowDeleteModal(false);
  // };

  return (
    <div className="container">
      <br />
      <div className="tbl-title">
        <h1 className="text-divider">USER LIST</h1>
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
          <option value="">Filter by Role</option>
          <option value="Unit Owner">Unit Owner</option>
          <option value="Tenant">Tenant</option>
        </CFormSelect>
        <CFormSelect className="costum-select">
          <option value="">Filter by Status</option>
          <option value="Active">Active</option>
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
            <th>Email</th>
            <th>Full Name</th>
            <th>Contact Number</th>
            <th>Birthdate</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.email}</td>
              <td>{entry.full_name}</td>
              <td>{entry.contact_no}</td>
              <td>{entry.birthdate}</td>
              <td>{entry.role}</td>
              <td>{entry.status}</td>
              <td>
                <Button
                  className="view"
                  onClick={() => handleViewButtonClick(entry)}
                >
                  <FaEye />
                </Button>
                {' '}
                <Button
                  className="edit"
                  onClick={() => handleEditButtonClick(entry)}
                >
                  <FaEdit />
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
        <br/>
        <h1 className="text-divider">Add New User</h1>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>

            <Form.Group controlId="first_name" className="addForm">
              <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter firstname"
                name="first_name"
                onChange={(e) => setFname(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="last_name" className="addForm">
              <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter lastname"
                name="last_name"
                onChange={(e) => setLname(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="contact_no" className="addForm">
              <Form.Label className="formIcon"><MdContactPhone /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter contact number"
                name="contact_no"
                onChange={(e) => setContactNo(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="birthdate" className="addForm">
              <Form.Label className="formIcon"><MdCake /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                placeholder="yyyy-mm-dd"
                name="birthdate"
                onChange={(e) => setBdate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="role" className="addForm">
              <Form.Label className="formIcon"><FaUsersCog /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="role"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Unit Owner">Unit Owner</option>
                <option value="Tenant">Tenantr</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="addForm">
              <Form.Label className="formIcon"><MdEmail /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter email"
                name="email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password" className="addForm">
              <Form.Label className="formIcon"><BsFillShieldLockFill /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter password"
                name="password"
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </Form.Group>
           
            <br />
            <Modal.Footer className="modalbtn">
              <Button className="primarybtn" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit" onClick={handleAddNewUser}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Upload Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <br/>
        <h1 className="text-divider">Upload CSV</h1>
        <Modal.Body>
          <Form onSubmit={handleUploadFormSubmit}>

            <Form.Group controlId="user_upload" className="addForm">
              <Form.Label className="formIcon"><BsFiletypeCsv /></Form.Label>
              <Form.Control
                className="formField"
                type="file"
                placeholder="Upload CSV"
                name="user_upload"
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

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <h1 className="modal-divider">Personal Information</h1>

          <div className="viewModal">
            <div className="col-md-6">
              <p><strong>Firstname:</strong> <br /> {selectedData.first_name}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Lastname:</strong> <br /> {selectedData.last_name}</p>
            </div>
          </div>

          <div className="viewModal">
            <div className="col-md-6">
              <p><strong>Contact Number:</strong> <br /> {selectedData.contact_no}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Birthdate:</strong> <br /> {selectedData.birthdate}</p>
            </div>
          </div>

          <div className="viewModal">
            <div className="col-md-6">
              <p><strong>Role:</strong> <br /> {selectedData.role}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Status:</strong> <br /> {selectedData.status}</p>
            </div>
          </div><br />
         
          <h1 className="modal-divider">User Account Credential</h1>
          <div className="viewModal">
            <div className="col-md-6">
              <p><strong>Email</strong> <br /> {selectedData.email}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Password</strong> <br /> {selectedData.password}</p>
            </div>
          </div>

        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <br/>
        <h1 className="text-divider">Edit Unit</h1>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>

            <Form.Group controlId="unit_id" className="addForm">
              <Form.Label className="formIcon"><HiIdentification /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit ID"
                name="unit_id"
                value={formData.unit_id}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="first_name" className="addForm">
              <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter firstname"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="last_name" className="addForm">
              <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter lastname"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="contact_no" className="addForm">
              <Form.Label className="formIcon"><MdContactPhone /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter contact number"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="birthdate" className="addForm">
              <Form.Label className="formIcon"><MdCake /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                placeholder="yyyy-mm-dd"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="role" className="addForm">
              <Form.Label className="formIcon"><FaUsersCog /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                <option value="Unit Owner">Unit Owner</option>
                <option value="Tenant">Tenant</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="addForm">
              <Form.Label className="formIcon"><MdEmail /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="password" className="addForm">
              <Form.Label className="formIcon"><BsFillShieldLockFill /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
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

export default UserList_adminteam;