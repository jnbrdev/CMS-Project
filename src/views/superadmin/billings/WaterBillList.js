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

const INVOICE_ADD_URL = "/invoice/addBill";
const INVOICE_GET_URL = "/invoice/getUnitRateData/";
const WATERBILL_GET_URL = "/invoice/getAllWaterBill/";
const WaterBillList = () => {
  const [data, setData] = useState([]);
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
  const [assocDueTotal, setAssocDueTotal] = useState();
  const handleUnitNumberChange = async (event) => {
    const newUnitNumber = event.target.value;
    formData.unit_num = newUnitNumber;

    // Fetch data based on unit number using Axios
    try {
      // Get additional data based on the fetched unit data
      const invoiceResponse = await axios.post(
        `${INVOICE_GET_URL}${newUnitNumber}`
      );
      const invoiceData = invoiceResponse.data;
      
      const assocDueNum = Number(invoiceData.assocDueRate);
      const unitSizeNum = Number(invoiceData.unit_size);
      const ratePerSqmNum = Number(invoiceData.ratePerSqm);
      const total = unitSizeNum * ratePerSqmNum;
      setUnitRateData(invoiceData);
      setFormData(invoiceData)
      setAssocDueTotal(total)
      console.log(total)
      // Do something with the invoice data, e.g. store it in state
    } catch (error) {
      console.error(error);
    }
  };
  
  // Current Reading Input Calculations
  const [curReading, setCurReading] = useState();
  const [waterBillTotal, setWaterBillTotal] = useState();
  const handleCurrentReading = async (event) => {
    const currentReading = Number(event.target.value); // convert input to number
    setCurReading(currentReading); // set current reading in state
    try {
      const previousReading = Number(formData.previous_reading); // convert previous reading to number
      const ratePerCubic = Number(formData.ratePerCubic); // convert rate per cubic to number
      const difference = currentReading - previousReading; // calculate difference between current and previous readings
      const amountDue = difference * ratePerCubic; // calculate amount due
      setWaterBillTotal(amountDue)
    } catch (error) {
      console.error(error);
    }
  };

  //Reading Date
  const [readingDate, setReadingDate] = useState();
  const handleReadingDate = async (event) => {
    const readDate = event.target.value; 
    setReadingDate(readDate); // set current reading in state
    
  };
  //Add Bill for WaterBill and Association Due
  const handleAddNewBill = async (e) => {
    e.preventDefault()
    try {
      axios
      .post(INVOICE_ADD_URL, {
        unit_num: formData.unit_num,
        waterBillTo: formData.waterBillTo,
        invoiceWaterBillTo: formData.invoiceWaterBillTo,
        assocBillTo: formData.assocBillTo,
        invoiceAssocBillTo: formData.invoiceAssocBillTo,
        unit_size: formData.unit_size,
        meter_no: formData.meter_no,
        previous_reading: formData.previous_reading,
        cur_read: curReading,
        ratePerSqm: formData.ratePerSqm,
        discountRate: formData.discountRate,
        ratePerCubic: formData.ratePerCubic,
        penaltyRate: formData.penaltyRate,
        assocDueRate: formData.assocDueRate,
        waterBillTotal: waterBillTotal,
        assocDueTotal: assocDueTotal,
        reading_date: readingDate,
      });
      setFormData({
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
        setWaterBillTotal('')
        setAssocDueTotal('')
        setReadingDate('')
        setCurReading('')
        setShowAddModal(false);
    } catch (error) {
      console.error(error)
    }
   
  };

  useEffect(() => {
    axios.post(WATERBILL_GET_URL).then((response) => {
      setData(response.data);
      //console.log(response.data);
    });
  }, []);

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
  const handleAddModalCancel = () => {
    setFormData({
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
      setWaterBillTotal('')
      setAssocDueTotal('')
      setReadingDate('')
      setCurReading('')
      setShowAddModal(false);
  };

  return (
    <div className="container">
      <br />
      <div className="tbl-title">
        <h1 className="text-divider">WATER BILL LIST</h1>
      </div>

      {/* DATE PICKER START */}
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
        {/* DATE PICKER END */}

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
            <th>Prev. Reading</th>
            <th>Curr. Reading</th>
            <th>Reading Date</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.invoice_no}</td>
              <td>{entry.unit_no}</td>
              <td>{entry.billed_to}</td>
              <td>{entry.amount}</td>
              <td>{entry.prev_read}</td>
              <td>{entry.cur_read}</td>
              <td>{entry.reading_date}</td>
              <td>{entry.due_date}</td>
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
              <Form.Group controlId="bill_total" className="waterbillDetails">
                <Form.Label>Total</Form.Label>
                <br />
                <Form.Control
                  className="waterbillformField"
                  type="text"
                  name="bill_total"
                  value={waterBillTotal}
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
                    onChange={handleCurrentReading}
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
                    onChange={handleReadingDate}
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
              <Form.Group controlId="bill_total" className="waterbillDetails">
                <Form.Label>Total</Form.Label>
                <br />
                <Form.Control
                  className="waterbillformField"
                  type="text"
                  name="bill_total"
                  value={assocDueTotal}
                />
              </Form.Group>
            </div>
            <br />
            <Modal.Footer className="modalbtn">
              <Button
                className="primarybtn"
                onClick={handleAddModalCancel}
              >
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit" onClick={handleAddNewBill}>
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
                onClick={handleAddModalCancel}
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
