import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import { List } from 'semantic-ui-react';


function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees').then(response => {
      console.log(response);
      setEmployees(response.data)
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Employees' />

      <List>
        {employees.map((employee: any) => (
          <List.Item key={employee.id}>
            {employee.employee_name}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
