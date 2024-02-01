import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './form.css';

const EditModal = ({ isOpen, onRequestClose, handleEditSubmit, initialData }) => {
    
    const [editedData, setEditedData] = useState(initialData || {});

  //Synchronizing initialData and editedData  
  useEffect(() => {
    setEditedData(initialData || {});
  }, [initialData]);

  //Update the data in editedData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value === undefined ? '' : value,
    }));
  };

  //Updating the checkboxes, if checked add in array if unchecked remove from the array
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...(prevData[name] || []), value]
        : (prevData[name] || []).filter((day) => day !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditSubmit(editedData);
  };

  

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={editedData.name || ''}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="contact">Phone Number:</label>
        <input
          type="number"
          name="contact"
          value={editedData.contact || ''}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={editedData.email || ''}
          onChange={handleInputChange}
          required
        />

        <div className='checkbox-group'>
        <label htmlFor="weekday">Weekday:
            <div className="checkbox-container">    
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
            <div key={day}>
                <input
                type="checkbox"
                name="weekday"
                value={day}
                checked={(editedData.weekday || []).includes(day)}
                onChange={handleCheckboxChange}
                />
                <label htmlFor={day}>{day}</label>
            </div>
            ))}
            </div>
            </label>
        </div>

        <label htmlFor="gender">Gender:</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={editedData.gender === 'Male'}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="Male">Male</label>

          <input
            type="radio"
            name="gender"
            value="Female"
            checked={editedData.gender === 'Female'}
            onChange={handleInputChange}
          />
          <label htmlFor="Female">Female</label>
        </div>

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={editedData.dob || ''}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Save</button>
      </form>
    </Modal>
  );
};

export default EditModal;
