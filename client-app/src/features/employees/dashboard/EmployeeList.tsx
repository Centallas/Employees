import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Employee } from "../../../app/layout/models/employee";

interface Props {
    employees: Employee[];
    selectEmployee: (id: string) => void;
    deleteEmployee: (id: string) => void;
    submitting: boolean;
}

export default function EmployeeList({ employees, selectEmployee, deleteEmployee, submitting }: Props) {
    const [target, setTarget] = useState('');

    function handleEmployeeDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteEmployee(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {employees.map(employee => (
                    <Item key={employee.id}>
                        <Item.Content>
                            <Item.Header as='a'>{employee.employee_name}</Item.Header>
                            <Item.Meta>{employee.employee_age}</Item.Meta>
                            <Item.Description>
                                <div>{employee.employee_salary}</div>
                                <div>{employee.employee_annual_salary}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectEmployee(employee.id)} floated='right' content='View' color='blue' />
                                <Button
                                    name={employee.id}
                                    loading={submitting && target === employee.id}
                                    onClick={(e) => handleEmployeeDelete(e, employee.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                />
                                <Label basic content={employee.date} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}