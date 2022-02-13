import React, { useEffect, useState} from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments';

export default function Post({ data }) {

    let [categories, setCategories] = useState([]);
    let [tags, setTags] = useState([]);

    const websiteUrl = 'https://reactwordpress.000webhostapp.com';

    /*Fetching categories of the post*/
    useEffect(() => {
        data.categories.forEach(el => {
            axios.get(`${websiteUrl}/wp-json/wp/v2/categories/${el}`)
                .then(res => setCategories(prev => [...prev, res.data]))
        });
    }, [])

    /*Formatting date of the post*/
    const date = new Date(data.date_gmt);
    const formatter = new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: '2-digit' });

    /*Fetching tags of the post*/
    useEffect(() => {
        data.tags.forEach(el => {
            axios.get(`${websiteUrl}/wp-json/wp/v2/tags/${el}`)
                .then(res => setTags(prev => [...prev, res.data]))
        });
    }, [])
    
    return (
        <>
            <Container>
                <Row>
                    <h1 className="mt-3 fw-light">{data.title.rendered}</h1>
                </Row>
                <div className="mb-3">
                    <Row>
                        <Col xs="auto">
                            Published: <span className="date">{formatter.format(date)}</span>
                        </Col>

                        <Col xs="auto">
                            Categories:
                            {categories.map((el, index) => <Link key={index} to={`${el.link.slice(websiteUrl.length)}`} className="category">{el.name}</Link>)}
                        </Col>

                        <Col xs="auto">
                            Tags:
                            {tags.map((el, index) => <Link key={index} to={`${el.link.slice(websiteUrl.length)}`} className="tag">{el.name}</Link>)}
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col>
                        <Image className="detail-img mb-3" src={data.featured_media_src_url} rounded />
                    </Col>
                </Row>
                <Row className="mt-5" dangerouslySetInnerHTML={{ __html: data.content.rendered }}>
                </Row>
            </Container>
            <Container>
                <h3 className="mt-3 ms-2 fw-light fs-1">Comments</h3>
                <Comments postId={data.id}></Comments>
            </Container>
        </>
    )
}
