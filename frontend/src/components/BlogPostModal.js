import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalContext from '../ModalContext';

//data represents the blog post's data (title, content)
//if undefined, a new blog post is being created
function BlogPostModal({ data }) {
    const modalContext = useContext(ModalContext);

    const creating_new = !data;

    return (
        <Modal show={true} onHide={modalContext.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{creating_new ? "Create" : "Update"} Blog Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* TODO form */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" >
                    Cancel
                </Button>
                <Button variant="primary" >
                    {creating_new ? "Create" : "Save Changes"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BlogPostModal