import React from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";


const LinkListComponent = () => {

    const theme = useSelector((state) => state.theme.value)
    const navigate = useNavigate();
    return (
        <div>
            <nav className={['container', `border-bottom-${theme}`, `bg-${theme}`, 'pt-2', 'pb-2'].join(' ')}>
                <button className={`btn bg-success link-light`} type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" onClick={() => navigate('/') }>
                    Crypto
                </button>
                <button className={`btn bg-success link-light ms-1`} type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" onClick={() => navigate('/fiis') }>
                    Fiis
                </button>
            </nav>
        </div>
    );
}

export default LinkListComponent;
