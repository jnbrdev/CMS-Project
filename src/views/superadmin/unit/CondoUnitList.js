import { useState, useEffect, useRef, useContext } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../all-views-scss/_datatable.scss";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaHospitalUser,
  FaBuilding,
  FaLayerGroup,
  FaInnosoft,
  FaFilter,
} from "react-icons/fa";
import { MdNumbers } from "react-icons/md";
import {
  BsFillBuildingsFill,
  BsFiletypeCsv,
  BsFillPlusSquareFill,
  BsSpeedometer,
} from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
import { FiRefreshCcw, FiUpload } from "react-icons/fi";
import { CFormSelect } from "@coreui/react";
import { Modal, Button, Form } from "react-bootstrap";
import AuthContext from "src/authentication/authProvider";
import axios from "src/api/axios";
import Axios from "axios";

const UNIT_ADD_URL = "/unit/addUnit";
const UNIT_SHOW_URL = "/unit/getAllUnit";
const UNIT_UPDATE_URL = "/unit/updateUnit/";
const CondoUnitList = () => {
  const [listOfUnit, setListOfUnit] = useState([]);

  const [data, setData] = useState([]);

  
  

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.unit_no]: event.target.value });
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

  const handleUploadFormSubmit = (event) => {
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
    setShowUploadModal(false);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newData = data.map((item) =>
      item.unit_no === selectedData.unit_no ? formData : item
    );
    setData(newData);
    setFormData({
      unit_no: "",
      unit_owner: "",
      unit_tower: "",
      unit_floor: "",
      unit_size: "",
      occupied_by: "",
      unsStatus: "",
    });
    setSelectedData({});
    setShowEditModal(false);
  };

  // const handleDeleteConfirm = () => {
  //   const newData = data.filter((item) => item.unitID !== selectedData.unitID);
  //   setData(newData);
  //   setSelectedData({});
  //   setShowDeleteModal(false);
  // };

  return (
    <div className="container">
      <br />
      <div className="tbl-title">
        <h1 className="text-divider">UNIT LIST</h1>
      </div>

      {/* FILTERING START */}
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
          <option value="">Filter by Tower</option>
          <option value="Tower 1">Tower 1</option>
          <option value="Tower 2">Tower 2</option>
        </CFormSelect>
        <CFormSelect className="costum-select">
          <option value="">Filter by Floor</option>
          <option value="1st Floor">1st Floor</option>
          <option value="2nd Floo">2nd Floor</option>
          <option value="3rd Floor">3rd Floor</option>
          <option value="4th Floor">4th Floor</option>
        </CFormSelect>
        <CFormSelect className="costum-select">
          <option value="">Filter by Status</option>
          <option value="Owner Occupied">Owner Occupied</option>
          <option value="Tenant Occupied">Tenant Occupied</option>
          <option value="Vacant">Vacant</option>
        </CFormSelect>
      </div>
      {/* FILTERING END */}

      {/* BUTTONS START */}
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
      {/* BUTTONS END */}

      <div className="divider"></div>
      <hr />
      <table id="example" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Unit #</th>
            <th>Unit Owner</th>
            <th>Unit Tower</th>
            <th>Unit Floor</th>
            <th>Unit Size (sqm)</th>
            <th>Occupied By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.unit_no}</td>
              <td>{entry.unit_owner}</td>
              <td>{entry.unit_tower}</td>
              <td>{entry.unit_floor}</td>
              <td>{entry.unit_size + " sqm"}</td>
              <td>{entry.occupied_by}</td>
              <td>{entry.status}</td>
              <td>
                <Button
                  className="view"
                  onClick={() => handleViewButtonClick(entry)}
                >
                  <FaEye />
                </Button>{" "}
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

      {/* ADD MODAL START */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <br />
        <h1 className="text-divider">Add New Unit</h1>
        <Modal.Body>
          <Form>
            <Form.Group controlId="unit_no" className="addForm">
              <Form.Label className="formIcon">
                <MdNumbers />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit number"
                name="unit_no"
                onChange={(e) => setUnitNo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="unit_owner" className="addForm">
              <Form.Label className="formIcon">
                <FaHospitalUser />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit owner"
                name="unit_owner"
                onChange={(e) => setUnitOwner(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="unit_tower" className="addForm">
              <Form.Label className="formIcon">
                <FaBuilding />
              </Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unit_tower"
                onChange={(e) => setUnitTower(e.target.value)}
              >
                <option value="">Select Tower</option>
                <option value="Tower 1">Tower 1</option>
                <option value="Tower 2">Tower 2</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="unit_floor" className="addForm">
              <Form.Label className="formIcon">
                <FaLayerGroup />
              </Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unit_floor"
                onChange={(e) => setUnitFloor(e.target.value)}
              >
                <option value="">Select Floor</option>
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floo">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor">4th Floor</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="unit_size" className="addForm">
              <Form.Label className="formIcon">
                <BsFillBuildingsFill />
              </Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unit_size"
                onChange={(e) => setUnitSize(e.target.value)}
              >
                <option value="">Select Unit Size (sqm)</option>
                <option value="5">5 sqm</option>
                <option value="10">10 sqm</option>
                <option value="15">15 sqm</option>
                <option value="20">20 sqm</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="" className="addForm">
              <Form.Label className="formIcon">
                <FaHospitalUser />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Occupied By"
                name="unit_owner"
                onChange={(e) => setOccupiedBy(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="status" className="addForm">
              <Form.Label className="formIcon">
                <FaInnosoft />
              </Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="status"
                onChange={(e) => setUnitStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Owner Occupied">Owner Occupied</option>
                <option value="Tenant Occupied">Tenant Occupied</option>
                <option value="Vacant">Vacant</option>
              </Form.Control>
            </Form.Group>
            <br />
            <h1 className="bill-info">Add Billing Info.</h1>
            <Form.Group controlId="billed_to" className="addForm">
              <Form.Label className="formIcon">
                <GiPayMoney />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Association Dues Billed To"
                name="unit_owner"
                onChange={(e) => setOccupiedBy(e.target.value)}
              />
            </Form.Group>
             <Form.Group controlId="billed_to" className="addForm">
              <Form.Label className="formIcon">
                <GiPayMoney />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Water Bills Billed To"
                name="unit_owner"
                onChange={(e) => setOccupiedBy(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="meter" className="addForm">
              <Form.Label className="formIcon">
                <BsSpeedometer />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter meter #"
                name="meter"
                onChange={(e) => setOccupiedBy(e.target.value)}
              />
            </Form.Group>
             <Form.Group controlId="current_reading" className="addForm">
              <Form.Label className="formIcon">
                <TbReportMoney />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter curent reading"
                name="current_reading"
                onChange={(e) => setOccupiedBy(e.target.value)}
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

      {/* UPLOAD MODAL START */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <br />
        <h1 className="text-divider">Upload CSV</h1>
        <Modal.Body>
          <Form onSubmit={handleUploadFormSubmit}>
            <Form.Group controlId="unit_upload" className="addForm">
              <Form.Label className="formIcon">
                <BsFiletypeCsv />
              </Form.Label>
              <Form.Control
                className="formField"
                type="file"
                placeholder="Upload CSV"
                name="unit_upload"
                onChange={handleInputChange}
              />
            </Form.Group>
            <br />
            <Modal.Footer className="modalbtn">
              <Button
                className="primarybtn"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* ADD MODAL END */}

      {/* VIEW MODAL START */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <h1 className="modal-divider">Condo Unit Details</h1>
          <div className="viewModal">
            <div className="col-md-6">
              <p>
                <strong>Unit Number:</strong> <br /> {selectedData.unit_no}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Unit Owner:</strong> <br /> {selectedData.unit_owner}
              </p>
            </div>
          </div>
          <div className="viewModal">
            <div className="col-md-6">
              <p>
                <strong>Unit Tower:</strong> <br /> {selectedData.unit_tower}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Unit Floor:</strong> <br /> {selectedData.unit_floor}
              </p>
            </div>
          </div>
          <div className="viewModal">
            <div className="col-md-6">
              <p>
                <strong>Unit Size:</strong> <br /> {selectedData.unit_size}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Status:</strong> <br /> {selectedData.status}
              </p>
            </div>
          </div>
          <br />
          <h1 className="modal-divider">Tenant Details</h1>
          <div className="viewModal">
            <div className="col-md-6">
              <p>
                <strong>Main Tenant:</strong> <br /> {selectedData.mainTenant}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Number of Occupants:</strong> <br />{" "}
                {selectedData.numOccupants}
              </p>
            </div>
          </div>
          <div className="viewModal">
            <div className="col-md-6">
              <p>
                <strong>Assoc Dues Billed to:</strong> <br />{" "}
                {selectedData.assocBills}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Water Bills Billed to:</strong> <br />{" "}
                {selectedData.waterBills}
              </p>
            </div>
          </div>
          <div className="viewModal">
            <div className="col-md-6">
              <p>
                <strong>Date Move In:</strong> <br /> {selectedData.dateMoveIn}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Date Move Out:</strong> <br />{" "}
                {selectedData.dateMoveOut}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* VIEW MODAL START */}

      {/* EDIT MODAL START */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <br />
        <h1 className="text-divider">Edit Unit</h1>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="unit_no" className="editForm">
              <Form.Label className="formIcon">
                <MdNumbers />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit number"
                name="unit_no"
                defaultValue={formData.unit_no}
                onChange={(e) => setUnitNo(e.target.value)}
                
              />
            </Form.Group>
            <Form.Group controlId="unit_owner" className="editForm">
              <Form.Label className="formIcon">
                <FaHospitalUser />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit owner"
                name="unit_owner"
                defaultValue={formData.unit_owner}
                onChange={(e) => setUnitOwner(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="unit_tower" className="editForm">
              <Form.Label className="formIcon">
                <FaBuilding />
              </Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unit_tower"
                defaultValue={formData.unit_tower}
                onChange={(e) => setUnitTower(e.target.value)}
              >
                <option value="Tower 1">Tower 1</option>
                <option value="Tower 2">Tower 2</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="unit_floor" className="editForm">
              <Form.Label className="formIcon">
                <FaLayerGroup />
              </Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unit_floor"
                defaultValue={formData.unit_floor}
                onChange={(e) => setUnitFloor(e.target.value)}
              >
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floo">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor">4th Floor</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="unit_size" className="editForm">
              <Form.Label className="formIcon">
                <BsFillBuildingsFill />
              </Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unit_size"
                defaultValue={formData.unit_size}
                onChange={(e) => setUnitSize(e.target.value)}
              >
                <option value="5">5 sqm</option>
                <option value="10">10 sqm</option>
                <option value="15">15 sqm</option>
                <option value="20">20 sqm</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="occupied_by" className="editForm">
              <Form.Label className="formIcon">
                <MdNumbers />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter Tenant"
                name="occupied_by"
                defaultValue={formData.occupied_by}
                onChange={(e) => setOccupiedBy(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="status" className="editForm">
              <Form.Label className="formIcon">
                <FaInnosoft />
              </Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="status"
                defaultValue={formData.status}
                onChange={(e) => setUnitStatus(e.target.value)}
              >
                <option value="Owner Occupied">Owner Occupied</option>
                <option value="Tenant Occupied">Tenant Occupied</option>
                <option value="Vacant">Vacant</option>
              </Form.Control>
            </Form.Group>
            <br />
            <h1 className="bill-info">Edit Billing Info.</h1>
            <Form.Group controlId="billed_to" className="addForm">
              <Form.Label className="formIcon">
                <GiPayMoney />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Association Dues Billed To"
                name="billed_to"
                defaultValue={formData.billed_to}
                onChange={(e) => setOccupiedBy(e.target.value)}
              />
            </Form.Group>
             <Form.Group controlId="billed_to" className="addForm">
              <Form.Label className="formIcon">
                <GiPayMoney />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Water Bills Billed To"
                name="billed_to"
                defaultValue={formData.billed_to}
                onChange={(e) => setOccupiedBy(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="meter" className="addForm">
              <Form.Label className="formIcon">
                <BsSpeedometer />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter meter #"
                name="meter"
                defaultValue={formData.meter}
                onChange={(e) => setOccupiedBy(e.target.value)}
              />
            </Form.Group>
             <Form.Group controlId="current_reading" className="addForm">
              <Form.Label className="formIcon">
                <TbReportMoney />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter curent reading"
                name="current_reading"
                defaultValue={formData.current_reading}
                onChange={(e) => setOccupiedBy(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer className="modalbtn">
              <Button
                className="primarybtn"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit" onClick={handleUpdateUnit}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* EDIT MODAL START */}

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

export default CondoUnitList;
