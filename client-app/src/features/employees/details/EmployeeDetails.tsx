import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default function EmployeeDetails() {
    const { employeeStore } = useStore();
    const { selectedEmployee: employee, openForm, cancelSelectedEmployee } = employeeStore;

    if (!employee) return <LoadingComponent />;

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
                    Montly Salary: <span>{employee.employee_salary}<br />
                        Annual Salary:{employee.employee_annual_salary} </span>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(employee.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedEmployee} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>

    )
}