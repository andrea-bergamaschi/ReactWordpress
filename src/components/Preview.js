import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Preview({ data }) {

    let text = data.excerpt.rendered;
    //eslint-disable-next-line
    text = text.slice(0, text.indexOf('<a class=\"more-link\"') - 1);
    let parsedText = new DOMParser().parseFromString(text, 'text/html');
    text = parsedText.body.textContent;

 

    const websiteUrl = 'https://reactwordpress.000webhostapp.com';

    let [categories, setCategories] = useState([]);
    let [tags, setTags] = useState([]);

    /*Fetching categories of the post*/
    useEffect(() => {
        data.categories.forEach(el => {
            axios.get(`${websiteUrl}/wp-json/wp/v2/categories/${el}`)
                .then(res => setCategories(prev => [...prev, res.data]))
        });
    }, [])

    /*Formatting date of the post*/
    let date = new Date(data.date_gmt);
    let formatter = new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: '2-digit' });

    /*Fetching tags of the post*/
    useEffect(() => {
        data.tags.forEach(el => {
            axios.get(`${websiteUrl}/wp-json/wp/v2/tags/${el}`)
                .then(res => setTags(prev => [...prev, res.data]))
        });
    }, [])

    return (
        <Container className="preview">
            <Row>
                <Col className="d-flex align-items-center">
                    <Link to={`${data.link.slice(websiteUrl.length)}`}>
                        <Image src={data.featured_media_src_url} rounded />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className="preview-title-container d-flex align-items-center">
                    <Link to={`${data.link.slice(websiteUrl.length)}`}>
                        <h4 className="mt-3 ms-1">{data.title.rendered}</h4>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="preview-text text-break ms-1">{text}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`${data.link.slice(websiteUrl.length)}`} className="violet show-more text-uppercase fw-bold text-decoration-none">Read More</Link>
                </Col>
            </Row>
            <div className="mt-2">
                <Row>
                    <Col>
                        Published: <span className="date">{formatter.format(date)}</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Categories:
                        {categories.map((el, index) => <Link key={index} to={`${el.link.slice(websiteUrl.length)}`} className="category">{el.name}</Link>)}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Tags:
                        {tags.map((el, index) => <Link key={index} to={`${el.link.slice(websiteUrl.length)}`} className="tag">{el.name}</Link>)}
                    </Col>
                </Row>
            </div>
        </Container >
    )
}
