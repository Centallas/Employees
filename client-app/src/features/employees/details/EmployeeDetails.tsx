import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default observer(function EmployeeDetails() {
    const { employeeStore } = useStore();
    const { selectedEmployee: employee, loadEmployee, loadingInitial } = employeeStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadEmployee(id);
    }, [id, loadEmployee]);

    if (loadingInitial || !employee) return <LoadingComponent />;

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
                    <Button as={Link} to={`/manage/${employee.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to={`/employees`} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>

    )
})