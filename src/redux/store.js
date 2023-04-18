import { configureStore   } from '@reduxjs/toolkit'
import themeReducer  from './actions/themeSlice'
import coinReducer from './actions/coinSlice'
import cryptoReducer from './actions/cryptoSlice'
import walletReducer from './actions/walletSlice'
import twitterReducer from './actions/twitterSlice'

export default configureStore  ({
  reducer: {
    theme: themeReducer,
    coin: coinReducer,
    cryptos: cryptoReducer,
    wallet: walletReducer,
    twitter: twitterReducer
  },
})