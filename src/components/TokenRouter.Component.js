import React from 'react';
import { Link, redirect, useParams } from 'react-router-dom';
import { changeCoin } from '../redux/actions/coinSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { tokens } from '../utils/tokens';
import { CurrencyBitcoin, Instagram, Twitter } from 'react-bootstrap-icons';
import * as Scroll from 'react-scroll';
const TokenRouterComponent = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const scroll = Scroll.animateScroll;

    const scrollTop = () => {
        scroll.scrollToTop();
    }

    const validate = () => {
        console.log(params)
        if (params.id !== undefined) {

            const isValidRoute = tokens.filter(t => t.symbol === params.id)
    
            if (isValidRoute.length > 0) {
              
                dispatch(changeCoin(isValidRoute[0].id))
                
            }else{
                redirect('/')
            }
        }
    }

    useEffect(() => {
        validate()
    }, [params]);
    return (
        <>
        <div className='container'>
            {tokens.map(token => <Link to={`/token/${token.symbol}`} className='btn btn-outline-success m-1 btn-sm' onClick={() => scrollTop(token.symbol)}>{token.name}</Link>)}
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top border-success">
            <div className="col-md-4 d-flex align-items-center">
            <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                <CurrencyBitcoin />
            </a>
            <span className="text-muted">© {new Date().getFullYear()} Will S.I</span>
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
            
            </ul>
        </footer>
        </>
    );
}

export default TokenRouterComponent;
