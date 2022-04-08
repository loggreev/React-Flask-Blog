import styles from './Form.module.css'
import React, { useState, useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { API_URL } from '../App'
import AuthContext from '../AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`${API_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                }
            ),
            mode: 'same-origin'
        })
            .then(res => res.json())
            .then(async data => {
                if (data.success) {
                    await authContext.login();
                    //go back one page
                    navigate(-1);
                }
            });
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