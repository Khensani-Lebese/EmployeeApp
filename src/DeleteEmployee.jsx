import React, { useState } from 'react';
import { getEmployeesFromLocalStorage, deleteEmployeeFromLocalStorage, updateEmployeeInLocalStorage } from './localStorageUtils';
import styled from 'styled-components';

const DeleteEmployee = () => {
  const [employees, setEmployees] = useState(getEmployeesFromLocalStorage());
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', surname: '', position: '' });

  const deleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees(updatedEmployees);
    deleteEmployeeFromLocalStorage(employeeId);
  };

  const editEmployee = (employee) => {
    setEditingEmployee(employee);
    setEditFormData({ name: employee.name, surname: employee.surname, position: employee.position });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const saveEditedEmployee = () => {
    const updatedEmployees = employees.map(employee =>
      employee.id === editingEmployee.id ? { ...employee, ...editFormData } : employee
    );
    setEmployees(updatedEmployees);
    updateEmployeeInLocalStorage(editingEmployee.id, editFormData);
    setEditingEmployee(null);
  };

  return (
    <Container>
      <h2>Delete or Edit Employee</h2>
      <ul>
        {employees.map(employee => (
          <EmployeeItem key={employee.id}>
            {employee.name} {employee.surname} - {employee.position}
            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
            <button onClick={() => editEmployee(employee)}>Edit</button>
          </EmployeeItem>
        ))}
      </ul>
      {editingEmployee && (
        <EditForm>
          <h3>Edit Employee</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Surname:
            <input
              type="text"
              name="surname"
              value={editFormData.surname}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Position:
            <input
              type="text"
              name="position"
              value={editFormData.position}
              onChange={handleEditFormChange}
            />
          </label>
          <button onClick={saveEditedEmployee}>Save</button>
          <button onClick={() => setEditingEmployee(null)}>Cancel</button>
        </EditForm>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const EmployeeItem = styled.li`
  list-style: none;
  padding: 10px;
  margin: 10px 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: #3C4C53;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-left: 5px;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: #839791;
  }

  button:nth-child(2) {
    background-color: #3C4C53;
  }

  button:nth-child(2):hover {
    background-color: #839791;
  }
`;

const EditForm = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;

  h3 {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  button {
    background-color: #3C4C53;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: #839791;
  }
`;

export default DeleteEmployee;
