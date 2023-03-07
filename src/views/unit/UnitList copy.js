import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';

const UnitList = () => {

  const [data, setData] = useState([
    { unitID: '1', unitNum: '104', unitOwner: 'John', unitTower: 'Tower 1', unitFloor: '1st Floor', unitSize: '10 sqm', dateAdded: '2023-05-01', status: 'Owner Occupied' },
    { unitID: '2', unitNum: '253', unitOwner: 'Jane', unitTower: 'Tower 2', unitFloor: '2nd Floor', unitSize: '15 sqm', dateAdded: '2023-05-02', status: 'Tenant Occupied' },
    { unitID: '3', unitNum: '303', unitOwner: 'Bob', unitTower: 'Tower 3', unitFloor: '3rd Floor', unitSize: '20 sqm', dateAdded: '2023-05-03', status: 'Vacant' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState({});

  useEffect(() => {
    // Use jQuery DataTables to create the table
    $('#example').DataTable();
  }, []);

  const handleAddNewEntry = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { unitID, value } = event.target;
    setNewEntry((prevState) => ({ ...prevState, [unitID]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData((prevState) => [...prevState, newEntry]);
    setShowModal(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleAddNewEntry}>
        Add New Entry
      </Button>

      <table id="example" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>UnitID</th>
            <th>Unit #</th>
            <th>Unit Owner</th>
            <th>Unit Tower</th>
            <th>Unit Floor</th>
            <th>Unit Size</th>
            <th>Date Added</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.unitID}</td>
              <td>{entry.unitNum}</td>
              <td>{entry.unitOwner}</td>
              <td>{entry.unitTower}</td>
              <td>{entry.unitFloor}</td>
              <td>{entry.unitSize}</td>
              <td>{entry.dateAdded}</td>
              <td>{entry.status}</td>
              <td>
                <Button variant="warning">View</Button>
                <Button variant="primary">Update</Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UnitList;