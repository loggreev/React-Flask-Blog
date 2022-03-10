import styles from './Form.module.css'
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PasswordStrengthBar from 'password-strength-bars'

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log(username, password, confirmPassword);
    }

    return (
        <>
            <Container fluid className={styles.title}>
                <h1>Register</h1>
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
                        <Form.Text className="text-muted">
                            Make sure to practice good password security!
                        </Form.Text>
                        <div className="mb-2"></div>
                        <PasswordStrengthBar password={password} strengthTitles={{ weak: "Weak", normal: "Okay", good: "Good", strong: "Strong" }} />
                    </Form.Group>

                    <Form.Group className="mx-auto mb-3 w-50" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(event) => { setConfirmPassword(event.target.value) }} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Register;