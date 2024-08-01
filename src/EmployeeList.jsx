import React from 'react';
import styled from 'styled-components';

const EmployeeList = ({ employees, onDelete }) => {
  return (
    <List>
      {employees.map(employee => (
        <EmployeeItem key={employee.id}>
          {employee.picture && <EmployeeImage src={employee.picture} alt={`${employee.name} ${employee.surname}`} />}
          <EmployeeDetails>
            <p>Name: {employee.name} {employee.surname}</p>
            <p>Email: {employee.email}</p>
            <p>Position: {employee.position}</p>
            <p>Department: {employee.department}</p>
            <p>Phone: {employee.phone}</p>
            <p>Start Date: {employee.startDate}</p>
          </EmployeeDetails>
          <button onClick={() => onDelete(employee.id)}>Delete</button>
        </EmployeeItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  list-style: none;
  padding: 0;
`;


const EmployeeItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;

  button {
    background-color: #ACBBC3;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-left: 15px;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: #c82333;
  }
`;

const EmployeeImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
`;

const EmployeeDetails = styled.div`
  flex-grow: 1;

  p {
    margin: 5px 0;
  }
`;


export default EmployeeList;
