import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Context } from '../containers/Context';

export default function Info() {

    const [context] = useContext(Context);

    return (
        <Container>
            <Row>
                <h1 className="fs-2 fw-light py-4">My personal Info</h1>
                <Col xs={10} sm={8} md={5}>
                    <p><span className="pe-3 fs-5">Username </span> <span className="py-3 pre-style d-block font-monospace">{context.loggedUser.user.user_login}</span></p>
                    <p><span className="pe-3 fs-5">Email </span> <span className="py-3 pre-style d-block font-monospace">{context.loggedUser.user.user_email}</span></p>
                    <p><span className="pe-3 fs-5">Name </span> <span className="py-3 pre-style d-block font-monospace">{context.loggedUser.user.display_name}</span></p>
                    <p><span className="pe-3 fs-5">Website </span> <span className="py-3 pre-style d-block font-monospace">{context.loggedUser.user.user_url}</span></p>
                    <p><span className="pe-3 fs-5">Registered on: </span> <span className="py-3 pre-style d-block font-monospace">{context.loggedUser.user.user_registered}</span></p>
                    <p><span className="pe-3 fs-5">Roles: </span>{context.loggedUser.roles.map((el,ind) => <span key={ind} className="py-3 pre-style d-block font-monospace">{el} </span> )}</p>
                </Col>
            </Row>
        </Container>
    )
}
