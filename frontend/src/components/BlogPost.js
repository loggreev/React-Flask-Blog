import React, { useContext } from 'react'
import styles from './BlogPost.module.css'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import ModalContext from '../ModalContext'
import BlogPostModal from './BlogPostModal'

function BlogPost({
    title = "title",
    content = "content",
    author = "author",
    datePosted = "1/1/11",
    dateUpdated = "2/2/22",
}) {
    const modalContext = useContext(ModalContext);

    function showUpdateBlogPostModal() {
        modalContext.showModal(
            <BlogPostModal data={
                {
                    title: title,
                    content: content
                }
            } />
        );

    }

    return (
        <div className={styles["blog-post"]}>
            <div className={styles['header']}>
                <h2 className={styles['title']}>
                    {title}
                </h2>
                <div className={styles["hr"]} />
                <div className={styles['row']}>
                    <Stack className="info" direction="horizontal" gap={3}>
                        <span>Author: {author}</span>
                        <span>Date Posted: {datePosted}</span>
                        <span>Date Updated: {dateUpdated}</span>
                    </Stack>
                    <Stack className="actions" direction="horizontal" gap={3}>
                        <Button variant="primary" onClick={showUpdateBlogPostModal}>Update</Button>
                        <Button variant="danger">Delete</Button>
                    </Stack>

                </div>
            </div>
            <div className={styles['content']}>
                {content}
            </div>
        </div >
    )
}

export default BlogPost