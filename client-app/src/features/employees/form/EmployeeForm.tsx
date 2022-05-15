import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer(function EmployeeForm() {

    const { employeeStore } = useStore();
    const { selectedEmployee, closeForm, createEmployee, updateEmployee, loading } = employeeStore;

    const initialState = selectedEmployee ?? {
        id: '',
        employee_name: '',
        employee_age: '',
        employee_salary: '',
        employee_annual_salary: '',
        date: '',
        profile_image: ''
    }

    const [employee, setEmployee] = useState(initialState);

    function handleSubmit() {
        employee.id ? updateEmployee(employee) : createEmployee(employee);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={employee.employee_name} name='employee_name' onChange={handleInputChange} />
                <Form.Input placeholder='Age' value={employee.employee_age} name='employee_age' onChange={handleInputChange} />
                <Form.Input placeholder='Salary' value={employee.employee_salary} name='employee_salary' onChange={handleInputChange} />
                <Form.Input placeholder='Anual Salary' readOnly value={employee.employee_annual_salary} name='employee_annual_salary' onChange={handleInputChange} />
                {/* <Form.Input placeholder='Id' value={employee.id} name='id' onChange={handleInputChange} /> */}
                <Form.Input type='date' placeholder='Date' value={employee.date} name='date' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})