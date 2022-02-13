import React, { createRef, useContext, useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import CommentList from './CommentList';
import { Context } from '../containers/Context';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Comments({ postId }) {

    const websiteUrl = 'https://reactwordpress.000webhostapp.com';

    const [context, setContext] = useContext(Context);
    const commentText = createRef();

    const [mustLogAlert, setMustLogAlert] = useState(false);

    const sendComment = (e) => {
        e.preventDefault();
        
        if (context.isLogged) {
            axios.post(`${websiteUrl}/wp-json/wp/v2/comments`,
            {
                //author: context.loggedUser.user['ID'] //not allowed by WP
                content: commentText.current.value,
                post: postId,
                author_email: context.loggedUser.user.user_email,
                author_name: context.loggedUser.user.display_name
            }
            
            )
            .then(() => {
                    e.target.reset();
                    setContext(prev => ({ ...prev, isSynced: false }));
                    setMustLogAlert(false);
                })
        } else {
            setMustLogAlert(true)
        }
    }

    return (
        <Container className="">
            <Row>
                <Col xs={8}>
                    {context.isLogged
                        ? null
                        : <p className="fw-light">
                            You must be logged in to comment <br />
                            <Link to="/login">Login</Link>
                        </p>
                    }
                    <Form onSubmit={(e) => sendComment(e)}>
                        <Form.Control as="textarea" rows={3} placeholder="Enter here the text of your comment" ref={commentText} />
                        {mustLogAlert
                            ? <p className="fw-light alert-warning">
                                You cannot comment without logging<br />
                            </p>
                            : null
                        }
                        <div className="d-flex">
                            <Button type="submit" variant="secondary" className="ms-auto mt-1 text-uppercase fw-bold text-decoration-none">Send</Button>
                        </div>
                    </Form>

                </Col>
            </Row>
            <CommentList level={0} id={0} postId={postId} />
        </Container>
    )
}
