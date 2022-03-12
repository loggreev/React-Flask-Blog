import React from 'react'
import BlogPost from './BlogPost'
import styles from './MainContent.module.css'

function MainContent({ posts }) {
    posts = [
        <BlogPost content="Test post" author='Logan' datePosted='3/11/22' dateUpdated='3/11/22' />,
        <BlogPost />,
        <BlogPost />,
        <BlogPost />,
        <BlogPost />
    ];

    return (
        <div className={styles["main-content"]}>
            <div className={styles['blog-posts']}>
                {posts}
            </div>
        </div>
    )
}

export default MainContent;