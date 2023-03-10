import { useState, useEffect, useRef, useContext } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../all-views-scss/_datatable.scss";
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
} from "react-icons/bs";
import { RiCalendarTodoFill } from "react-icons/ri";
import { FiRefreshCcw, FiUpload } from "react-icons/fi";
import { CFormSelect } from "@coreui/react";
import { Modal, Button, Form } from "react-bootstrap";
import AuthContext from "src/authentication/authProvider";
import axios from "src/api/axios";

const UNIT_ADD_URL = "/unit/addUnit";
const UNIT_SHOW_URL = "/unit/getAllUnit";
const CondoUnitList = () => {
  const [data, setData] = useState([
    {
      unitID: "1",
      unitNum: "104",
      unitOwner: "John",
      unitTower: "Tower 1",
      unitFloor: "1st Floor",
      unitSize: "10 sqm",
      dateAdded: "2023-05-01",
      status: "Owner Occupied",
    },
    {
      unitID: "2",
      unitNum: "253",
      unitOwner: "Jane",
      unitTower: "Tower 2",
      unitFloor: "2nd Floor",
      unitSize: "15 sqm",
      dateAdded: "2023-05-02",
      status: "Tenant Occupied",
    },
    {
      unitID: "3",
      unitNum: "303",
      unitOwner: "Bob",
      unitTower: "Tower 3",
      unitFloor: "3rd Floor",
      unitSize: "20 sqm",
      dateAdded: "2023-05-03",
      status: "Vacant",
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    unitNum: "",
    unitOwner: "",
    unitTower: "",
    unitFloor: "",
    unitSize: "",
    dateAdded: "",
    status: "",
  });

  const [unNo, setUnitNo] = useState("");
  const [unOwner, setUnitOwner] = useState("");
  const [unTower, setUnitTower] = useState("");
  const [unFloor, setUnitFloor] = useState("");
  const [unSize, setUnitSize] = useState("");
  const [occupiedBy, setOccupiedBy] = useState("");
  const [unStatus, setUnitStatus] = useState("");

  // ADD UNIT
  const handleAddNewUnit = async (e) => {
    axios
      .post(UNIT_ADD_URL, {
        unit_no: unNo,
        unit_owner: unOwner,
        unit_tower: unTower,
        unit_floor: unFloor,
        unit_size: unSize,
        occupied_by: occupiedBy,
        status: unStatus,
      })
      .then((response) => {
        console.log(response);
        if (
          response.data.role === "Super Admin" &&
          response.data.status === "Active"
        ) {
          window.location.href = "/dashboard";
        }
      });
  };

  // SHOW UNIT DATA
  const [listOfUnit, setListOfUnit] = useState([]);

  useEffect(() => {
    axios.post(UNIT_SHOW_URL).then((response) => {
      setListOfUnit(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    $("#example").DataTable();
  }, []);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.unitNum]: event.target.value });
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
    const newData = { unitID: newId, ...formData };
    setData([...data, newData]);
    setFormData({
      unitNum: "",
      unitOwner: "",
      unitTower: "",
      unitFloor: "",
      unitSize: "",
      dateAdded: "",
      status: "",
    });
    setShowAddModal(false);
  };

  const handleUploadFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { unitID: newId, ...formData };
    setData([...data, newData]);
    setFormData({
      unitNum: "",
      unitOwner: "",
      unitTower: "",
      unitFloor: "",
      unitSize: "",
      dateAdded: "",
      status: "",
    });
    setShowUploadModal(false);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newData = data.map((item) =>
      item.unitID === selectedData.unitID ? formData : item
    );
    setData(newData);
    setFormData({
      unitNum: "",
      unitOwner: "",
      unitTower: "",
      unitFloor: "",
      unitSize: "",
      dateAdded: "",
      status: "",
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

      <div className="divider"></div>
      <hr />
      <table id="example" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Unit #</th>
            <th>Unit Owner</th>
            <th>Unit Tower</th>
            <th>Unit Floor</th>
            <th>Unit Size</th>
            <th>Occupied By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody  >
          {listOfUnit.map((value, index) => (
            <tr key={index}>
              <td>{value.unit_no}</td>
              <td>{value.unit_owner}</td>
              <td>{value.unit_tower}</td>
              <td>{value.unit_floor}</td>
              <td>{value.unit_size}</td>
              <td>{value.occupied_by}</td>
              <td>{value.status}</td>
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
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <br />
        <h1 className="text-divider">Add New Unit</h1>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="unitNum" className="addForm">
              <Form.Label className="formIcon">
                <MdNumbers />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit number"
                name="unitNum"
                onChange={(e) => setUnitNo(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="unitOwner" className="addForm">
              <Form.Label className="formIcon">
                <FaHospitalUser />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit owner"
                name="unitOwner"
                onChange={(e) => setUnitOwner(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="unitTower" className="addForm">
              <Form.Label className="formIcon">
                <FaBuilding />
              </Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unitTower"
                onChange={(e) => setUnitTower(e.target.value)}
              >
                <option value="">Select Tower</option>
                <option value="Tower 1">Tower 1</option>
                <option value="Tower 2">Tower 2</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="unitFloor" className="addForm">
              <Form.Label className="formIcon">
                <FaLayerGroup />
              </Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unitFloor"
                onChange={(e) => setUnitFloor(e.target.value)}
              >
                <option value="">Select Floor</option>
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floo">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor">4th Floor</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="unitSize" className="addForm">
              <Form.Label className="formIcon">
                <BsFillBuildingsFill />
              </Form.Label>
              <Form.Control
                className="formField"
                as="select"
                name="unitSize"
                onChange={(e) => setUnitSize(e.target.value)}
              >
                <option value="">Select Unit Size</option>
                <option value="5 sqm">5 sqm</option>
                <option value="10 sqm">10 sqm</option>
                <option value="15 sqm">15 sqm</option>
                <option value="20 sqm">20 sqm</option>
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
                name="unitOwner"
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

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <h1 className="modal-divider">Condo Unit Details</h1>
          <div className="viewModal">
            <div className="col-md-6">
              <p>
                <strong>Unit Number:</strong> <br /> {selectedData.unitNum}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Unit Owner:</strong> <br /> {selectedData.unitOwner}
              </p>
            </div>
          </div>

          <div className="viewModal">
            <div className="col-md-6">
              <p>
                <strong>Unit Tower:</strong> <br /> {selectedData.unitTower}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Unit Floor:</strong> <br /> {selectedData.unitFloor}
              </p>
            </div>
          </div>

          <div className="viewModal">
            <div className="col-md-6">
              <p>
                <strong>Unit Size:</strong> <br /> {selectedData.unitSize}
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

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <br />
        <h1 className="text-divider">Edit Unit</h1>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="unitNum" className="editForm">
              <Form.Label className="formIcon">
                <MdNumbers />
              </Form.Label>
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
              <Form.Label className="formIcon">
                <FaHospitalUser />
              </Form.Label>
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
              <Form.Label className="formIcon">
                <FaBuilding />
              </Form.Label>
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
              <Form.Label className="formIcon">
                <FaLayerGroup />
              </Form.Label>
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
              <Form.Label className="formIcon">
                <BsFillBuildingsFill />
              </Form.Label>
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
              <Form.Label className="formIcon">
                <RiCalendarTodoFill />
              </Form.Label>
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
              <Form.Label className="formIcon">
                <FaInnosoft />
              </Form.Label>
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
            <Modal.Footer className="modalbtn">
              <Button
                className="primarybtn"
                onClick={() => setShowEditModal(false)}
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
