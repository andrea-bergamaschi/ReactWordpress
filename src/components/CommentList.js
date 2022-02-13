import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Context } from '../containers/Context';

export default function CommentList({ level, id, postId }) {

    const websiteUrl = 'https://reactwordpress.000webhostapp.com';

    const [data, setData] = useState([]);
    let [commentText] = useState([]);
    const [context, setContext] = useContext(Context);
    const [mustLogAlert] = useState(false);
    const [commentBox, setCommentBox] = useState(false);

    level = level + 1;

    useEffect(() => {
        axios.get(`${websiteUrl}/wp-json/wp/v2/comments?post=${postId}&parent=${id}&order=asc&orderby=date`)
            .then(res => {
                setData(res.data)
                setContext(prev => ({ ...prev, isSynced: true }));
            }
            )

    }, [context.isSynced])

    const formatter = new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });

    const toggleCommentsBox = () => {
        setCommentBox(!commentBox);
    }

    const handleChange = (e) => {
        commentText = e.target.value;
    }

    useEffect(() => {
    }, [])

    const sendCommentFromList = (e, commentId) => {
        e.preventDefault();
        axios.post(`${websiteUrl}/wp-json/wp/v2/comments`, {
            
            content: commentText,
            post: postId,
            author_email: context.loggedUser.user.user_email,
            author_name: context.loggedUser.user.display_name,
            parent: commentId
        }
        
        )
        .then(() => {
            setContext(prev => ({ ...prev, isSynced: false }));
            e.target.reset();
            })
    }


    return (
        <>
            {
                data.map((el) =>
                    <div key={el.id}>
                        <Row className="comment ms-1 mt-2">

                            <Col xs={{ span: 8 - Math.min(level - 1, 3), offset: Math.min(level - 1, 3) }} className="py-3 px-4 comment-data bg-light">
                                <span className="fw-bold fs-5">{el.author_name}</span><br />
                                <span className="fw-light">{formatter.format(new Date(el.date_gmt))}</span>
                                <span className="" dangerouslySetInnerHTML={{ __html: el.content.rendered }}></span>
                                {(level - 1 <= 3 && context.isLogged)
                                    ? <span className="violet text-decoration-none reply" href="#" onClick={toggleCommentsBox}>Reply</span>
                                    : null
                                }
                                {commentBox
                                    ? <Form onSubmit={(e) => sendCommentFromList(e, el.id)}>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter here the text of your comment" onChange={(e) => handleChange(e)} />
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
                                    : null
                                }

                            </Col>

                        </Row>

                        <CommentList level={level} id={el.id} postId={postId}></CommentList>
                    </div>

                )}
        </>
    )
}
