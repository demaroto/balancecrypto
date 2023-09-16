import React from 'react';
import { Link } from 'react-router-dom';
import { CurrencyBitcoin, Instagram, Linkedin, Twitter } from 'react-bootstrap-icons';

const FooterComponent = () => {


    return (
        <>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top border-success">
            <div className="col-md-4 d-flex align-items-center">
            <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                <CurrencyBitcoin />
            </a>
            <span className="text-muted">© {new Date().getFullYear()} Wildemar Barbosa</span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
                <Link className="text-muted" to={'https://www.instagram.com/wildemar.barbosa'} target='blank'>
                    <Instagram />
                </Link>
            </li>
            <li className="ms-3">
                <Link className="text-muted" to={'https://twitter.com'} target='blank'>
                    <Twitter />
                </Link>
            </li>
            <li className="ms-3">
                <Link className="text-muted" to={'https://www.linkedin.com/in/wildemar-barbosa/'} target='blank'>
                    <Linkedin />
                </Link>
            </li>
            
            </ul>
        </footer>
        </>
    );
}

export default FooterComponent;
