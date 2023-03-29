import { useState, useEffect, useRef, useContext } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../all-views-scss/_pullout_tenants.scss";
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
const PullOut = () => {
  const [listOfUnit, setListOfUnit] = useState([]);

  const [data, setData] = useState([]);

  
  const [showViewModal, setShowViewModal] = useState(false);
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

  const handleViewButtonClick = (data) => {
    setSelectedData(data);
    setShowViewModal(true);
  };

  return (
    <div className="container">
      <br />
      <div className="tbl-title">
        <h1 className="text-divider">PULL-OUT REQUEST</h1>
      </div>
      <div className="divider"></div>
      <hr />
      <table id="example" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Requesting Unit</th>
            <th>Date of Pull-out</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.unit_no}</td>
              <td>{entry.unit_owner}</td>
              <td>{entry.status}</td>
              <td>
                <Button
                  className="view"
                  onClick={() => handleViewButtonClick(entry)}
                >
                  <FaEye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

    </div>
  );
};

export default PullOut;
