import { useState, useEffect } from "react";
import "datatables.net";
import "datatables.net-bs4";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../all-views-scss/_maininvoice.scss";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "src/api/axios";

const INVOICE_GET_URL = "/invoice/unitInvoiceData/";

const MainInvoice = () => {
    const [showViewModal, setShowViewModal] = useState(false);
    const [data, setData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [formData, setFormData] = useState({
        unit_num: '',
        invoice_date: '',
        due_date: '',
        
    });
    const [assocData, setAssocData] = useState([]);
    const [waterBillData, setWaterBillData] = useState([]);

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
             // Do something with the invoice data, e.g. store it in state
            const invoiceData = invoiceResponse.data;
            setWaterBillData(invoiceData.WaterBill)
            setAssocData(invoiceData.AssocDue)
            setFormData(invoiceData)
            
            
           
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(formData, assocData, waterBillData)
    }, [formData, assocData, waterBillData]);

    
   

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
            <Form onSubmit={handleFormSubmit}>
                {/* WATER BILL DETAILS */}
                <div className="company">
                    <div className="condo-name">
                        <img src="./images/com-logo.png" className="com-image"></img>
                        <h1>Lorem ipsum dolor corp.</h1>
                    </div>
                    <p className="com-address">#Lorem ipsum dolor sit amet</p>
                </div>
                <div className="waterbillBox">
                    <img src="./images/com-logo.png" className="com-logo"></img>
                    <h2 className="invoice-label">STATEMENT OF ACCOUNT</h2>
                    <hr className="underline" />
                    <div className="invoice-row">
                        <div className="col-md-6">
                        <Form.Group controlId="unit_num" className="invoice-field-label">
                                <Form.Label className="invoice-form-label">Unit No:</Form.Label>
                                <Form.Control
                                    className="invoice-input"
                                    type="text"
                                    name="unit_num"
                                    placeholder="Input unit number.."
                                    onChange={handleUnitNumberChange}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group controlId="invoice_date" className="invoice-field-label">
                                <Form.Label className="invoice-form-label">Date:</Form.Label>
                                <Form.Control
                                    className="invoice-input-date"
                                    type="text"
                                    name="invoice_date"
                                    value={formData.invoice_date}
                                    readOnly
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <br />
                    <div className="balance">
                        <div className="col-md-6">
                            <Form.Group controlId="view_record" className="invoice-field-label">
                                <div>
                                    <Form.Label className="main-invoice-form-label">Print Type:</Form.Label>
                                </div>
                                <input
                                    className="view-record-input"
                                    type="text"
                                    name="view_record"
                                    readOnly
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group controlId="balance" className="invoice-field-label">
                                <div>
                                    <Form.Label className="main-invoice-form-label">Outstanding Balance:</Form.Label>
                                </div>
                                <input
                                    className="balance-input"
                                    type="text"
                                    name="balance"
                                    readOnly
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <br />
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>TRN #</th>
                                <th>DESCRIPTION</th>
                                <th>TRANSACTION PLACE</th>
                                <th>CHARGES</th>
                                <th>PAYMENT</th>
                                <th>RUNNING BALANCE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Form.Control className="tbl-invoice-input" type="text" name="meter_no"  /></td>
                                <td><Form.Control className="tbl-invoice-input" type="text" name="meter_no" /></td>
                                <td><Form.Control className="tbl-invoice-input" type="text" name="reading_date"  /></td>
                                <td><Form.Control className="tbl-invoice-input" type="text" name="due_date"  /></td>
                                <td><Form.Control className="tbl-invoice-input" type="text" name="due_date"  /></td>
                                <td><Form.Control className="tbl-invoice-input" type="text" name="due_date"  /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                
                {/* STATEMENT OF AGING TABLE */}
                <p className="statement">STATEMENT OF ACCOUNT AGING</p>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>TOTAL</th>
                            <th>ADVANCES</th>
                            <th>CURRENT</th>
                            <th>30 DAYS</th>
                            <th>60 DAYS</th>
                            <th>OVER 90</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Form.Control className="tbl-invoice-input" type="text" name="meter_no"  /></td>
                            <td><Form.Control className="tbl-invoice-input" type="text" name="meter_no"  /></td>
                            <td><Form.Control className="tbl-invoice-input" type="text" name="reading_date"  /></td>
                            <td><Form.Control className="tbl-invoice-input" type="text" name="due_date"  /></td>
                            <td><Form.Control className="tbl-invoice-input" type="text" name="due_date" /></td>
                            <td><Form.Control className="tbl-invoice-input" type="text" name="due_date" /></td>
                        </tr>
                    </tbody>
                </table>
                
                <Button className="secondarybtn" type="submit" >
                    Show Invoice
                </Button>
            </Form>
           
        </div>
    );
};

export default MainInvoice;
