import React, { useState } from 'react';
import styled from 'styled-components';

const EmployeeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    startDate: '',
    picture: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, picture: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      surname: '',
      email: '',
      position: '',
      department: '',
      phone: '',
      startDate: '',
      picture: ''
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name:
        <Input type="text" name="name" value={formData.name} onChange={handleChange} />
      </Label>
      <Label>
        Surname:
        <Input type="text" name="surname" value={formData.surname} onChange={handleChange} />
      </Label>
      <Label>
        Email:
        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
      </Label>
      <Label>
        Position:
        <Input type="text" name="position" value={formData.position} onChange={handleChange} />
      </Label>
      <Label>
        Department:
        <Input type="text" name="department" value={formData.department} onChange={handleChange} />
      </Label>
      <Label>
        Phone:
        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </Label>
      <Label>
        Start Date:
        <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
      </Label>
      <Label>
        Picture:
        <Input type="file" accept="image/*" onChange={handleImageChange} />
      </Label>
      {formData.picture && <ImagePreview src={formData.picture} alt="Employee Preview" />}
      <Button type="submit">Add Employee</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Label = styled.label`
  margin-bottom: 15px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 3px;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #218838;
  }
`;

const ImagePreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
  border-radius: 5px;
`;

export default EmployeeForm;
