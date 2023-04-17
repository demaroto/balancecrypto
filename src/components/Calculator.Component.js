import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { PlusCircleFill, PlusCircleDotted, CurrencyBitcoin, CashStack } from 'react-bootstrap-icons';
import { changeCoin } from '../redux/actions/coinSlice';
import { usDollar, usDollarValue } from '../utils/usCurrency';
import { changeCryptos } from '../redux/actions/cryptoSlice';

const CalculatorComponent = () => {

    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.value)
    const coin = useSelector((state) => state.coin.value)
    const cryptos = useSelector((state) => state.cryptos.value)
    const [meBalance, setMeBalance] = useState(0)
    const [cryptoName, setCryptoName] = useState('');
    const [cryptosFollow, setCryptosFollow] = useState([])

    const [crypto, setCrypto] = useState(0)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    const balanceUsd = () => Number.parseFloat(Number.isFinite(Number.parseFloat(meBalance * crypto)) ? meBalance * crypto : 0).toFixed(2);
    const [balances, setBalances] = useState([]);
   
    const countPlaces = (num) => {
        var text = num.toString();
        var index = text.indexOf(".");
        return index === -1 ? 0 : (text.length - index - 1);
    }

   

    const followCrypto = () => {
        const followStorage = localStorage.getItem('following')
        if (followStorage === null && meBalance > 0 && coin !== null) {
            console.log([{ balance: meBalance, coin: crypto, name: cryptoName}])
            console.log('create following')
            localStorage.setItem('following', JSON.stringify([{ balance: meBalance, coin: coin, name: cryptoName, current_price: crypto}]));
        }
        if (followStorage !== null) {
            console.log('update following')
            const currentFollow = JSON.parse(followStorage);
            currentFollow.push({ balance: meBalance, coin: crypto, name: cryptoName, current_price: crypto })
            localStorage.setItem('following', JSON.stringify(currentFollow))
        }

        dispatch(changeCryptos(localStorage.getItem('following')))

        loadFollowCrypto()
    }

    const loadFollowCrypto = () => {
        const followStorage = localStorage.getItem('following')
        if (followStorage !== null) {
            const currentFollow = JSON.parse(followStorage)
            setCryptosFollow(currentFollow.map(crypto => crypto.coin));
        }
    }

    const getNewPrice = (oldPrice, base = 5) => oldPrice * base;
    const generatePrices = (price) => {
        const values  = [];
        const value = Number.isFinite(Number.parseFloat(price)) ? price: 0
        values[0] = getNewPrice(value)
        values[1] = getNewPrice(values[0])
        values[2] = getNewPrice(values[1])
        values[3] = getNewPrice(values[2])
        values[4] = getNewPrice(values[3])
        values[5] = getNewPrice(values[4])
        values[6] = getNewPrice(values[5])
        values[7] = getNewPrice(values[6])
        values[8] = getNewPrice(values[7])
        values[9] = getNewPrice(values[8])
        return values;
    }
    

    useEffect(() => {
  
        const newValues = generatePrices(crypto).map(price => {return {value: meBalance * price, price: price, digits: countPlaces(crypto)}})
        setBalances(newValues);
       
        dispatch(changeCoin(cryptoName || localStorage.getItem('coin')))
        loadFollowCrypto()
       

    }, [crypto, meBalance, coin, cryptos]);
    return (
        <div className='mt-3'> 
        <div className={`input-group mb-3 bg-${theme}`}>
                <div className={`input-group-prepend`}>
                    <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderRight:"0", marginRight:"-5px"}}><CurrencyBitcoin className='m-1' /> Crypto Name</span>
                </div>
                <input id="cryptoname" className="form-control" type="text" placeholder='Crypto Name' value={cryptoName} onChange={(e) => setCryptoName(e.target.value)}/> 
            </div>      
            <div className={`input-group mb-3 bg-${theme}`}>
                <div className={`input-group-prepend`}>
                    <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderRight:"0", marginRight:"-5px"}}><CurrencyBitcoin className='m-1'/> Crypto Price</span>
                </div>
                <input id="crypto" readOnly={cryptoName.length > 0 ? false : true} className="form-control" type="text" placeholder='0.025' value={crypto} onChange={(e) => setCrypto(Number.isNaN(e.target.value.replaceAll(",", "")) ? 0 : e.target.value.replaceAll(",", ""))}/>
                
            </div>        
            <div className={`input-group mb-3 bg-${theme}`}>
                <div className={`input-group-prepend`}>
                    <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderRight:"0", marginRight:"-5px"}}><CashStack className='m-1' /> My Balance</span>
                </div>
                <input id="me" readOnly={cryptoName.length > 0 ? false : true} className="form-control" type="text" placeholder='0.025' value={meBalance} onChange={(e) => setMeBalance(e.target.value.replaceAll(",", ""))}/> 
            </div>
            
            

            <div className="d-flex container rounded m-2" style={{backgroundColor: "#3be588"}}>
                <div className='d-flex'>
                    <h5 className={`card-header h4 text-dark`}><span className={`badge text-dark`}>Current Balance: </span>{usDollar.format(balanceUsd())}</h5>   
                </div>
                <div className='d-flex align-items-center btn-group'>
                    <button className={`btn bg-primary text-light`} onClick={() => followCrypto()}>{cryptosFollow.filter((c) => c === coin).length > 0 ? <PlusCircleFill /> : <PlusCircleDotted />} Add</button>
                </div>
                
            </div>
            <table className={`table table-${theme} table-striped table-bordered table-responsive`}>
                <thead>
                    <tr>
                        <th colSpan={3} className={`text-center`}>Balance Projection by Price</th>
                    </tr>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Price Projection</th>
                    <th scope="col">Balance Projection ($)</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {balances.map((balance, key) => {
                        return <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{usDollarValue.format(Number.parseFloat(balance.price).toFixed(15))}</td>
                            <td>{usDollar.format(Number.isFinite(Number.parseFloat(balance.value)) ? Number.parseFloat(balance.value).toFixed(2) : Number.parseFloat(0).toFixed(2))}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CalculatorComponent;
