import { useState, useEffect } from 'react';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../all-views-scss/_managebillings.scss';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "src/api/axios";

const RATE_ADD_URL = "/rate/";
const RATE_GET_URL = "/rate/getAllRate";
const RATE_UPDATE_URL = "/rate/updateRate/";
const ManageBilling = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    ratePerSqm: '',
    discountRate: '',
    ratePerCubic: '',
    penaltyRate: '',
  });

  useEffect(() => { // GET ALL DATA RATE
    axios.post(RATE_GET_URL).then((response) => {
      setData(response.data);
      setFormData(response.data[0])
      console.log(response.data);
    });
  }, []);

  const handleUpdateRate = async (e) => {
    e.preventDefault();
    
    try {
      const id = data[0].id
      console.log(id)
      await axios.put(RATE_UPDATE_URL + `${id}`, {
        ratePerSqm: formData.ratePerSqm,
        discountRate: formData.discountRate,
        ratePerCubic: formData.ratePerCubic,
        penaltyRate: formData.penaltyRate,
      })
      
    } catch (error) {
      console.log(error)
    }
  };
  
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  return (
    <div className="wrap">
      <div className="col-md-7">
        <div className="bill-container">
          <br />
          <div className="tbl-title">
            <h1 className="text-divider">ASSOCIATION DUES</h1>
          </div>
          <div className="readinginputField">
            <Form.Group controlId="ratePerSqm" className="waterbillDetails">
              <Form.Label className="labelname">*RATE PER SQUARE METER</Form.Label><br /><br />
              <Form.Control
                className="waterbillformField"
                type="text"
                name="rate"
                placeholder="Enter rate"
                value={formData.ratePerSqm}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="discountRate" className="waterbillDetails">
              <Form.Label className="labelname">*3 MONTHS ADVANCE DISCOUNT</Form.Label><br /><br />
              <Form.Control
                className="waterbillformField"
                type="text"
                name="discount"
                placeholder="Enter advance discount"
                value={formData.discountRate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>
        <div className="bill-container">
          <br />
          <div className="tbl-title">
            <h1 className="text-divider">WATER BILLS</h1>
          </div>
          <div className="readinginputField">
            <Form.Group controlId="ratePerCubic" className="waterbillDetails">
              <Form.Label className="labelname">*RATE PER CUBIC METER</Form.Label><br /><br />
              <Form.Control
                className="waterbillformField"
                type="text"
                name="meter"
                placeholder="Enter cubic meter"
                value={formData.ratePerCubic}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="penaltyRate" className="waterbillDetails">
              <Form.Label className="labelname">*PENALTY PER DUE DATE</Form.Label><br /><br />
              <Form.Control
                className="waterbillformField"
                type="text"
                name="penalty"
                placeholder="Enter advance penalty"
                value={formData.penaltyRate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="penalty_date" className="waterbillDetails">
              <Form.Label className="labelname">*DAYS BEFORE PENALTY</Form.Label><br /><br />
              <Form.Control
                className="waterbillformField"
                type="text"
                name="penalty_date"
                placeholder="Enter advance penalty"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>
        <Button className="primarybtn" type="submit" onClick={handleUpdateRate}> Update </Button>
      </div>
      <div className="col-md-5">
        <div className="condo-name">
              <img src="./images/condo-logo.png" className="com-logo"></img>
          </div>
      </div>
    </div>
    
  );
};

export default ManageBilling;