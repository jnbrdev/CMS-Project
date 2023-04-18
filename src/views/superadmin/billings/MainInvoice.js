import { useState, useEffect, useRef } from "react";
import "datatables.net";
import "datatables.net-bs4";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../all-views-scss/_maininvoice.scss";
import { Button, Form, Modal } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import axios from "src/api/axios";

const INVOICE_GET_URL = "/invoice/unitInvoiceData/";

const MainInvoice = () => {
    const exportPDF= useRef();
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
    const [accountAgingData, setAccountAgingData] = useState([]);

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
            setWaterBillData(invoiceData.waterBillData)
            setAssocData(invoiceData.assocDueData)
            setAccountAgingData(invoiceData.accountAgingData)
            setFormData(invoiceData)
            setData(invoiceData)
            
           
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(formData, assocData, waterBillData, accountAgingData)
    }, [formData, assocData, waterBillData, accountAgingData]);

    const generatePDF= useReactToPrint({
        content: ()=>exportPDF.current,
        documentTitle:"Bill-Invoice",
        // onAfterPrint:()=>alert("Data saved in PDF")
    });

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
        <div ref={exportPDF} style={{width:'100%'}}>
            <div className="main-invoice-container">
                <Form onSubmit={handleFormSubmit}>
                    {/* WATER BILL DETAILS */}
                    <div className="main-invoice-company">
                        <div className="condo-name">
                            <img src="./images/condo-connect.png" className="com-image"></img>
                            {/* <h1>Lorem ipsum dolor corp.</h1> */}
                        </div>
                        {/* <p className="com-address">#Lorem ipsum dolor sit amet</p> */}
                    </div>
                    <div className="main-invoice-waterbillBox">
                        <img src="./images/condo.png" className="com-logo"></img>
                        <h2 className="main-invoice-label">STATEMENT OF ACCOUNT</h2>
                        <hr className="main-invoice-underline" />
                        <div className="main-invoice-row">
                            <div className="col-md-6">
                            <Form.Group controlId="unit_num" className="main-invoice-field-label">
                                    <Form.Label className="main-invoice-form-label">Unit No:</Form.Label>
                                    <Form.Control
                                        className="main-invoice-input"
                                        type="text"
                                        name="unit_num"
                                        placeholder="Input unit number.."
                                        onChange={handleUnitNumberChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="invoice_date" className="main-invoice-field-label">
                                    <Form.Label className="main-invoice-form-label">Date:</Form.Label>
                                    <Form.Control
                                        className="main-invoice-input-date"
                                        type="text"
                                        name="invoice_date"
                                        value={formData.invoice_date}
                                        readOnly
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <br />
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>INVOICE #</th>
                                    <th>DESCRIPTION</th>
                                    <th>TRANSACTION DATE</th>
                                    <th>CHARGES</th>
                                    <th>RUNNING BALANCE</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.waterBillData.invoiceID}</td>
                                <td style={{ whiteSpace: 'pre-wrap' }}>{entry.waterBillData.description}</td>
                                <td>{entry.waterBillData.readDate}</td>
                                <td>{entry.waterBillData.amount}</td>
                                <td>
                                Outstanding Balance:
                                <br />
                                {entry.accAgingData.total}
                                <br />
                                <br />
                                <br />
                                {/*(
                                    Number(entry.accAgingData.thirty_days) +
                                    Number(entry.accAgingData.sixty_days) +
                                    Number(entry.accAgingData.ninety_days)
                                ).toFixed(2)*/}
                                </td>
                            </tr>
                            ))}
                            {data.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.assocDueData.invoice_no}</td>
                                <td style={{ whiteSpace: 'pre-wrap' }}>{entry.assocDueData.description}</td>
                                <td></td>
                                <td> {entry.assocDueData.amount}</td>
                                <td>
                                <br />
                                <br />
                                <br />
                                    Total Charges: {entry.totalCharges}
                                </td>
                            </tr>
                            ))}
                                
                            </tbody>
                        </table>
                    </div>
                    <br />
                    
                    {/* STATEMENT OF AGING TABLE */}
                    <p className="main-invoice-statement">STATEMENT OF ACCOUNT AGING</p>
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>ADVANCES</th>
                                <th>CURRENT</th>
                                <th>30 DAYS</th>
                                <th>60 DAYS</th>
                                <th>OVER 90</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((entry) => (
                                    <tr key={entry.id}>
                                        <td>{entry.accAgingData.unit_no}</td>
                                        <td>{entry.accAgingData.current}</td>
                                        <td>{entry.accAgingData.thirty_days}</td>
                                        <td>{entry.accAgingData.sixty_days}</td>
                                        <td>{entry.accAgingData.ninety_days}</td>
                                        <td>{entry.accAgingData.total}</td>
                                    </tr>
                                    ))}
                        </tbody>
                    </table>
                    <br/>
                    <Button className="main-invoice-secondarybtn" onClick={generatePDF}>
                        Download | Print Invoice
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default MainInvoice;
