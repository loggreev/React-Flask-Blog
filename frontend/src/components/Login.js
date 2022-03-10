import styles from './Form.module.css'
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log(username, password);
    }

    return (
        <>
            <Container fluid className={styles.title}>
                <h1>Login</h1>
            </Container>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mx-auto mb-3 w-50" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} placeholder="Username" onChange={(event) => { setUsername(event.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mx-auto mb-3 w-50" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>

    )
}

export default Login;