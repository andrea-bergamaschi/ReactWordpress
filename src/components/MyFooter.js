import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function MyFooter() {
    return (
        <footer className="py-3">
            <Container>
                <Row className="d-flex justify-content-start align-items-baseline">
                    <Col>
                    <Link className="text-decoration-none fw-light fs-3" to="/">
                        React-Wp
                    </Link>
                    <div className="fw-light">Final Project for Epicode School</div>
                    </Col>
                    <Col>
                    Andrea Bergamaschi
                    </Col>
                    <Col>
                    <a href="mailto:berg.ndr@gmail.com" className="text-decoration-none">Mail</a><br />
                    <a href="https://www.linkedin.com/in/andrea-bergamaschi-95b755127/" className="text-decoration-none">Linkedin</a><br />
                    <a href="https://github.com/andrea-bergamaschi?tab=repositories" className="text-decoration-none">Github</a>
                    </Col>
                </Row>
            </Container>

        </footer>
    )
}
