 {/* EDIT MODAL START */}
 <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
 <br/>
 <h1 className="text-divider">Edit Unit</h1>
 <Modal.Body>
   <Form onSubmit={handleUpdateSubmit}>

     <Form.Group controlId="unit_id" className="addForm">
       <Form.Label className="formIcon"><HiIdentification /></Form.Label>
       <Form.Control
         className="formField"
         type="text"
         placeholder="Enter unit ID"
         name="unit_id"
         value={formData.unit_id}
         onChange={handleInputChange}
       />
     </Form.Group>

     <Form.Group controlId="first_name" className="addForm">
       <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
       <Form.Control
         className="formField"
         type="text"
         placeholder="Enter firstname"
         name="first_name"
         value={formData.first_name}
         onChange={handleInputChange}
       />
     </Form.Group>

     <Form.Group controlId="last_name" className="addForm">
       <Form.Label className="formIcon"><MdDriveFileRenameOutline /></Form.Label>
       <Form.Control
         className="formField"
         type="text"
         placeholder="Enter lastname"
         name="last_name"
         value={formData.last_name}
         onChange={handleInputChange}
       />
     </Form.Group>

     <Form.Group controlId="contact_no" className="addForm">
       <Form.Label className="formIcon"><MdContactPhone /></Form.Label>
       <Form.Control
         className="formField"
         type="text"
         placeholder="Enter contact number"
         name="contact_no"
         value={formData.contact_no}
         onChange={handleInputChange}
       />
     </Form.Group>

     <Form.Group controlId="birthdate" className="addForm">
       <Form.Label className="formIcon"><MdCake /></Form.Label>
       <Form.Control
         className="formField"
         type="date"
         placeholder="yyyy-mm-dd"
         name="birthdate"
         value={formData.birthdate}
         onChange={handleInputChange}
       />
     </Form.Group>

     <Form.Group controlId="role" className="addForm">
       <Form.Label className="formIcon"><FaUsersCog /></Form.Label>
       <Form.Control
         className="formField"
         as="select"
         name="role"
         value={formData.role}
         onChange={handleInputChange}
       >
         <option value="">Select Role</option>
         <option value="Unit Owner">Unit Owner</option>
         <option value="Tenant">Tenant</option>
       </Form.Control>
     </Form.Group>

     <Form.Group controlId="email" className="addForm">
       <Form.Label className="formIcon"><MdEmail /></Form.Label>
       <Form.Control
         className="formField"
         type="text"
         placeholder="Enter email"
         name="email"
         value={formData.email}
         onChange={handleInputChange}
       />
     </Form.Group>

     <Form.Group controlId="password" className="addForm">
       <Form.Label className="formIcon"><BsFillShieldLockFill /></Form.Label>
       <Form.Control
         className="formField"
         type="text"
         placeholder="Enter password"
         name="password"
         value={formData.password}
         onChange={handleInputChange}
       />
     </Form.Group>
     <br />
     <Modal.Footer className="modalbtn">
       <Button className="primarybtn" onClick={() => setShowEditModal(false)}>
         Cancel
       </Button>
       <Button className="secondarybtn" type="submit">
         Save
       </Button>
     </Modal.Footer>
   </Form>
 </Modal.Body>
</Modal>
{/* EDIT MODAL END */}