import { useState, useEffect, useRef } from 'react';
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

const BILLINGS_SHOW_URL = "/billings/getBillingsUnitOwner/";
const BILLINGS_PAYMENT_URL = "/billings/payment";
const USER_BALANCE_URL = "/users/getUserBalance/";
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
  useEffect(() => {
    const email = auth?.email //get user logged in email in the auth state
    axios.post(`${BILLINGS_SHOW_URL}${email}`).then((response) => {
      setData(response.data);
    });
  }, []);


  const handlePayBills = (data) => () => {
    setSelectedData(data);
    setShowPayModal(true);
    balance()
      
  };
  // Show Balance of user  
  const balance = () =>{
    const email = auth?.email //get user logged in email in the auth state
      axios.get(`${USER_BALANCE_URL}${email}`).then((response) => {
        setUserBalance(response.data);
      });
  }
  // PAYMENT
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [userBalance, setUserBalance] = useState();
  const handleFormSubmits = (e) => {
    e.preventDefault();
    console.log("Payment method selected: ", paymentMethod);
    if (paymentMethod === "account_balance") {
      console.log("User account balance: ", accountBalance);
      const balance = auth?.acc_balance
      const charge = selectedData.amount
      if (balance >= charge) {
        setShowSuccess(true);
      } else {
        setErrMsg("Login Succesfully");
      }
    } else {
      // Implement your payment logic here
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault()
    const email = auth?.email
    const transaction_no = selectedData.trans_no
    const types = selectedData.bill_type
    console.log(email, transaction_no, types)
    try {
      axios
      .post(BILLINGS_PAYMENT_URL, {
        email: email,
        trans_no: transaction_no,
        bill_type: types
      }).then(window.location.reload())    
    } catch (error) {
      console.log(error)
    }

    
    
  };
  return (
    <div className="wrap">
      <div className="head-container">
      </div>
      <br />
      <div className="container">
        <br />
        <div className="tbl-title">
          <h1 className="text-divider">STATEMENT OF ACCOUNT</h1>
        </div>
        <div className="divider"></div><hr />
        <table id="example" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Transaction No.</th>
              <th>Unit No.</th>
              <th style={{width: '30%'}}>Description</th>
              <th>Charges</th>
              <th>Due Date</th>
              <th>Bill Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {data.waterBillData?.map((entry) => (
              <tr key={`${entry.id}-water-bill`}>
              <td>{entry.trans_no}</td>
              <td>{entry.unit_no}</td>
              <td style={{ width: '30%', whiteSpace: 'pre-wrap' }}>{entry.description}</td>
              <td>{entry.amount}</td>
              <td>{entry.due_date}</td>
              <td>{entry.bill_type}</td>
              <td>{entry.status}</td>
              <td>
              <Button className="edit" onClick={handlePayBills(entry)}>
                <MdOutlinePayments />
              </Button>

              </td>
              </tr>
              ))}
              {data.assocDueData?.map((entry) => (
                  <tr key={`${entry.id}-assoc-due`}>
                  <td>{entry.trans_no}</td>
                  <td>{entry.unit_no}</td>
                  <td style={{ width: '30%', whiteSpace: 'pre-wrap' }}>{entry.description}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.due_date}</td>
                  <td>{entry.bill_type}</td>
                  <td>{entry.status}</td>
                  <td>
                  <Button className="edit" onClick={handlePayBills(entry)}>
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
            <Form onSubmit={handleFormSubmits}>
              <Form.Group controlId="invoice_num" className="addForm">
                <Form.Label>Payment Method:</Form.Label>
                <Form.Control
                  as="select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">-- Select Payment Method --</option>
                  <option value="PayPal">PayPal</option>
                  <option value="GCash">GCash</option>
                  <option value="Balance">Account Balance</option>
                </Form.Control>
              </Form.Group>
              {paymentMethod === "Balance" && (
                <Form.Group controlId="account_balance" className="addForm">
                  <Form.Label>Account Balance:</Form.Label>
                  {parseFloat(auth?.acc_balance) <= parseFloat(selectedData.amount) ? (
                    <>
                      <Form.Label style={{ color: "red" }}> Insufficient funds! ₱{userBalance}</Form.Label>
                    </>
                  ) : (
                    <Form.Control plaintext readOnly defaultValue={`₱${userBalance}`} />
                  )}
                  
                </Form.Group>
              )}
              <Form.Group controlId="charges" className="addForm">
                <Form.Label>Charges:</Form.Label>
                <Form.Control plaintext readOnly defaultValue={`₱${selectedData.amount}`} />
              </Form.Group>
              <Modal.Footer className="modalbtn">
                <Button className="primarybtn" >
                  Cancel
                </Button>
                <Button className="secondarybtn" type="submit" disabled={!paymentMethod} onClick={handlePayment}>
                  Pay with {paymentMethod}
                </Button>
              </Modal.Footer>
            </Form>
            {showSuccess && (
              <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                Payment successful!
              </Alert>
            )}
          </Modal.Body>
        </Modal>
        {/* PAY MODAL END */}
      </div>
    </div>
  );
};

export default WaterBills_unitowner;