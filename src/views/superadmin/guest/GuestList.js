import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../all-views-scss/_datatable.scss'
import { FaEdit, FaFilter } from 'react-icons/fa';
import { MdDriveFileRenameOutline, MdContactPhone, MdNumbers } from 'react-icons/md';
import { BsFiletypeCsv, BsFillPlusSquareFill } from 'react-icons/bs';
import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import { HiIdentification } from 'react-icons/hi';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { CgUserList } from 'react-icons/cg';
import { CFormSelect } from '@coreui/react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "src/api/axios";

const GUEST_GET_URL = "/guest/getAllGuest";
const GUEST_ADD_URL = "/guest/addGuest";
const GuestList = () => {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    unit_no: '',
    first_name: '',
    last_name: '',
    contact_no: '',
    date_from: '',
    date_to: '',
  });

  //Display Guest 
  useEffect(() => {
    axios.post(GUEST_GET_URL).then((response) => {
      setData(response.data);
      console.log(response)
    });
  }, []);
  // Add Guest
  const [unitNo, setUnitNo] = useState();
  const [userFname, setFname] = useState();
  const [userLname, setLname] = useState();
  const [userContactNo, setContactNo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const handleAddNewGuest = async (event) => {
    event.preventDefault()
    // Combine first_name and last_name to create full_name
    const full_name = userFname + " " + userLname;
    console.log(full_name);
    try {
      axios
      .post(GUEST_ADD_URL, {
        unit_no: unitNo,
        full_name: full_name,
        contact_no: userContactNo,
        date_from: dateFrom,
        date_to: dateTo,
        
      }).then((response) => {
        console.log(response.data)
      });
      
    } catch (error) {
      console.log(error)
    }
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.guest_num]: event.target.value });
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { unit_id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ guest_num: '', unit_num: '', first_name: '', last_name: '', contact_no: '', date_visit: '', status: '' });
    setShowAddModal(false);
  };

  const handleUploadFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { unit_id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ guest_num: '', unit_num: '', first_name: '', last_name: '', contact_no: '', date_visit: '', status: '' });
    setShowUploadModal(false);
  };


  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newData = data.map((item) =>
      item.unit_id === selectedData.unit_id ? formData : item
    );
    setData(newData);
    setFormData({ guest_num: '', unit_num: '', first_name: '', last_name: '', contact_no: '', date_visit: '', status: '' });
    setSelectedData({});
    setShowEditModal(false);
  };

  return (
    <div className="wrap">
      <div className="head-container">
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
            <option value="Approve">Approve</option>
            <option value="Decline">Decline</option>
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
      </div>
      <br />
      <div className="container">
        <br />
        <div className="tbl-title">
          <h1 className="text-divider">GUEST LIST</h1>
        </div>
        <div className="divider"></div><hr />
        <table id="example" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Guest Number</th>
              <th>Unit Number</th>
              <th>Full Name</th>
              <th>Contact Number</th>
              <th>Expected Date From</th>
              <th>Expected Date To</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.guest_no}</td>
                <td>{entry.unit_no}</td>
                <td>{entry.full_name}</td>
                <td>{entry.contact_no}</td>
                <td>{entry.date_from}</td>
                <td>{entry.date_to}</td>
                <td>
                  <Form.Label className="toggle">
                    <Form.Control type="checkbox" />
                    <span className="slider"></span>
                    <span className="labels" data-on="Approved" data-off="Declined"></span>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ADD MODAL START */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <br/>
          <h1 className="text-divider">Add New Guest</h1>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              
              <Form.Group controlId="unit_no" className="addForm">
                <Form.Label className="formIcon"><MdNumbers /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter unit number"
                  name="unit_no"
                  onChange={(e) => setUnitNo(e.target.value)}
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
                <Form.Label className="formIcon"><MdContactPhone /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter contact number"
                  name="contact_no"
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="date_from" className="addForm">
                <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
                <Form.Control
                  className="formField"
                  type="date"
                  placeholder="yyyy-mm-dd"
                  name="date_to"
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="date_to" className="addForm">
                <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
                <Form.Control
                  className="formField"
                  type="date"
                  placeholder="yyyy-mm-dd"
                  name="date_to"
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </Form.Group>
              <br />
              <Modal.Footer className="modalbtn">
                <Button className="primarybtn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button className="secondarybtn" type="submit" onClick={handleAddNewGuest}>
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

              <Form.Group controlId="guest_upload" className="addForm">
                <Form.Label className="formIcon"><BsFiletypeCsv /></Form.Label>
                <Form.Control
                  className="formField"
                  type="file"
                  placeholder="Upload CSV"
                  name="guest_upload"
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
          <h1 className="text-divider">Edit Guest</h1>
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
              <Form.Group controlId="guest_num" className="addForm">
              <Form.Label className="formIcon"><CgUserList /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter guest number"
                  name="guest_num"
                  value={formData.guest_num}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="unit_num" className="addForm">
                <Form.Label className="formIcon"><MdNumbers /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter unit number"
                  name="unit_num"
                  value={formData.unit_num}
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
              <Form.Group controlId="date_visit" className="addForm">
                <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
                <Form.Control
                  className="formField"
                  type="date"
                  placeholder="yyyy-mm-dd"
                  name="date_visit"
                  value={formData.date_visit}
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
        {/* EDIT MODAL ENDS */}
      </div>
     </div>
  );
};

export default GuestList;