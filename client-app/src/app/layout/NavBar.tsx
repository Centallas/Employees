import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
    const { employeeStore } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Employees
                </Menu.Item>
                <Menu.Item name='Employess' />
                <Menu.Item>
                    <Button onClick={() => employeeStore.openForm()} positive content='Create Employee' />
                </Menu.Item>
            </Container>

        </Menu>
    )
}