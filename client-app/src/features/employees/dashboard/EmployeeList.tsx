import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function EmployeeList() {
    const {employeeStore} = useStore()
    const {deleteEmployee, employeesByDate, loading} = employeeStore;
    const [target, setTarget] = useState('');   

    function handleEmployeeDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteEmployee(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {employeesByDate.map(employee => (
                    <Item key={employee.id}>
                        <Item.Content>
                            <Item.Header as='a'>{employee.employee_name}</Item.Header>
                            <Item.Meta>{'Age:'} {employee.employee_age}</Item.Meta>
                            <Item.Description>
                                <div>{'Monthly Salary:'} {employee.employee_salary}</div>
                                <div>{'Annual Salary:'} {employee.employee_annual_salary}</div>
                            </Item.Description>
                            <Item.Extra>
                                {/* <Button onClick={() => employeeStore.selectEmployee(employee.id)} floated='right' content='View' color='blue' /> */}
                                <Button as={Link} to={`/employees/${employee.id}`} floated='right' content='View' color='blue' />
                                <Button
                                    name={employee.id}
                                    loading={loading && target === employee.id}
                                    onClick={(e) => handleEmployeeDelete(e, employee.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                />
                                <div>{'Date of Join:'} </div>
                                <Label basic content={employee.date} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})