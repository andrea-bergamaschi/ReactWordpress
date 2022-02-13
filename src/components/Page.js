import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

export default function Page({data}) {

    const websiteUrl = 'https://reactwordpress.000webhostapp.com';

    const [src, setSrc] = useState('');

    useEffect(() => {
        axios.get(`${websiteUrl}/wp-json/wp/v2/media`)
        .then(res => {
            setSrc(res.data.filter(el => el.id === data.featured_media)[0].source_url);
        })
    }, [data.featured_media])

    return (
        <Container>
        <Row>
            <h1 className="mt-3 fw-light">{data.title.rendered}</h1>
        </Row>
        <Row>
            <Col>
                <Image className="detail-img mb-3" src={src} rounded />
            </Col>
        </Row>
        <Row className="mt-5"dangerouslySetInnerHTML={{ __html: data.content.rendered }}>
        </Row>
    </Container>
    )
}
