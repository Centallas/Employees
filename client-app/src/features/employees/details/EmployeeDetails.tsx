import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Employee } from "../../../app/layout/models/employee";

interface Props {
    employee: Employee;
    cancelSelectEmployee: () => void;
    openForm: (id: string) => void;

}

export default function EmployeeDetails({ employee, cancelSelectEmployee, openForm }: Props) {
    return (

        <Card fluid>
            <Image src='/assets/categoryImages/Employee.JPG' wrapped ui={false} />
            {/* <Image src={`/assets/categoryImages/${employee.category}.jpg`} /> */}
            <Card.Content>
                <Card.Header>{employee.employee_name}</Card.Header>
                <Card.Meta>
                    <span className='date'> Date of Join: {employee.date}</span>
                </Card.Meta>
                <Card.Description>
                    Annual Salary:{employee.employee_annual_salary} <br/>
                    Montly Salary: <span>{employee.employee_salary}</span>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(employee.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectEmployee} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>

    )
}