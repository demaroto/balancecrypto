import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { PlusCircleFill, CurrencyBitcoin, CashStack, ArrowDownUp, Trash } from 'react-bootstrap-icons';
import { changeCoin } from '../redux/actions/coinSlice';
import { usDollar, usDollarValue } from '../utils/usCurrency';
import { changeCryptos } from '../redux/actions/cryptoSlice';
import Select2Component from './Select2Coins.Component';
import { getInfoCoin } from '../services/coingecko';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { changePage } from '../redux/actions/twitterSlice';

const CalculatorComponent = () => {

    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.value)
    const coin = useSelector((state) => state.coin.value)
    const cryptos = useSelector((state) => state.cryptos.value)
    const [meBalance, setMeBalance] = useState(null)
    const [cryptoName, setCryptoName] = useState('');
    const [image, setImage] = useState(null);
    const [idCoin, setIdCoin] = useState(null);
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

    const findPriceToken = (id) => {
    
        if (id){
            
            const result = getInfoCoin(id)
            result.then((info) => {
                if (info){
                    setCryptoName(info.name)
                    setCrypto(info.market_data.current_price.usd);
                    setImage(info.image.small)
                    if (info.links.twitter_screen_name) {
                        dispatch(changePage(info.links.twitter_screen_name))
                    }
    
                }
            })
        }
    }

   

    const followCrypto = () => {    
        const followStorage = localStorage.getItem('following')
        let coinCreated = cryptoName.toLowerCase().replaceAll(' ', '-').concat('-', meBalance)
        if (followStorage === null && meBalance > 0) {
            console.log([{ balance: meBalance, coin: crypto, name: cryptoName}])
            console.log('create following')
            localStorage.setItem('following', JSON.stringify([{ balance: meBalance, coin: coinCreated, name: cryptoName, current_price: crypto, image: image}]));
        }
        if (followStorage !== null) {
            console.log('update following')
            const currentFollow = JSON.parse(followStorage);
            const updatedFollow = idCoin === null ? currentFollow : currentFollow.filter(follow => follow.coin !== idCoin)
            updatedFollow.push({ balance: meBalance, coin: coinCreated, name: cryptoName, current_price: crypto, image: image })
            localStorage.setItem('following', JSON.stringify(updatedFollow))
        }
        setIdCoin(null)
        setCryptoName('')
        setMeBalance(null)
        setImage(null)
        setCrypto(0)

        dispatch(changeCryptos(localStorage.getItem('following')))

        loadFollowCrypto(null)
    }

    const deleteCrypto = () => {
        const followStorage = localStorage.getItem('following')
        if (followStorage !== null && idCoin !== null) {
            const currentFollow = JSON.parse(followStorage);
            const removeFollow = currentFollow.filter(follow => follow.coin !== idCoin)
            localStorage.setItem('following', JSON.stringify(removeFollow))
            setIdCoin(null)
            setCryptoName('')
            setImage(null)
            setMeBalance(null)
            setCrypto(0)
            dispatch(changeCryptos(localStorage.getItem('following')))
            loadFollowCrypto(null)
        }
    }

    const loadFollowCrypto = (coin) => {
        console.log(coin)
        const followStorage = localStorage.getItem('following')
        if (followStorage !== null) {
            const currentFollow = JSON.parse(followStorage)
           
            const currentCoin = currentFollow.filter(crypto => crypto.coin === coin)
            console.log(currentCoin)
            if (currentCoin.length > 0) {
                setCryptoName(currentCoin[0].name);
                setCrypto(currentCoin[0].current_price);
                setMeBalance(currentCoin[0].balance);
                setIdCoin(currentCoin[0].coin);
                setImage(currentCoin[0].image)
                dispatch(changeCoin(null))
            }
            setCryptosFollow(currentFollow.filter(crypto => crypto.coin === coin));
        }else{
            setCryptoName(null);
                setCrypto(0);
                setMeBalance(null);
                setIdCoin(null);
                setImage(null)
                dispatch(changeCoin(null))
        }
    }

    const getNewPrice = (oldPrice, base = 5) => oldPrice * base;
    const generatePrices = (price) => {
        const values  = [];
        const value = Number.isFinite(Number.parseFloat(price)) ? price: 0
        values[0] = getNewPrice(value,1)
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
       
        //dispatch(changeCoin(cryptoName || localStorage.getItem('coin')))
        if (coin !== null) {
            
            loadFollowCrypto(coin)
        }
       

    }, [crypto, meBalance, coin, cryptos]);
    return (
        <div className='mt-3'> 
        <div className={`input-group mb-3 bg-${theme}`}>
                <div className={`input-group-prepend w-100`}>
                    <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}>{image ? <img src={image} width={40} height={40} alt={`Logo ${cryptoName}`} className='m-1 rounded-circle'/> : <CurrencyBitcoin className='m-1' />} {cryptoName || 'Crypto Name'}</span>
                </div>
                <Select2Component handleChange={(value) => findPriceToken(value)}/>
            </div>      
                   
            <div className={`input-group mb-3 bg-${theme}`}>
                <div className={`input-group-prepend w-100`}>
                    <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}><CashStack className='m-1' /> My Balance</span>
                </div>
                <input id="me" readOnly={cryptoName.length > 0 ? false : true} className="form-control" step="0.000000000000001" min="0"  type="number" placeholder='0.025' value={meBalance} onChange={(e) => setMeBalance(e.target.value.replaceAll(",", ""))}/> 
            </div>
            
            

            <div className="d-flex container rounded m-2" style={{backgroundColor: "#3be588"}}>
                <div className='d-flex'>
                    <h5 className={`card-header h4 text-dark`}><span className={`badge text-dark`}>Current Balance: </span>{usDollar.format(balanceUsd())}</h5>   
                </div>
                <div className='d-flex align-items-center btn-group'>
                    
                        <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                            <Tooltip {...props}>
                                Save to Wallet
                            </Tooltip>
                            )}
                            placement="bottom"
                        ><button className={`btn bg-primary text-light`} onClick={() => followCrypto()}>{idCoin === null ? <PlusCircleFill /> : <ArrowDownUp />} </button>
                        </OverlayTrigger>

                        
                    
                    {idCoin !== null ? <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                            <Tooltip {...props}>
                                Remove from Wallet
                            </Tooltip>
                            )}
                            placement="bottom"
                        ><button className={`btn btn-danger text-light`} onClick={() => deleteCrypto()}>{<Trash />} </button>
                        </OverlayTrigger> : null }                    
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
                            <td>{usDollarValue.format(Number.parseFloat(balance.price).toFixed(15))} {key === 0 ? <span className="badge bg-warning text-dark">current</span> : ''}</td>
                            <td>{usDollar.format(Number.isFinite(Number.parseFloat(balance.value)) ? Number.parseFloat(balance.value).toFixed(2) : Number.parseFloat(0).toFixed(2))}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CalculatorComponent;
