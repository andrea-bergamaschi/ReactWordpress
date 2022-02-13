import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '../containers/Context';

export default function MyHeader() {
    
    const websiteUrl = 'https://reactwordpress.000webhostapp.com';

    const [menus, setMenus] = useState([]);
    const [context, setContext] = useContext(Context);

    useEffect(() => {
        const APImenu = `${websiteUrl}/wp-json/wp-api-menus/v2/menus/6`;
        axios.get(APImenu)
            .then(response => {
                setMenus(response.data.items)
            }
            );
    }, [])


    const logout = () => {
        setContext(prev => ({ ...prev, loggedUser: {}, isLogged: false }));
    }

    return (
        <header>
            <Navbar expand="xl" className="py-2 shadow-sm fixed-top bg-white">
                <Container>
                    <Link className="navbar-brand fw-light fs-2" to="/">
                        React-Wp
                    </Link>
                    <Navbar.Toggle className="border-0" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="ms-3-lg">
                        <Nav className="me-auto text-uppercase">
                            {menus.map((el, index) => <Link key={index} className="nav-link px-3-lg" to={`${el.url.slice(websiteUrl.length)}`}>{el.title}</Link>)}
                        </Nav>

                        {context.isLogged
                            ? <div className="px-1">
                                <NavDropdown title={context.loggedUser.user.user_email} id="basic-nav-dropdown">
                                    <Link className="dropdown-item" to="/info">My info</Link>
                                    <Link className="text-uppercase btn fw-bold text-danger dropdown-item" to="/" onClick={logout}>
                                        Logout
                                    </Link>
                                </NavDropdown>
                            </div>
                            : <Link className="text-uppercase fw-bold px-5 btn btn-primary" to="/login">
                                Login
                            </Link>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="my-4 py-3"></Container>
        </header>
    )
}
