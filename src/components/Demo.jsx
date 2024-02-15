import React, { useState } from 'react';

function Demo() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
    gender: '',
    city: '',
    agreeTerms: false,
  });

  const [validationMessages, setValidationMessages] = useState({
    name: '',
    mobile: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
    gender: '',
    city: '',
    agreeTerms: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newValidationMessages = {};

    if (!formData.name) {
      newValidationMessages.name = 'Name is required';
    }

    if (!formData.mobile) {
      newValidationMessages.mobile = 'Mobile Number is required';
    }

    if (!formData.email) {
      newValidationMessages.email = 'Email is required';
    }

    if (!formData.dob) {
      newValidationMessages.dob = 'Date of Birth is required';
    }

    if (!formData.password) {
      newValidationMessages.password = 'Password is required';
    }

    if (!formData.confirmPassword) {
      newValidationMessages.confirmPassword = 'Confirm Password is required';
    }

    if (!formData.gender) {
      newValidationMessages.gender = 'Gender is required';
    }

    if (!formData.city) {
      newValidationMessages.city = 'City is required';
    }

    if (!formData.agreeTerms) {
      newValidationMessages.agreeTerms = 'You must agree to the terms and conditions';
    }

    if (Object.keys(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationMessages({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setValidationMessages({});

    try {
      const response = await fetch('http://localhost:2233/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const responseData = await response.json();
      alert('Form submitted successfully!');
      console.log('Form submitted:', responseData.user);
    } catch (error) {
      console.error(error);
      alert('Failed to submit form');
    }
  };
  return (
    <div id="form">
      <form onSubmit={handleSubmit}>
        <label className="label">Name:</label><br />
        <input type="text"   onChange={handleChange}  />
        <span style={{ color: 'red' }}>{validationMessages.name}</span><br />

        <label className="label">Mobile Number:</label><br />
        <input type="number" name="mobile" onChange={handleChange}  />
        <span style={{ color: 'red' }}>{validationMessages.mobile}</span><br />

        <label className="label">Email Id:</label><br />
        <input type="email" name="email" onChange={handleChange}  />
        <span style={{ color: 'red' }}>{validationMessages.email}</span><br />

        <label className="label">Date of Birth:</label><br />
        <input type="date" name="dob" onChange={handleChange}  />
        <span style={{ color: 'red' }}>{validationMessages.dob}</span><br />

        <label className="label">Password:</label><br />
        <input type="password" name="password" onChange={handleChange}  />
        <span style={{ color: 'red' }}>{validationMessages.password}</span><br />

        <label className="label">Confirm Password:</label><br />
        <input type="password" name="confirmPassword" onChange={handleChange}  />
        <span style={{ color: 'red' }}>{validationMessages.confirmPassword}</span><br />

        <label className="label">Gender:<br />
          <input type="radio" name="gender" value="male" onChange={handleChange}  />: Male<br />
          <input type="radio" name="gender" value="female" onChange={handleChange}  />: Female<br />
        </label>
        <span style={{ color: 'red' }}>{validationMessages.gender}</span><br />

        <label className="label">City:</label>
        <select name="city" onChange={handleChange} >
          <option value="">Select City</option>
          <option value="Chennai">Chennai</option>
          <option value="Tiruppur">Tiruppur</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Erode">Erode</option>
          <option value="Madurai">Madurai</option>
        </select>
        <span style={{ color: 'red' }}>{validationMessages.city}</span><br />

        <input type="checkbox" name="agreeTerms" onChange={handleChange}  />: I agree to the terms and conditions<br/>
        <span style={{ color: 'red' }}>{validationMessages.agreeTerms}</span><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Demo;
