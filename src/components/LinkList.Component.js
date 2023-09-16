import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import ThemeSwitcher from './ThemeSwitcher';


const LinkListComponent = () => {

    const theme = useSelector((state) => state.theme.value)
   
    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-light border-bottom-${theme} bg-${theme}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img width="30px" className='ms-3' src='/logo_balance_crypto.png' alt="logo"/></Link>
                    <button className="navbar-toggler btn bg-success text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        
                        <li className="nav-item dropdown">
                            <Link className={`btn bg-success link-light nav-link dropdown-toggle text-white`} id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Calculadoras
                            </Link>
                            <ul className={"dropdown-menu bg-success w-100"} aria-labelledby="navbarDropdownMenuLink">
                                <li className='text-center'><Link to={`/token`} className='btn text-white w-100'>Crypto</Link></li>
                                <li className='text-center'><Link to={`/fiis`} className='btn text-white w-100'>Fundo Imobiliário</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown ms-sm-0 ms-lg-1 mt-1 mt-lg-0">
                            <Link className={`btn bg-success link-light nav-link dropdown-toggle text-white`} id="navbarDropdownMenuLink2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Geradores
                            </Link>
                            <ul className={"dropdown-menu bg-success"} aria-labelledby="navbarDropdownMenuLink2">
                                <li className='text-center'><Link to={`/lotofacil`} className='btn text-white w-100'>Lotofácil</Link></li>
                            </ul>
                        </li>
                        <li><ThemeSwitcher /></li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default LinkListComponent;
