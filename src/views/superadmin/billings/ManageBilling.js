import { useState, useEffect } from 'react';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../all-views-scss/_managebillings.scss';
import { Modal, Button, Form } from 'react-bootstrap';

const ManageBilling = () => {

  const [formData, setFormData] = useState({
    rate: '',
    discount: '',
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  return (
    <div className="wrap">
      <div className="container">
        <br />
        <div className="tbl-title">
          <h1 className="text-divider">ASSOCIATION DUES</h1>
        </div>
        <div className="readinginputField">
          <Form.Group controlId="rate" className="waterbillDetails">
            <Form.Label className="labelname">*RATE PER SQUARE METER</Form.Label><br /><br />
            <Form.Control
              className="waterbillformField"
              type="text"
              name="rate"
              placeholder="Enter rate"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="discount" className="waterbillDetails">
            <Form.Label className="labelname">*3 MONTHS ADVANCE DISCOUNT</Form.Label><br /><br />
            <Form.Control
              className="waterbillformField"
              type="text"
              name="discount"
              placeholder="Enter advance discount"
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="container">
        <br />
        <div className="tbl-title">
          <h1 className="text-divider">WATER BILLS</h1>
        </div>
        <div className="readinginputField">
          <Form.Group controlId="meter" className="waterbillDetails">
            <Form.Label className="labelname">*RATE PER CUBIC METER</Form.Label><br /><br />
            <Form.Control
              className="waterbillformField"
              type="text"
              name="meter"
              placeholder="Enter cubic meter"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="penalty" className="waterbillDetails">
            <Form.Label className="labelname">*PENALTY PER DUE DATE</Form.Label><br /><br />
            <Form.Control
              className="waterbillformField"
              type="text"
              name="penalty"
              placeholder="Enter advance penalty"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="penalty_date" className="waterbillDetails">
            <Form.Label className="labelname">*DAYS BEFORE PENALTY</Form.Label><br /><br />
            <Form.Control
              className="waterbillformField"
              type="text"
              name="penalty_date"
              placeholder="Enter advance penalty_date"
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
      </div>
      <Button className="primarybtn" type="submit"> Update </Button>
    </div>
    
  );
};

export default ManageBilling;