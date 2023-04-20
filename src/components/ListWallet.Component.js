import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { usDollar, usDollarValue } from '../utils/usCurrency';
import { changeCryptos } from '../redux/actions/cryptoSlice';
import { CurrencyBitcoin } from 'react-bootstrap-icons';
import AnunciosGoogleComponent from './AnunciosGoogle.Component';
import { tokens } from '../utils/tokens';

const ListWalletComponent = () => {

    const cryptos = useSelector((state) => state.cryptos.value)
    const theme = useSelector((state) => state.theme.value)
    const dispatch = useDispatch()
    const [balances, setBalances] = useState([])

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
                            <td>{usDollarValue.format(Number.parseFloat(balance.price).toFixed(15))}</td>
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
