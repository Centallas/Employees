import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Employees
                </Menu.Item>
                <Menu.Item as={NavLink} to='/Employees' name='Employess' />
                <Menu.Item>
                    {/* <Button onClick={() => employeeStore.openForm()} positive content='Create Employee' /> */}
                    <Button as={NavLink} to='/createEmployee' positive content='Create Employee' />
                </Menu.Item>
            </Container>

        </Menu>
    )
}