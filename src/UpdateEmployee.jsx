import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm.jsx';
import { getEmployeesFromLocalStorage, setEmployeesToLocalStorage } from './localStorageUtils.jsx';
import styled from 'styled-components';

const UpdateEmployee = () => {
  const [employees, setEmployees] = useState(getEmployeesFromLocalStorage());

  const updateEmployee = (updatedEmployee) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    setEmployeesToLocalStorage(updatedEmployees);
  };

  return (
    <Container>
      <h2>Update Employee</h2>
      <EmployeeForm onUpdate={updateEmployee} />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export default UpdateEmployee;
