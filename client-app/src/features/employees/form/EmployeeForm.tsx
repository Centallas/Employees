import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';


export default observer(function EmployeeForm() {
    const history = useHistory();
    const { employeeStore } = useStore();
    const { createEmployee, updateEmployee,
        loading, loadEmployee, loadingInitial } = employeeStore;

    const { id } = useParams<{ id: string }>();

    const [employee, setEmployee] = useState({
        id: '',
        employee_name: '',
        employee_age: '',
        employee_salary: '',
        employee_annual_salary: '',
        date: '',
        profile_image: ''
    });

    useEffect(() => {
        if (id) loadEmployee(id).then(employee => setEmployee(employee!));
    }, [id, loadEmployee]);

    function handleSubmit() {
        if (employee.id.length === 0) {
            let newEmployee = {
                ...employee,
                id: uuid()
            };
            createEmployee(newEmployee).then(() => history.push(`/employees/${newEmployee.id}`))
        } else {
            updateEmployee(employee).then(() => history.push(`/employees/${employee.id}`))
        }

    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value })
    }

    if (loadingInitial) return < LoadingComponent content="Loading employee..." />

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
                <Button as={Link} to='/employees' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})