import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../all-views-scss/_datatable.scss'
import { FaEdit, FaTrash, FaInnosoft, FaFilter } from 'react-icons/fa';
import { MdNumbers, MdDriveFileRenameOutline, MdCake } from 'react-icons/md';
import { BsFiletypeCsv, BsFillPlusSquareFill } from 'react-icons/bs';
import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import { CFormSelect } from '@coreui/react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "src/api/axios";

const SECURITY_GET_URL = "/security/getAllSecurity";
const SECURITY_ADD_URL = "/security/addSecurity";
const SecurityGuardList = () => {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
    tower_no: '',
    security_no: '',
    shit_start: '',
    shift_end: '',
  });
  // Display Data
  useEffect(() => {
    axios.post(SECURITY_GET_URL).then((response) => {
      setData(response.data);
      console.log(response)
    });
  }, []);

  //Add Security Guard
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [userFname, setFname] = useState();
  const [userLname, setLname] = useState();
  const [userContactNo, setContactNo] = useState();
  const [userBirthdate, setBdate] = useState();
  const [secTower, setTower] = useState();
  const handleAddNewSecurity = async (event) => {
    event.preventDefault()
  // Combine first_name and last_name to create full_name
  const full_name = userFname + " " + userLname;
  console.log(full_name);
    try {
      axios
      .post(SECURITY_ADD_URL, {
        email: userEmail,
        password: userPassword,
        full_name: full_name,
        contact_no: userContactNo,
        birthdate: userBirthdate,
        tower_no: secTower,
        
      }).then((response) => {
        console.log(response.data)
      });
      
    } catch (error) {
      console.log(error)
    }
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
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
    setFormData({ guard_num: '', first_name: '', last_name: '', shit_start: '', shift_end: '', status: '' });
    setShowAddModal(false);
  };

  const handleUploadFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ guard_num: '', first_name: '', last_name: '', shit_start: '', shift_end: '', status: '' });
    setShowUploadModal(false);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newData = data.map((item) =>
      item.id === selectedData.id ? formData : item
    );
    setData(newData);
    setFormData({ guard_num: '', first_name: '', last_name: '', shit_start: '', shift_end: '', status: '' });
    setSelectedData({});
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    const newData = data.filter((item) => item.id !== selectedData.id);
    setData(newData);
    setSelectedData({});
    setShowDeleteModal(false);
  };

  return (
    <div className="container">
      <br />
      <div className="tbl-title">
        <h1 className="text-divider">SECURITY GUARD LIST</h1>
      </div>
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
      
      <div className="divider"></div><hr />
      <table id="example" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Security Guard No.</th>
            <th>Full Name</th>
            <th>Shift Start</th>
            <th>Shift End</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.security_no}</td>
              <td>{entry.User?.full_name}</td>
              <td>{entry.shift_start}</td>
              <td>{entry.shift_end}</td>
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
      
      {/* ADD MODAL START */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <br/>
        <h1 className="text-divider">Add New Sec. Guard</h1>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="email" className="addForm">
              <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password" className="addForm">
              <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
              <Form.Control
                className="formField"
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </Form.Group>
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
              <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter Contact Number"
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
            <Form.Group controlId="tower" className="addForm">
              <Form.Label className="formIcon"><FaInnosoft /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="tower"
                onChange={(e) => setTower(e.target.value)}
              >
                <option value="">Select Tower</option>
                <option value="1">Tower 1</option>
                <option value="1">Tower 2</option>
                <option value="1">Tower 3</option>
              </Form.Control>
            </Form.Group>
            <br />
            <Modal.Footer className="modalbtn">
              <Button className="primarybtn" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit" onClick={handleAddNewSecurity}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* ADD MODAL END */}

      {/* UPLOAD MODAL START */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <br/>
        <h1 className="text-divider">Upload CSV</h1>
        <Modal.Body>
          <Form onSubmit={handleUploadFormSubmit}>
            <Form.Group controlId="unit_upload" className="addForm">
              <Form.Label className="formIcon"><BsFiletypeCsv /></Form.Label>
              <Form.Control
                className="formField"
                type="file"
                placeholder="Upload CSV"
                name="guard_upload"
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
        <br/>
        <h1 className="text-divider">Edit Sec. Guard</h1>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="guard_num" className="addForm">
              <Form.Label className="formIcon"><MdNumbers /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter security guard number"
                name="guard_num"
                value={formData.guard_num}
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
            <Form.Group controlId="status" className="addForm">
              <Form.Label className="formIcon"><FaInnosoft /></Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="status"
                value={formData.status}
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
      {/* EDIT MODAL END */}

      {/* DELETE MODAL START */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="deleteModal">
        <br/>
        <h1 className="text-divider">Delete Sec. Guard</h1>
        <Modal.Body>
          <p className="confirmation">Are you sure you want to delete this security guard?</p>
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
  );
};

export default SecurityGuardList;