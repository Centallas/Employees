import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Employee } from './models/employee';
import NavBar from './NavBar';
import EmployeeDashboard from '../../features/employees/dashboard/EmployeeDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
  const [editMode, setEditmode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Employees.list().then(response => {
      let employees: Employee[] = [];
      response.forEach(employee => {
        employee.date = employee.date.split('T')[0];
        employees.push(employee);
      })
      setEmployees(employees);
      setLoading(false);
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
    setSubmitting(true);
    var salary: number = +employee.employee_salary;
    var anualSalary: number = salary * 12;
    if (employee.id) {
      employee.employee_annual_salary = anualSalary.toString();
      agent.Employees.update(employee).then(() => {
        setEmployees([...employees.filter(x => x.id !== employee.id), { ...employee, employee_annual_salary: anualSalary.toString() }])
        setSelectedEmployee(employee);
        setEditmode(false);
        setSubmitting(false);
      })
    } else {
      employee.id = uuid();
      employee.employee_annual_salary = anualSalary.toString();
      agent.Employees.create(employee).then(() => {
        setEmployees([...employees, employee]);
        setSelectedEmployee(employee);
        setEditmode(false);
        setSubmitting(false);
      })
    }
  }
  function handleDeleteEmployee(id: string) {
    setSubmitting(true);
    agent.Employees.delete(id).then(() => {
      setEmployees([...employees.filter(x => x.id !== id)])
      setSubmitting(false);
    })

  }

  if (loading) return <LoadingComponent content='Loading app' />

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}
export default App;
