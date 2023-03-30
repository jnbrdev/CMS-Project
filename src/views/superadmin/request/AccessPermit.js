import { useState, useEffect, useRef, useContext } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../all-views-scss/_request.scss";
import { RiCalendarTodoFill } from 'react-icons/ri';
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaHospitalUser,
  FaBuilding,
  FaLayerGroup,
  FaInnosoft,
  FaFilter,
  FaFileImport,
} from "react-icons/fa";
import { MdNumbers } from "react-icons/md";
import {
  BsFillBuildingsFill,
  BsSpeedometer,
} from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
import { FiRefreshCcw, FiUpload, FiDownload } from "react-icons/fi";
import { CFormSelect } from "@coreui/react";
import { Modal, Button, Form } from "react-bootstrap";
import AuthContext from "src/authentication/authProvider";
import axios from "src/api/axios";
import Axios from "axios";

const UNIT_ADD_URL = "/unit/addUnit";
const UNIT_SHOW_URL = "/unit/getAllUnit";
const UNIT_UPDATE_URL = "/unit/updateUnit/";
const USER_SHOW_URL = "/users/getUnitOwnerDetails";
const AccessPermit = () => {
  const [listOfUnit, setListOfUnit] = useState([]);

  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    unit_id: null,
    unit_no: null,
    unit_owner: null,
    unit_tower: null,
    unit_floor: null,
    unit_size: null,
    occupied_by: null,
    status: null,
  });

  const [unNo, setUnitNo] = useState("");
  const [unOwner, setUnitOwner] = useState();
  const [unTower, setUnitTower] = useState();
  const [unFloor, setUnitFloor] = useState();
  const [unSize, setUnitSize] = useState();
  const [occupiedBy, setOccupiedBy] = useState();
  const [unStatus, setUnitStatus] = useState();


  // ADD UNIT
  const handleAddNewUnit = async (e) => {
    e.preventDefault()
    axios
      .post(UNIT_ADD_URL, {
        unit_no: unNo,
        unit_owner: unOwner,
        unit_tower: unTower,
        unit_floor: unFloor,
        unit_size: unSize,
        occupied_by: occupiedBy,
        status: unStatus,
      });
      setShowAddModal(false);
  };

  // UPDATE UNIT
  const handleUpdateUnit = async (e) => {
    e.preventDefault();
    const id = formData.unit_no;
    try {
      await axios.put(UNIT_UPDATE_URL + `${id}`, {
        unit_no: formData.unit_no,
        unit_owner: unOwner,
        unit_tower: unTower,
        unit_floor: unFloor,
        unit_size: unSize,
        occupied_by: occupiedBy,
        status: unStatus,
      })
    } catch (error) {
      console.log(error)
    }

    setSelectedData({});
    setShowEditModal(false);
  };
  
  // SHOW UNIT DATAs
  
  useEffect(() => {
    axios.post(UNIT_SHOW_URL).then((response) => {
      setData(response.data);
      //console.log(response.data);
    });
    $("example").DataTable();
  }, [data]);

  //SHOW USER FULL NAME
  const [unitOwner, setUOwner] = useState([]);
  const handleUnitOwnerChange = async (e) => {
    const value = e.target.value;
    setUnitOwner(value);
    try {
      const response = await axios.get(`${USER_SHOW_URL}?search=${value}`);
      setUnitOwner(response.data);
      setUOwner(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.unit_no]: event.target.value });
  };

  const handleAddNewEntry = () => {
    setShowAddModal(true);
  };

  const handleDeleteButtonClick = (data) => {
    setSelectedData(data);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { unit_no: newId, ...formData };
    setData([...data, newData]);
    setFormData({
      unit_no: "",
      unit_owner: "",
      unit_tower: "",
      unit_floor: "",
      unit_size: "",
      occupied_by: "",
      unsStatus: "",
    });
    setShowAddModal(false);
  };

  const handleDeleteConfirm = () => {
    const newData = data.filter((item) => item.unitID !== selectedData.unitID);
    setData(newData);
    setSelectedData({});
    setShowDeleteModal(false);
  };

  return (
    <div className="wraps">
        <div className="head-container">
          <div className="thead-btn">
            <Button className="thead-btn-tertiary" onClick={handleAddNewEntry}>
                <FaFileImport />  Request Access
            </Button>
            <Button className="thead-btn-quaternary">
                <FiDownload /> Download Form
            </Button>
          </div>
        </div>
      <br/>
      <div className="container">
        <div className="tbl-title">
          <h1 className="text-divider">ACCESS PERMIT</h1>
        </div>
        <div className="divider"></div>
        <hr />
        <table id="example" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Unit/Area</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Date Requested</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.unit_no}</td>
                <td>{entry.unit_owner}</td>
                <td>{entry.unit_no}</td>
                <td>{entry.unit_owner}</td>
                <td>{entry.status}</td>
                <td>
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
          <br />
          <h1 className="text-divider">Fill-in Form</h1>
          <Modal.Body>
            <Form>
              <Form.Group controlId="unit_no" className="addForm">
                  <Form.Label className="formIcon">
                      <MdNumbers />
                  </Form.Label>
                  <Form.Control
                      className="unitformField"
                      type="text"
                      placeholder="Enter unit number"
                      name="unit_no"
                      onChange={(e) => setUnitNo(e.target.value)}
                  />
              </Form.Group>
              <div className="pullOutForm">
                <div className="col-md-6">
                      <Form.Group controlId="pull_out_date" className="addForm">
                          <Form.Label className="formIcon">
                              <RiCalendarTodoFill />
                          </Form.Label>
                          <Form.Control
                              className="pullformField"
                              type="date"
                              name="pull_out_date"
                              onChange={(e) => setUnitNo(e.target.value)}
                          />
                      </Form.Group>
                  </div>
                  <div className="col-md-6">
                      <Form.Group controlId="pull_out_date" className="addForm">
                          <Form.Label className="formIcon">
                              <RiCalendarTodoFill />
                          </Form.Label>
                          <Form.Control
                              className="pullformField"
                              type="date"
                              name="pull_out_date"
                              onChange={(e) => setUnitNo(e.target.value)}
                          />
                      </Form.Group>
                  </div>
              </div>
              <Form.Group controlId="unit_upload" className="addForm">
                <Form.Control
                  className="formField"
                  type="file"
                  placeholder="Upload CSV"
                  name="unit_upload"
                  onChange={handleInputChange}
                />
              </Form.Group>
              
              <Modal.Footer className="modalbtn">
                <Button
                  className="primarybtn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="secondarybtn"
                  type="submit"
                  onClick={handleAddNewUnit}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        {/* ADD MODAL END */}

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="deleteModal">
          <br/>
          <h1 className="text-divider">Delete Unit</h1>
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
      </div>
    </div>
  );
};

export default AccessPermit;
