import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { usDollar } from '../utils/usCurrency';
import { changeCryptos } from '../redux/actions/cryptoSlice';

const WalletComponent = () => {

    const cryptos = useSelector((state) => state.cryptos.value)
    const walletTotal = useSelector((state) => state.wallet.total)
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)

    const getBalance = () => {
        const wallet = localStorage.getItem('following')
        if (wallet) {
            const walletParse = JSON.parse(wallet)
     
            const t = walletParse.reduce((acc, value) => acc + (value.balance * value.current_price), 0)
            setTotal(t)
        }else{

            setTotal(0)
        }
    }

    

    useEffect(() => {
        
       
        getBalance()
        
        
    }, [cryptos, walletTotal, total]);
    
    useEffect(() => {
        
        dispatch(changeCryptos(JSON.parse(localStorage.getItem('coins'))))


    }, []);




    return (
        <div className='mt-3'>
            <div className={`card`} style={{backgroundColor: "rgb(59, 229, 136)"}}>
                <div className={`card-body`}>
                   
                    <h5 className={`card-header h4 text-dark`}><span className={`badge text-dark`}>Total Balance: </span>{usDollar.format(total)}</h5>   
                </div>
            </div>
        </div>
    );
}

export default WalletComponent;
