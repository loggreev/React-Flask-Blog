import styles from './AuthenticationForm.module.css'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

function AuthenticationForm({ title, children: formInputs }) {
    return (
        <>
            <Container fluid className={styles.title}>
                <h1>{title}</h1>
            </Container>
            <Stack>
                {formInputs}
            </Stack>
            <Button variant="primary">Submit</Button>
        </>
    )
}

export default AuthenticationForm