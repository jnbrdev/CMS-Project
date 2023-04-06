import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../all-views-scss/_datatable.scss'
import { FaTrash, FaEye, FaFilter } from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';
import { CFormSelect } from '@coreui/react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "src/api/axios";


const REQUEST_ADD_URL = "/req/";
const REQUEST_GET_URL = "/req/getAllRequest";
const REQUEST_UPDATE_URL = "/req/";
const RequestList = () => {
  const [data, setData] = useState([]);
  // const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    request_num: '',
    requester_name: '',
    request: '',
    status: '',
    date_requested: '',
  });

  //Get Data
  useEffect(() => {
    axios.post(REQUEST_GET_URL).then((response) => {
      setData(response.data);
      //console.log(response.data);
    });
  }, []);

  $(function() {
    $("#example").dataTable();
  });

  
  

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  //  const handleViewButtonClick = (data) => {
  //   setSelectedData(data);
  //   setShowViewModal(true);
  // };

  const handleDeleteButtonClick = (data) => {
    setSelectedData(data);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const newData = data.filter((item) => item.id !== selectedData.id);
    setData(newData);
    setSelectedData({});
    setShowDeleteModal(false);
  };

  return (
    <div className="wraps">
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
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
          </CFormSelect>
          <div className="thead-btn">
            <Button className="thead-btn-primary" name="filter" type="submit">
              <FaFilter />
            </Button>
            <Button className="thead-btn-secondary">
              <FiRefreshCcw />
            </Button>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <br />
        <div className="tbl-title">
          <h1 className="text-divider">VISIT REQUEST</h1>
        </div>
        <div className="divider"></div><hr />
        <table id="example" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Unit #</th>
              <th>Name</th>
              <th>Purpose</th>
              <th>Date Requested</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.unit_no}</td>
                <td>{entry.req_by}</td>
                <td>{entry.req_title}</td>
                <td>
                  <Form.Label className="toggle">
                    <Form.Control type="checkbox" />
                    <span className="slider"></span>
                    <span className="labels" data-on="Approved" data-off="Pending"></span>
                  </Form.Label>
                </td>
                <td>{entry.req_date}</td>
                <td>
                  {/* <Button
                    className="request-view"
                    onClick={() => handleViewButtonClick(entry)}
                  >
                    <FaEye />
                  </Button> */}
                  {' '}
                  <Button
                    className="request-delete"
                    onClick={() => handleDeleteButtonClick(entry)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* VIEW MODAL START */}
        {/* <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
          <Modal.Header closeButton />
          <Modal.Body>
            <h1 className="modal-divider">Request Details</h1>
            <div className="viewModal">
              <div className="col-md-6">
                <p><strong>Unit #</strong> <br /> {selectedData.unit_no}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Name</strong> <br /> {selectedData.req_by}</p>
              </div>
            </div>
            <div className="viewModal">
              <div className="col-md-6">
                <p><strong>Request Title</strong> <br /> {selectedData.req_title}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Request</strong> <br /> {selectedData.req_body}</p>
              </div>
            </div>
            <div className="col-md-6">
                <p><strong>Date Requested</strong> <br /> {selectedData.req_date}</p>
            </div>
          </Modal.Body>
        </Modal>   */}
        {/* VIEW MODAL END */}

        {/* DELETE MODAL START */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="deleteModal">
          <br/>
          <h1 className="text-divider">Delete Request</h1>
          <Modal.Body>
            <p className="confirmation">Are you sure you want to delete this request?</p>
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

export default RequestList;