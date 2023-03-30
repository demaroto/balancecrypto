import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { usDollar } from '../utils/usCurrency';
import { changeCryptos } from '../redux/actions/cryptoSlice';
import { useNavigate } from 'react-router-dom';
import { House } from 'react-bootstrap-icons';

const WalletComponent = () => {

    const cryptos = useSelector((state) => state.cryptos.value)
    const walletTotal = useSelector((state) => state.wallet.total)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [cryptocurrencies, setCryptoCurrencies] = useState([])
    const [total, setTotal] = useState(0)

    const getBalance = () => {
        const wallet = localStorage.getItem('following')
        if (wallet) {
            const walletParse = JSON.parse(wallet)
            
            const values = walletParse.map((obj, index) => {
                const prices = cryptocurrencies.filter((price) => price.id === obj.coin)
                return {...obj, ...prices[0]}
            })

            const t = values.reduce((acc, value) => acc + (value.balance * value.current_price), 0)
            setTotal(t)
        }else{

            setTotal(0)
        }
    }

    

    useEffect(() => {
        
        setCryptoCurrencies(cryptos)
        getBalance()
        
        
    }, [cryptos, walletTotal, total]);
    
    useEffect(() => {
        
        dispatch(changeCryptos(JSON.parse(localStorage.getItem('coins'))))
        setCryptoCurrencies(JSON.parse(localStorage.getItem('coins')))

    }, []);




    return (
        <div className='mt-3'>
            <div className={`card`} style={{backgroundColor: "rgb(59, 229, 136)"}}>
                <div className={`card-body`}>
                   
                    <h5 className={`card-header h4 text-dark`}><span className={`badge text-dark`}>Total Balance: </span>{usDollar.format(total)}</h5>   
                    <div className='d-flex align-items-center btn-group'>
                        <button className={`btn bg-success text-light`} onClick={() => navigate('/')}><House /> Home</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WalletComponent;
