import { useContext } from 'react';
import styles from './Header.module.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import AuthContext from '../AuthContext';

function Header() {
    const authContext = useContext(AuthContext);

    function logout(e) {
        fetch(`${API_URL}/logout/`, {
            method: 'POST',
            mode: 'same-origin'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    authContext.logout();
                }
            });

    }

    return (
        <Navbar expand="sm" className={styles.navbar}>
            <Container>
                <Navbar.Brand as={Link} to="/">React-Flask Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav>
                        {
                            authContext.isAuthenticated() ?
                                <Nav.Link onClick={logout}>Logout</Nav.Link> :
                                <>
                                    <Nav.Link as={Link} to="login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="register">Register</Nav.Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;