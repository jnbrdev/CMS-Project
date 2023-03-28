import { useState, useEffect } from "react";
import "datatables.net";
import "datatables.net-bs4";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../all-views-scss/_pullout.scss";
import { Button, Form } from "react-bootstrap";
import axios from "src/api/axios";

const INVOICE_ADD_URL = "/invoice/addBill";
const INVOICE_GET_URL = "/invoice/getUnitRateData/";
const WATERBILL_GET_URL = "/invoice/getAllWaterBill/";
const PullOut = () => {
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
            <Form onSubmit={handleFormSubmit}>
                <div className="waterbillBox">
                    <h1 className="invoice-label">GA TOWER 2 CONDOMINIUM CORPORATION</h1>
                    <p className="invoice-sub-label"># 83 Epifanio de los Santos Avenue, Barangay Malamig, Mandaluyong City</p>
                    <hr className="underline" />
                    <h2 className="invoice-sub2-label">Pull-Out Gatepass</h2>
                    <div className="invoice-row">
                        <div className="col-md-9">
                            <Form.Group controlId="date" className="invoice-field-label">
                                <Form.Label className="invoice-form-label">Date:</Form.Label>
                                <Form.Control
                                    className="invoice-input"
                                    type="text"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="unit_num" className="invoice-field-label">
                                <Form.Label className="invoice-form-label">Requesting Unit:</Form.Label>
                                <Form.Control
                                    className="invoice-input"
                                    type="text"
                                    name="unit_num"
                                    value={formData.unit_num}
                                    readOnly
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group controlId="invoice_date" className="invoice-field-label">
                                <Form.Label className="invoice-form-label">Date of Pull-Out:</Form.Label>
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
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th>Particulars/Description/Items</th>
                                <th>Quantity</th>
                                <th>Verified by Security</th>
                                <th>Costing Debris</th>
                                <th>Checked Verified by basement guard</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Form.Control className="tbl-invoice-input" type="text" name="prev_read" value={formData.prev_read} onChange={handleInputChange} /></td>
                                <td><Form.Control className="tbl-invoice-input" type="text" name="cur_read" value={formData.cur_read} onChange={handleInputChange} /></td>
                                <td><Form.Control className="tbl-invoice-input" type="text" name="meter_no" value={formData.meter_no} readOnly /></td>
                                <td><Form.Control className="tbl-invoice-input" type="text" name="reading_date" value={formData.reading_date} readOnly /></td>
                                <td><Form.Control className="tbl-invoice-input" type="text" name="due_date" value={formData.due_date} readOnly /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Form>
        </div>
    );
};

export default PullOut;
