import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { usDollar, usDollarValue } from '../utils/usCurrency';
import { changeCryptos } from '../redux/actions/cryptoSlice';
import { CurrencyBitcoin } from 'react-bootstrap-icons';
import AnunciosGoogleComponent from './AnunciosGoogle.Component';
import { tokens } from '../utils/tokens';
import { getPriceCoins } from '../services/coingecko';
import {Animated} from "react-animated-css";
import './styles.css';
const ListWalletComponent = () => {

    const cryptos = useSelector((state) => state.cryptos.value)
    const theme = useSelector((state) => state.theme.value)
    const dispatch = useDispatch()
    const [balances, setBalances] = useState([])

    const validateTimeUpdate = () => {
       
        if (localStorage.getItem("time_update") === null) {
                 localStorage.setItem("time_update", (new Date()).toString())
                 releaseStorageCoin()
             
         }else{
             const dateStorage = new Date(localStorage.getItem("time_update"));
             const dateNow = new Date();
             const diffTime = Math.abs(dateNow - dateStorage) / 60000;
             
             //Time para atualização
             if (diffTime > 5) {
                 
                 localStorage.setItem("time_update", (new Date()).toString())
                 releaseStorageCoin()
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
                prices.then(c => {
                    const newPrices = parseFollow.map(f => {
                        let priceCoinGecko = c.filter(coinGecko => f.id === coinGecko.id)
                        if (f.id === priceCoinGecko[0].id){
                            let priceUpdated = f.current_price !== priceCoinGecko[0].current_price
                            return {balance: f.balance, coin: f.coin, current_price: priceCoinGecko[0].current_price, id: f.id, image: f.image, name: f.name, updated: priceUpdated}
                        }
                        return false
                    })
                    
                    if (newPrices.length > 0) {
                        localStorage.setItem('following', JSON.stringify(newPrices))
                        getBalances()
                    }
                }) 
            }  
        }
       
        
    }

    const selectCoin = (id) => {
        
        const page = tokens.filter(token => token.id === id)
        if (page.length > 0) {
            window.location.href = `/token/${page[0].symbol}`
        }
    }

    const getBalances = () => {
        const wallet = localStorage.getItem('following')
        if (wallet) {
            const walletParse = JSON.parse(wallet)
            
            setBalances(walletParse.map((value) => {
                return {
                    name: value.name, value: value.balance, price: value.current_price, balance: (value.balance * value.current_price), id: value.coin}
            }))
           
        }else{

            setBalances([])
        }
    }

    
    useEffect(() => {
       
        
        getBalances()
        
    }, [cryptos]);
    
    useEffect(() => {
        
        dispatch(changeCryptos(JSON.parse(localStorage.getItem('coins'))))
        
        getBalances()
        
        const interval = setInterval(() => {
            
            validateTimeUpdate()
            
          }, 5000);
      
          return () => clearInterval(interval);
        
    }, []);




    return (
        <div className='mt-3'>
            <table className={`table table-${theme} table-striped table-bordered table-responsive table-hover`}>
                <caption>{balances.length > 1 ? `${balances.length} Cryptocurrencies` : `${balances.length} Cryptocurrency`}</caption>
                <thead>
                    <tr>
                        <th colSpan={6} className={`text-center`}>Wallet</th>
                    </tr>
                    <tr>
                    <th scope="col" className='text-center'>Crypto</th>
                    <th scope="col" className='text-center'>Balance</th>
                    <th scope="col" className='text-center'>Price</th>
                    <th scope="col" className='text-center'>USD</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.map((balance, key) => {
                        return <tr key={key} className='text-center align-middle' role="button" onClick={() => selectCoin(balance.id)}>
                                
                            <td><CurrencyBitcoin />  {balance.name}</td>
                            <td>{balance.value}</td>
                            <td>
                            <Animated animationIn="pulse" animationOut="pulse" isVisible={true}>
                                {usDollarValue.format(Number.parseFloat(balance.price).toFixed(15))}
                            </Animated>
                            </td>
                            
                            <td>{usDollar.format(balance.balance)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <AnunciosGoogleComponent />
        </div>
    );
}

export default ListWalletComponent;
