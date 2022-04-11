import { useContext } from 'react';
import styles from './Header.module.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import BlogPostModal from './BlogPostModal';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import AuthContext from '../AuthContext';
import ModalContext from '../ModalContext';

function Header() {
    const authContext = useContext(AuthContext);
    const modalContext = useContext(ModalContext);

    function showCreateBlogPostModal() {
        modalContext.showModal(
            <BlogPostModal />
        );
    }

    function logout(e) {
        fetch(`${API_URL}/logout/`, {
            method: 'POST',
            mode: 'same-origin'
        })
            .then(res => res.json())
            .then(async data => {
                if (data.success) {
                    await authContext.logout();
                }
            });

    }

    return (
        <Navbar expand="sm" className={styles.navbar}>
            <Container>
                <Navbar.Brand as={Link} to="/">React-Flask Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    {authContext.isAuthenticated() ?
                        <Stack direction="horizontal" gap={3}>
                            <span>Hello, {authContext.user.username}!</span>
                            <Button variant="success" onClick={showCreateBlogPostModal}>Create New</Button>
                            <Button variant="secondary">View my posts</Button>
                            <Nav><Nav.Link onClick={logout}>Logout</Nav.Link></Nav>
                        </Stack> :
                        <>
                            <Nav>
                                <Nav.Link as={Link} to="login">Login</Nav.Link>
                                <Nav.Link as={Link} to="register">Register</Nav.Link>
                            </Nav>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;