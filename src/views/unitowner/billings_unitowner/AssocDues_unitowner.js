import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../all-views-scss/_datatable.scss'
import { MdNumbers, MdOutlinePayments } from 'react-icons/md';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { GiReceiveMoney, GiMoneyStack, GiPayMoney } from 'react-icons/gi';
import { Modal, Button, Form } from 'react-bootstrap';

const AssocDues_unitowner = () => {
  const [data, setData] = useState([
    { id: '1', invoice_num: '10044', unit_num: '253', billed_to: 'Jonieber Dela Victoria', bill_cost: '800 PHP', discount: '500 PHP', penalty: '100 PHP', due_date: '2023-05-30' },
    { id: '2', invoice_num: '25203', unit_num: '102', billed_to: 'Jesulenio Redera', bill_cost: '1,000 PHP', discount: '500 PHP', penalty: '200 PHP', due_date: '2023-06-31' },
    { id: '3', invoice_num: '30253', unit_num: '301', billed_to: 'James Sevilla', bill_cost: '1,300 PHP', discount: '500 PHP', penalty: '0 PHP', due_date: '2023-02-28' },
  ]);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    invoice_num: '',
    unit_num: '',
    billed_to: '',
    bill_cost: '',
    discount: '',
    penalty: '',
    due_date: '',
  });

  useEffect(() => {
    $('#example').DataTable();
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
    setFormData({ invoice_num: '', unit_num: '', billed_to: '', bill_cost: '', discount: '', penalty: '', due_date: '' });
    setShowPayModal(false);
  };

  return (
    <div className="container">
      <br />
      <div className="tbl-title">
        <h1 className="text-divider">ASSOCIATION DUE LIST</h1>
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
            <th>Billed To</th>
            <th>Billing Cost</th>
            <th>Due Date</th>
            <th>Discount</th>
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
              <td>{entry.discount}</td>
              <td>{entry.penalty}</td>
              <td>
              {' '}
                <Button
                  className="edit"
                  onClick={handlePayBills}
                >
                  <MdOutlinePayments />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL START */}
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
                value={formData.invoice_num}
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

            <Form.Group controlId="billed_to" className="addForm">
              <Form.Label className="formIcon"><GiReceiveMoney /></Form.Label>
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
              <Form.Label className="formIcon"><GiMoneyStack /></Form.Label>
              <Form.Control
                className="formField"
                type="text"
                placeholder="Enter bill cost"
                name="bill_cost"
                value={formData.bill_cost}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="discount" className="addForm">
              <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                name="discount"
                value={formData.discount}
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
                value={formData.penalty}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="due_date" className="addForm">
              <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
              <Form.Control
                className="formField"
                type="date"
                name="due_date"
                value={formData.due_date}
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
      {/* EDIT MODAL END*/}

    </div>
  );
};

export default AssocDues_unitowner;