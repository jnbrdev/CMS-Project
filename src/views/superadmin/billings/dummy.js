import React, { useState } from 'react';

function AddBill() {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={isActive} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
      <p>{isActive ? 'Inactive' : 'Active' }</p>
    </div>
  );
}

export default AddBill;
