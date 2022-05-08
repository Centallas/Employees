import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Employee } from './models/employee';
import NavBar from './NavBar';
import EmployeeDashboard from '../../features/employees/dashboard/EmployeeDashboard';
import { v4 as uuid } from 'uuid';


function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
  const [editMode, setEditmode] = useState(false);

  useEffect(() => {
    axios.get<Employee[]>('http://localhost:5000/api/employees').then(response => {
      setEmployees(response.data)
    })
  }, [])

  function handleSelectEmployee(id: string) {
    setSelectedEmployee(employees.find(x => x.id === id));
  }
  function handleCancelSelectEmployee() {
    setSelectedEmployee(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectEmployee(id) : handleCancelSelectEmployee();
    setEditmode(true);
  }
  function handleFormClose() {
    setEditmode(false);
  }
  function handleCreateOrEditEmployee(employee: Employee) {

    var salary: number = +employee.employee_salary;
    var anualSalary: number = salary * 12;

    employee.id ? setEmployees([...employees.filter(x => x.id !== employee.id),{...employee, employee_annual_salary: anualSalary.toString()}])
      : setEmployees([...employees, { ...employee, id: uuid(), employee_annual_salary: anualSalary.toString() }]);
    setEditmode(false)
    setSelectedEmployee(employee);
  }
  function handleDeleteEmployee(id: string) {
    setEmployees([...employees.filter(x => x.id !== id)])
  }


  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <EmployeeDashboard
          employees={employees}
          selectedEmployee={selectedEmployee}
          selectEmployee={handleSelectEmployee}
          cancelSelectEmployee={handleCancelSelectEmployee}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditEmployee}
          deleteEmployee={handleDeleteEmployee}
        />
      </Container>
    </>
  );
}
export default App;
