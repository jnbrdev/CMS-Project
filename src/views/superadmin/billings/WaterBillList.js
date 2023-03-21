import { useState, useEffect } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../all-views-scss/_datatable.scss";
import { FaEdit, FaTrash, FaFilter } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";
import { BsFiletypeCsv, BsFillPlusSquareFill } from "react-icons/bs";
import { RiCalendarTodoFill } from "react-icons/ri";
import { GiReceiveMoney, GiMoneyStack, GiPayMoney } from "react-icons/gi";
import { FiRefreshCcw, FiUpload } from "react-icons/fi";
import { TbReportMoney } from "react-icons/tb";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "src/api/axios";

const INVOICE_ADD_URL = "/invoice/";
const INVOICE_GET_URL = "/invoice/getUnitRateData/";
const INVOICE_UPDATE_URL = "/invoice/updateRate/";
const WaterBillList = () => {
  const [data, setData] = useState([
    {
      id: "1",
      invoice_num: "10044",
      unit_num: "253",
      unit_size: "20 sqm",
      billed_to: "Jonieber Dela Victoria",
      bill_cost: "800 PHP",
      due_date: "2023-05-30",
      prev_reading: "1,500 PHP",
      curr_reading: "1,000 PHP",
      reading_date: "2023-06-01",
      penalty: "100 PHP",
      meter: "1-253",
      rate: "10",
    },
    {
      id: "2",
      invoice_num: "25203",
      unit_num: "102",
      unit_size: "10 sqm",
      billed_to: "Jesulenio Redera",
      bill_cost: "1,000 PHP",
      due_date: "2023-06-31",
      prev_reading: "1,000 PHP",
      curr_reading: "950 PHP",
      reading_date: "2023-07-01",
      penalty: "200 PHP",
      meter: "1-253",
      rate: "10",
    },
    {
      id: "3",
      invoice_num: "30253",
      unit_num: "301",
      unit_size: "15 sqm",
      billed_to: "James Sevilla",
      bill_cost: "1,300 PHP",
      due_date: "2023-02-28",
      prev_reading: "800 PHP",
      curr_reading: "500 PHP",
      reading_date: "2023-04-01",
      penalty: "0 PHP",
      meter: "1-253",
      rate: "10",
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    unit_num: '',
    waterBillTo: '',
    invoiceWaterBillTo: '',
    assocBillTo: '',
    invoiceAssocBillTo: '',
    unit_size: '',
    meter_no: '',
    previous_reading: '',
    ratePerSqm: '',
    discountRate: '',
    ratePerCubic: '',
    penaltyRate: '',
    assocDueRate: '',
  });

  //Get Unit and Rate data
  const [unitRateData, setUnitRateData] = useState([]);
  const handleUnitNumberChange = async (event) => {
    const newUnitNumber = event.target.value;
    formData.unit_num = newUnitNumber;

    // Fetch data based on unit number using Axios
    try {
      // Get additional data based on the fetched unit data
      const id = data.id; // Assuming the ID field is available in the fetched unit data
      const invoiceResponse = await axios.post(
        `${INVOICE_GET_URL}${newUnitNumber}`
      );
      const invoiceData = invoiceResponse.data;
      setUnitRateData(invoiceData);
      setFormData(invoiceData)
      console.log(invoiceData);
      // Do something with the invoice data, e.g. store it in state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

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
    setFormData({
      invoice_num: "",
      unit_num: "",
      unit_size: "",
      billed_to: "",
      bill_cost: "",
      due_date: "",
      prev_reading: "",
      curr_reading: "",
      reading_date: "",
      penalty: "",
      meter: "",
      rate: "",
    });
    setShowAddModal(false);
  };

  const handleUploadFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { id: newId, ...formData };
    setData([...data, newData]);
    setFormData({
      invoice_num: "",
      unit_num: "",
      unit_size: "",
      billed_to: "",
      bill_cost: "",
      due_date: "",
      prev_reading: "",
      curr_reading: "",
      reading_date: "",
      penalty: "",
      meter: "",
      rate: "",
    });
    setShowUploadModal(false);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newData = data.map((item) =>
      item.id === selectedData.id ? formData : item
    );
    setData(newData);
    setFormData({
      invoice_num: "",
      unit_num: "",
      unit_size: "",
      billed_to: "",
      bill_cost: "",
      due_date: "",
      prev_reading: "",
      curr_reading: "",
      reading_date: "",
      penalty: "",
      meter: "",
      rate: "",
    });
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
        <h1 className="text-divider">WATER BILL LIST</h1>
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
            <th>Invoice No.</th>
            <th>Unit No.</th>
            <th>Billed To</th>
            <th>Billing Cost</th>
            <th>Due Date</th>
            <th>Prev. Reading</th>
            <th>Curr. Reading</th>
            <th>Reading Date</th>
            <th>Penalty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.invoice_num}</td>
              <td>{entry.unit_num}</td>
              <td>{entry.billed_to}</td>
              <td>{entry.bill_cost}</td>
              <td>{entry.due_date}</td>
              <td>{entry.prev_reading}</td>
              <td>{entry.curr_reading}</td>
              <td>{entry.reading_date}</td>
              <td>{entry.penalty}</td>
              <td>
                {" "}
                <Button
                  className="edit"
                  onClick={() => handleEditButtonClick(entry)}
                >
                  <FaEdit />
                </Button>{" "}
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
        <h1 className="text-divider">Add New Bill</h1>
        <Modal.Body waterbillModal>
          <Form onSubmit={handleFormSubmit}>
            <div className="unitinputField">
              <Form.Group controlId="unit_num" className="addnewbillForm">
                <Form.Label className="formIcon">
                  <MdNumbers />
                </Form.Label>
                <Form.Control
                  className="addnewbillformField"
                  type="text"
                  placeholder="Enter unit number"
                  name="unit_num"
                  onChange={handleUnitNumberChange}
                />
              </Form.Group>
            </div>
            {/* WATER BILL DETAILS */}
            <div className="waterbillBox">
              <h1 className="waterbill-text-divider">Water Bill</h1>
              <Form.Group
                controlId="waterBillTo"
                className="waterbilletdoDetails"
              >
                <Form.Label>Billed To</Form.Label>
                <br />
                <Form.Control
                  className="waterbilledtoformField"
                  type="text"
                  name="billed_to"
                  value={formData.waterBillTo}
                />
              </Form.Group>
              <Form.Group
                controlId="invoiceWaterBillTo"
                className="waterbillDetails"
              >
                <Form.Label>Invoice #</Form.Label>
                <br />
                <Form.Control
                  className="waterbillformField"
                  type="text"
                  name="invoice_num"
                  value={formData.invoiceWaterBillTo}
                />
              </Form.Group>
              <Form.Group controlId="unit_num" className="waterbillDetails">
                <Form.Label>Unit #</Form.Label>
                <br />
                <Form.Control
                  className="waterbillformField"
                  type="text"
                  name="unit_num"
                  value={formData.unit_num}
                />
              </Form.Group>
              <Form.Group controlId="meter" className="waterbillDetails">
                <Form.Label>Meter #</Form.Label>
                <br />
                <Form.Control
                  className="waterbillformField"
                  type="text"
                  name="meter"
                  value={formData.meter_no}
                />
              </Form.Group>
              <Form.Group controlId="prev_reading" className="waterbillDetails">
                <Form.Label>Prev. Reading</Form.Label>
                <br />
                <Form.Control
                  className="waterbillformField"
                  type="text"
                  name="prev_reading"
                  value={formData.previous_reading}
                />
              </Form.Group>
              <div className="readinginputField">
                <Form.Group
                  controlId="current_reading"
                  className="addnewbillForm"
                >
                  <Form.Label className="formIcon">
                    <TbReportMoney />
                  </Form.Label>
                  <Form.Control
                    className="billdetailsformField"
                    type="text"
                    placeholder="Enter curent reading"
                    name="current_reading"
                    
                  />
                </Form.Group>
                <Form.Group controlId="reading_date" className="addnewbillForm">
                  <Form.Label className="formIcon">
                    <TbReportMoney />
                  </Form.Label>
                  <Form.Control
                    className="billdetailsformField"
                    type="text"
                    placeholder="Enter reading date"
                    name="reading_date"
                  />
                </Form.Group>
              </div>
            </div>

            {/* ASSOCIATION DUE DETAILS */}
            <div className="assocdueBox">
              <h1 className="assocdue-text-divider">Association Dues</h1>
              <Form.Group controlId="billed_to" className="assocduedtoDetails">
                <Form.Label>Billed To</Form.Label>
                <br />
                <Form.Control
                  className="assocduedtoformField"
                  type="text"
                  name="billed_to"
                  value={formData.assocBillTo}
                />
              </Form.Group>
              <Form.Group controlId="invoice_num" className="assocdueDetails">
                <Form.Label>Invoice #</Form.Label>
                <br />
                <Form.Control
                  className="assocdueformField"
                  type="text"
                  name="invoice_num"
                  value={formData.invoiceAssocBillTo}
                />
              </Form.Group>
              <Form.Group controlId="unit_num" className="assocdueDetails">
                <Form.Label>Unit #</Form.Label>
                <br />
                <Form.Control
                  className="assocdueformField"
                  type="text"
                  name="unit_num"
                  value={formData.unit_num}
                />
              </Form.Group>
              <Form.Group controlId="rate" className="assocdueDetails">
                <Form.Label>Rate</Form.Label>
                <br />
                <Form.Control
                  className="assocdueformField"
                  type="text"
                  name="rate"
                  value={formData.ratePerSqm}
                />
              </Form.Group>
              <Form.Group controlId="unit_size" className="assocdueDetails">
                <Form.Label>Unit Size</Form.Label>
                <br />
                <Form.Control
                  className="assocdueformField"
                  type="text"
                  name="unit_size"
                  value={formData.unit_size}
                />
              </Form.Group>
            </div>

            <br />
            <Modal.Footer className="modalbtn">
              <Button
                className="primarybtn"
                onClick={() => setShowAddModal(false)}
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
                name="wbill_upload"
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
      {/* UPLOAD MODAL END */}

      {/* EDIT MODAL START */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <br />
        <h1 className="text-divider">Edit Bill</h1>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="invoice_num" className="addForm">
              <Form.Label className="formIcon">
                <MdNumbers />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter invoice number"
                name="invoice_num"
                value={formData.invoice_num}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="unit_num" className="addForm">
              <Form.Label className="formIcon">
                <MdNumbers />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter unit number"
                name="unit_num"
                value={formData.unit_num}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="billed_to" className="addForm">
              <Form.Label className="formIcon">
                <GiReceiveMoney />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter billed to"
                name="billed_to"
                value={formData.billed_to}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="bill_cost" className="addForm">
              <Form.Label className="formIcon">
                <GiMoneyStack />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter bill cost"
                name="bill_cost"
                value={formData.bill_cost}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="due_date" className="addForm">
              <Form.Label className="formIcon">
                <RiCalendarTodoFill />
              </Form.Label>
              <Form.Control
                className="formField"
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="prev_reading" className="addForm">
              <Form.Label className="formIcon">
                <TbReportMoney />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter previous reading"
                name="prev_reading"
                value={formData.prev_reading}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="current_reading" className="addForm">
              <Form.Label className="formIcon">
                <TbReportMoney />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter current reading"
                name="current_reading"
                value={formData.current_reading}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="reading_date" className="addForm">
              <Form.Label className="formIcon">
                <RiCalendarTodoFill />
              </Form.Label>
              <Form.Control
                className="formField"
                type="date"
                name="reading_date"
                value={formData.reading_date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="penalty" className="addForm">
              <Form.Label className="formIcon">
                <GiPayMoney />
              </Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter penalty"
                name="penalty"
                value={formData.penalty}
                onChange={handleInputChange}
              />
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
      {/* EDIT MODAL END */}

      {/* DELETE MODAL START */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        className="deleteModal"
      >
        <br />
        <h1 className="text-divider">Delete Bill</h1>
        <Modal.Body>
          <p className="confirmation">
            Are you sure you want to delete this billing?
          </p>
        </Modal.Body>
        <Modal.Footer className="modalbtn">
          <Button
            className="primarybtn"
            onClick={() => setShowDeleteModal(false)}
          >
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

export default WaterBillList;
