import React, { useState } from 'react';
import './form.css';

const Form = ({ handleFormSubmit }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    weekday: [],
    gender: '',
    dob: ''
  });

  //Updating the formData to store the inputs 
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  //Updating the formData for checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], e.target.value] //Checking if triggered action was of checked than add the weekday in array
        : prevData[name].filter((day) => day !== e.target.value) //Checking if triggered action was unchecking than remove the weekday from array
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(formData); 
    setFormData({
      name: '',
      email: '',
      contact: '',
      weekday: [],
      gender: '',
      dob: ''
    }); //Resetting the form 
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
      </label>

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </label>

      <label>
        Contact:
        <input type="number" name="contact" value={formData.contact} onChange={handleInputChange} required />
      </label>

      <div className='checkbox-group'>
      <label>
        Weekday:
        <div className="checkbox-container">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
            <div key={day} className="checkbox-item">
              <input
                type="checkbox"
                name="weekday"
                value={day}
                checked={formData.weekday.includes(day)}
                onChange={handleCheckboxChange}
                
              />
              <span>{day} </span>
            </div>
          ))}
        </div>
      </label>
      </div>

      <div className='checkbox-group'>
        <label>
        Gender:
        <div className="checkbox-container">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleInputChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleInputChange}
            />
            Female
          </label>
        </div>
      </label>
      </div>

      <label>
        Date of Birth:
        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
