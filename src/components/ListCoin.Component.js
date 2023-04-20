import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ApiBalance from '../services/balance_crypto.api';
import { changeCoin } from '../redux/actions/coinSlice';
import {changeCryptos} from '../redux/actions/cryptoSlice'
import { useNavigate } from 'react-router-dom';
import AnunciosGoogleFeedComponent from './AnunciosGoogleFeed.Component';
import { getPriceCoins } from '../services/coingecko';

const ListCoinComponent = () => {
    const [coins, setCoins] = useState([])
   
    const navigate = useNavigate()
    const theme = useSelector((state) => state.theme.value)
    const dispatch = useDispatch()
    const [selectedCoin, setSelectedCoin] = useState('')
    const themeText = theme === 'dark' ? 'light' : 'dark';
    const usDollarValue = Intl.NumberFormat("en-US", { maximumSignificantDigits: 4, style: "currency", currency: "USD", });

    const findCoins = (text) => {
        
        setSelectedCoin(text)
        if (String(text).length > 0 && coins !== null) {
            let value = String(text).toLowerCase();
            const result = coins.filter(c => c.name.toLowerCase().includes(value.toLowerCase()) || c.symbol.toLowerCase().includes(value.toLowerCase()));
            setCoins(result)
            
        }else{
            const coinStorage = localStorage.getItem('coins');
            setCoins(JSON.parse(coinStorage))
        }
    }

    const selectCoin = (coin) => {
        const pathname = window.location.pathname
        dispatch(changeCoin(coin))
        localStorage.setItem('coin', coin)
        dispatch(changeCryptos(JSON.parse(localStorage.getItem('coins'))))
        findCoins("")
        if (pathname !== '/') navigate('/')
    
    }

    const validateTimeUpdate = () => {
       
       if (localStorage.getItem("time_update") === null) {
                localStorage.setItem("time_update", (new Date()).toString())
            updatePrice()
            
        }else{
            const dateStorage = new Date(localStorage.getItem("time_update"));
            const dateNow = new Date();
            const diffTime = Math.abs(dateNow - dateStorage) / 60000;
           
            //Time para atualização
            if (diffTime > 1) {
               
                updatePrice()
            }

        }

    }

    const releaseStorageCoin = () => {

        const following = localStorage.getItem('following')
        if (following !== null) {
            const parseFollow = JSON.parse(following)
            const ids = parseFollow.map(coin => coin.id)
            if (ids.length > 0) {
                const prices = getPriceCoins(ids)
                console.log(prices)
            }  
        }
        /*
        ApiBalance.get('/coins').then((response) => { 
            
            dispatch(changeCryptos(response.data))
            setCoins(response.data);

            localStorage.setItem('coins', JSON.stringify(response.data));
        }).catch((error) => {
            console.log('Axios Error: ' + error.message);
        });
        */
        
    }

    const updatePrice = () => {
        releaseStorageCoin();
        dispatch(changeCryptos(JSON.parse(localStorage.getItem('coins'))))
        dispatch(changeCoin(selectedCoin))
        localStorage.setItem("time_update", (new Date()).toString())
        validateTimeUpdate()
        
    }
   
  

    useEffect(() => {
       
     
        releaseStorageCoin();
        const interval = setInterval(() => {
            
            //validateTimeUpdate()
          }, 5000);
      
          return () => clearInterval(interval);
            
    }, []);
    return (
        <div className={`border border-success rounded mt-3`}>
           
            
                <input className='form-control mt-2 mx-2' style={{width: '95%'}} type='text' placeholder='Search Crypto' onChange={(e) => findCoins(e.target.value)} value={selectedCoin} />
            
            <div className="btn-group-vertical justify-content-start overflow-auto w-100" style={{height:"410px"}}>
                
                {coins ? coins.map((coin, key) => { 
                    return (
                        <div className='w-100'>
                            <button key={key} className={`btn btn-outline-success text-${themeText} fs-6 d-flex justify-content-between align-items-center w-100`} onClick={() => selectCoin(coin.id)} style={{maxHeight:"50.05px"}}>
                                    <span><img src={coin.image} alt="coin" loading="lazy" className="rounded-circle" width="25px" height="25px"/> #{key+1} {coin.name.substring(0, 20)}{coin.name.length > 20 ? '...' : ''} <small style={{fontSize:"0.7rem"}}>({String(coin.symbol).toUpperCase()})</small></span>
                                    <span className={`badge bg-success badge-pill text-light`}>{usDollarValue.format(Number.parseFloat(coin.current_price).toFixed(15))}</span>
                            </button>
                            {key % 30 === 0 ? <AnunciosGoogleFeedComponent /> : ''}
                        </div>
                    )
                }) : ''}
            </div>
            
        </div>
    );
}

export default ListCoinComponent;
