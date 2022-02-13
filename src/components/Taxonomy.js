import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Preview from './Preview';
import { Container, Row, Col } from 'react-bootstrap';


export default function Taxonomy({ url, type }) {

    const websiteUrl = 'https://reactwordpress.000webhostapp.com';

    const [data, setData] = useState([]);
    const [title,setTitle] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data);
            })
    }, [url])

    let idToCall = url.charAt(url.length-1);
    for(let i = 0; i <= url.length; i++) {
        if(!isNaN(url.charAt(url.length-(i +2)))) {
            idToCall = url.charAt(url.length-(i + 2)) + url.charAt(url.length-(i +1))
        } else {
            break;
        }
    }

    useEffect(() => {
        if (type === 'category') {
                axios.get(`${websiteUrl}/wp-json/wp/v2/categories/${idToCall}`)
                    .then(res => setTitle(res.data.name))
        } else {
            axios.get(`${websiteUrl}/wp-json/wp/v2/tags/${idToCall}`)
                .then(res => setTitle(res.data.name))
        }
    }, [url])

    return (
        <Container>
            <Row>
                {<h1 className="fs-2 fw-light py-4">{type === 'category' ? 'Category: ' : 'Tag: '}{title}</h1>}
                {
                    data.map((el, index) =>
                        <Col key={index} xs={12} sm={6} lg={4}>
                            <Preview data={el}></Preview>
                        </Col>
                    )
                }
            </Row>

        </Container>
    )
}
