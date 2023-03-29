import React from 'react';
import { useSelector } from 'react-redux'
import ThemeSwitcher from './ThemeSwitcher';
import { Link } from 'react-router-dom';
const HeaderComponent = () => {

    const theme = useSelector((state) => state.theme.value)
    
    return (
        <div>
            <nav className={['navbar', 'sticky-top', 'navbar-expand-lg', `border-bottom-${theme}`, `navbar-${theme}`, `bg-${theme}`].join(' ')}>
                <Link className="navbar-brand" to="/">Balance Crypto</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <ThemeSwitcher />
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <div className="d-flex">
                    <ThemeSwitcher />
                </div>
            
                </div>
            </nav>
        </div>
    );
}

export default HeaderComponent;
