import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Preview from './Preview';
import { Container, Row, Col } from 'react-bootstrap';
import { Context } from '../containers/Context';


export default function Home() {

    const websiteUrl = 'https://reactwordpress.000webhostapp.com';

    const [data, setData] = useState([]);
    const [context,] = useContext(Context);


    useEffect(() => {
        axios.get(`${websiteUrl}/wp-json/wp/v2/posts`)
            .then(res => {
                setData(res.data);
            })
    }, [])


    return (
        <>
            <Container>

                <Row>
                    {context.isLogged
                        ? <h3 className="fs-1 py-4">Welcome back, {context.loggedUser.user.display_name}! 👋</h3>
                        : null
                    }
                    <p className="fs-5 fw-light pt-3 text-underline"><u>
                        Click <b>Project info</b> on the menu to know more about this project!
                    </u></p>
                    <h1 className="fs-2 fw-light pb-4">Latest news in the dev world </h1>

                    {
                        data.map((el, index) =>
                            <Col key={index} xs={12} sm={6} lg={4}>
                                <Preview data={el}></Preview>
                            </Col>
                        )
                    }
                </Row>

            </Container>
        </>

    )
}
