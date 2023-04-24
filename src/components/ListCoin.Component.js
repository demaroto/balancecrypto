import React, {useEffect, useState} from 'react';

import AnunciosGoogleFeedComponent from './AnunciosGoogleFeed.Component';

import { Link} from 'react-router-dom';
import { tokens } from '../utils/tokens'
import * as Scroll from 'react-scroll';

const ListCoinComponent = () => {
    const [coins, setCoins] = useState([])
    const [selectedCoin, setSelectedCoin] = useState('')
   
    const scroll = Scroll.animateScroll;

    const scrollTop = () => {
        scroll.scrollToTop();
    }

    useEffect(() => {
        setCoins(tokens)
    }, []);

    const findCoins = (coin) => {
        setSelectedCoin(coin)
        if (coin.length > 0) {
            console.log(coins)
            setCoins(tokens.filter(token => token.name.toLowerCase().indexOf(coin) > -1))
        }else{
            setCoins(tokens)
        }
    }
    return (
        <div className={`border border-success rounded d-flex flex-column justify-content-center`}>
           
            <input className='form-control m-2' style={{width: '95%'}} type='text' placeholder='Search Crypto' onChange={(e) => findCoins(e.target.value)} value={selectedCoin} />
            
            <div className="btn-group-vertical justify-content-start overflow-auto w-100" style={{height:"410px"}}>
                
                {coins ? coins.map((token, key) => { 
                    return (
                        <div className='w-100'>
                            <Link key={key} to={`/token/${token.symbol}`} className={`btn btn-outline-success fs-6 d-flex justify-content-between align-items-center w-100`} onClick={() => scrollTop(token.symbol)}>{token.name}</Link>
                            {key % 30 === 0 ? <AnunciosGoogleFeedComponent /> : ''}
                        </div>
                    )
                }) : ''}
            </div>
            
        </div>
    );
}

export default ListCoinComponent;
