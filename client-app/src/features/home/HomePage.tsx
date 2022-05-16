import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage() {

    return (
        <Container style={{ marginTop: '7e' }}>
            <h1>Home page</h1>
            <h3>Go to  <Link to='/employees'>Employees</Link></h3>
        </Container>
    )

}