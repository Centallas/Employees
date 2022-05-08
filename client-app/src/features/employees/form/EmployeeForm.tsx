import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Employee } from "../../../app/layout/models/employee";

interface Props {
    employee: Employee | undefined;
    closeForm: () => void;
    createOrEdit: (employee: Employee) => void;
}

export default function EmployeeForm({ employee: selectedEmployee, closeForm, createOrEdit }: Props) {

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
        // console.log(employee);
        createOrEdit(employee);
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
                 <Form.Input placeholder='Anual Salary' readOnly value={employee.employee_annual_salary} name='employee_annual_salary' onChange={handleInputChange}/>
                {/* <Form.Input placeholder='Id' value={employee.id} name='id' onChange={handleInputChange} /> */}
                <Form.Input placeholder='Date' value={employee.date} name='date' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}