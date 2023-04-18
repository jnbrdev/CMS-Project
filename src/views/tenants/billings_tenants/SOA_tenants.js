import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../all-views-scss/_datatable.scss'
import { MdNumbers, MdOutlinePayments } from 'react-icons/md';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { GiReceiveMoney, GiMoneyStack, GiPayMoney } from 'react-icons/gi';
import { TbReportMoney } from 'react-icons/tb';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "src/api/axios";
import useAuth from "src/hooks/useAuth";

const USER_ADD_URL = "/users/addUser";
const USER_SHOW_URL = "/users/getAllUser";
const BILLINGS_SHOW_URL = "/billings/getBillingsUnitOwner/";
const WaterBills_unitowner = () => {
  const [data, setData] = useState([]);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    invoice_num: '',
    unit_num: '',
    billed_to: '',
    bill_cost: '',
    due_date: '',
    prev_reading: '',
    curr_reading: '',
    reading_date: '',
    penalty: '',
  });
    const {auth} = useAuth()
    const [assocData, setAssocData] = useState([]);
    const [waterBillData, setWaterBillData] = useState([]);
    const [accountAgingData, setAccountAgingData] = useState([]);
  useEffect(() => {
    const email = auth?.email //get user logged in email in the auth state
    axios.post(`${BILLINGS_SHOW_URL}${email}`).then((response) => {
      setData(response.data);
    });
  }, []);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handlePayBills = () => {
    setShowPayModal(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ invoice_num: '', unit_num: '', billed_to: '', bill_cost: '', due_date: '', prev_reading: '', curr_reading: '',  reading_date: '', penalty: '',  });
    setShowPayModal(false);
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
      </div>
    {/* DATE PICKER END */}
      
      <div className="divider"></div><hr />
      <table id="example" className="table table-striped table-bordered">
        <thead>
            <tr>
            <th>Invoice No.</th>
            <th>Unit No.</th>
            <th style={{ width: '30%' }}>Description</th>
            <th>Charges</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {data.waterBillData?.map((entry) => (
            <tr key={`${entry.invoiceID}-water-bill`}>
            <td>{entry.invoiceID}</td>
            <td>{entry.unit_no}</td>
            <td style={{ width: '30%', whiteSpace: 'pre-wrap' }}>{entry.description}</td>
            <td>{entry.amount}</td>
            <td>{entry.due_date}</td>
            <td>{entry.status}</td>
            <td>
                <Button className="edit" onClick={handlePayBills}>
                <MdOutlinePayments />
                </Button>
            </td>
            </tr>
            ))}
            {data.assocDueData?.map((entry) => (
                <tr key={`${entry.invoice_no}-assoc-due`}>
                <td>{entry.invoice_no}</td>
                <td>{entry.unit_no}</td>
                <td style={{ width: '30%', whiteSpace: 'pre-wrap' }}>{entry.description}</td>
                <td>{entry.amount}</td>
                <td>{entry.due_date}</td>
                <td>{entry.status}</td>
                <td>
                    <Button className="edit" onClick={handlePayBills}>
                    <MdOutlinePayments />
                    </Button>
                </td>
                </tr>
            ))}
        </tbody>
        </table>


      {/* PAY MODAL START */}
      <Modal show={showPayModal} onHide={() => setShowPayModal(false)}>
        <br/>
        <h1 className="text-divider">Pay Bills</h1>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="invoice_num" className="addForm">
              <Form.Label className="formIcon"><MdNumbers /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter invoice number"
                name="invoice_num"
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
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="billed_to" className="addForm">
              <Form.Label className="formIcon"><GiReceiveMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter billed to"
                name="billed_to"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="bill_cost" className="addForm">
              <Form.Label className="formIcon"><GiMoneyStack /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter bill cost"
                name="bill_cost"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="due_date" className="addForm">
              <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                name="due_date"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="prev_reading" className="addForm">
              <Form.Label className="formIcon"><TbReportMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter previous reading"
                name="prev_reading"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="current_reading" className="addForm">
              <Form.Label className="formIcon"><TbReportMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter current reading"
                name="current_reading"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="reading_date" className="addForm">
              <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                name="reading_date"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="penalty" className="addForm">
              <Form.Label className="formIcon"><GiPayMoney /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter penalty"
                name="penalty"
                onChange={handleInputChange}
              />
            </Form.Group>
            <br />
            <Modal.Footer className="modalbtn">
              <Button className="primarybtn" onClick={() => setShowPayModal(false)}>
                Cancel
              </Button>
              <Button className="secondarybtn" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* PAY MODAL END */}
    </div>
  );
};

export default WaterBills_unitowner;