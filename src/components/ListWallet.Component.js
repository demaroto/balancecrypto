import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { usDollar, usDollarValue } from '../utils/usCurrency';
import { changeCryptos } from '../redux/actions/cryptoSlice';
import { Trash3 } from 'react-bootstrap-icons';
import { changeTotal } from '../redux/actions/walletSlice';
import AnunciosGoogleComponent from './AnunciosGoogle.Component';

const ListWalletComponent = () => {

    const cryptos = useSelector((state) => state.cryptos.value)
    const theme = useSelector((state) => state.theme.value)
    const dispatch = useDispatch()
    const [cryptocurrencies, setCryptoCurrencies] = useState([])
    const [balances, setBalances] = useState([])

    const getBalances = () => {
        const wallet = localStorage.getItem('following')
        if (wallet && cryptos.length > 0) {
            const walletParse = JSON.parse(wallet)
            
            const values = walletParse.map((obj, index) => {
                const prices = cryptos.filter((price) => price.id === obj.coin)
                return {...obj, ...prices[0]}
            })

            setBalances(values.map((value) => {
                return {
                    name: value.name, value: value.balance, price: value.current_price, balance: (value.balance * value.current_price), symbol: value.symbol, image: value.image, id: value.id}
            }))
           
        }else{

            setBalances([])
        }
    }

   
    const updateTotal = () => {
        const wallet = localStorage.getItem('following')
        if (wallet) {
            const walletParse = JSON.parse(wallet)
            
            const values = walletParse.map((obj, index) => {
                const prices = cryptocurrencies.filter((price) => price.id === obj.coin)
                return {...obj, ...prices[0]}
            })

            const t = values.reduce((acc, value) => acc + (value.balance * value.current_price), 0)
            return t
        }else{

            return 0
        }
    }
    const deleteCoin = (key) => {
        
        const wallet = localStorage.getItem('following')
        if (wallet) {
            const walletParse = JSON.parse(wallet)
            
            const values = walletParse.filter((value, index) => index !== key)
            console.log(walletParse)
            localStorage.setItem('following', JSON.stringify(values))
            setBalances(values)
            getBalances()
            dispatch(changeTotal(updateTotal()))
           
        }
    } 
    useEffect(() => {
       
        setCryptoCurrencies(cryptos)
        getBalances()
        
    }, [cryptos]);
    
    useEffect(() => {
        
        dispatch(changeCryptos(JSON.parse(localStorage.getItem('coins'))))
        setCryptoCurrencies(cryptos)
        getBalances()
        
    }, []);




    return (
        <div className='mt-3'>
            <table className={`table table-${theme} table-striped table-bordered table-responsive`}>
                <caption>{balances.length > 1 ? `${balances.length} Cryptocurrencies` : `${balances.length} Cryptocurrency`}</caption>
                <thead>
                    <tr>
                        <th colSpan={4} className={`text-center`}>Wallet</th>
                    </tr>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Crypto</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Current Price</th>
                    <th scope="col">Value in USD</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {balances.map((balance, key) => {
                        return <tr key={key}>
                            <td>{key + 1}</td>
                            <td><img alt="crypto" width="40px" height="40px" className='rounded-circle' src={balance.image} />  {balance.name}</td>
                            <td>{balance.value}</td>
                            <td>{usDollarValue.format(Number.parseFloat(balance.price).toFixed(15))}</td>
                            <td>{usDollar.format(balance.balance)}</td>
                            <td><button className='btn btn-outline-danger' onClick={() => deleteCoin(key)}><Trash3 /></button></td>
                        </tr>
                    })}
                </tbody>
            </table>
            <AnunciosGoogleComponent />
        </div>
    );
}

export default ListWalletComponent;
