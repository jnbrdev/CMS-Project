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
    <div className="manage-billing-wrap">
      <div className="col-md-7">
        <div className="manage-billing-container">
          <br />
          <div className="manage-billing-tbl-title">
            <h1 className="manage-billing-divider">ASSOCIATION DUES</h1>
          </div>
          <div className="manage-billing-inputField">
            <Form.Group controlId="ratePerSqm" className="manage-assoc-dues">
              <Form.Label className="manage-billing-label">*RATE PER SQUARE METER</Form.Label><br /><br />
              <Form.Control
                className="manage-assoc-dues-formField"
                type="text"
                name="rate"
                placeholder="Enter rate"
                value={formData.ratePerSqm}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="discountRate" className="manage-assoc-dues">
              <Form.Label className="manage-billing-label">*3 MONTHS ADVANCE DISCOUNT</Form.Label><br /><br />
              <Form.Control
                className="manage-assoc-dues-formField"
                type="text"
                name="discount"
                placeholder="Enter advance discount"
                value={formData.discountRate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>
        <div className="manage-billing-container">
          <br />
          <div className="manage-billing-tbl-title">
            <h1 className="manage-billing-divider">WATER BILLS</h1>
          </div>
          <div className="manage-billing-inputField">
            <Form.Group controlId="ratePerCubic" className="manage-water-bill">
              <Form.Label className="manage-billing-label">*RATE PER CUBIC METER</Form.Label><br /><br />
              <Form.Control
                className="manage-water-bill-formField"
                type="text"
                name="meter"
                placeholder="Enter cubic meter"
                value={formData.ratePerCubic}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="penaltyRate" className="manage-water-bill">
              <Form.Label className="manage-billing-label">*PENALTY PER DUE DATE</Form.Label><br /><br />
              <Form.Control
                className="manage-water-bill-formField"
                type="text"
                name="penalty"
                placeholder="Enter advance penalty"
                value={formData.penaltyRate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="penalty_date" className="manage-water-bill">
              <Form.Label className="manage-billing-label">*DAYS BEFORE PENALTY</Form.Label><br /><br />
              <Form.Control
                className="manage-water-bill-formField"
                type="text"
                name="penalty_date"
                placeholder="Enter advance penalty"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>
        <Button className="manage-billing-primarybtn" type="submit" onClick={handleUpdateRate}> Update </Button>
      </div>
      <div className="col-md-5">
        <div className="manage-billing-condo-logo">
              <img src="./images/condo.png" className="manage-billing-com-logo"></img>
          </div>
      </div>
    </div>
    
  );
};

export default ManageBilling;