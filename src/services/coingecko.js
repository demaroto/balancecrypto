import axios from "axios";

const ApiCoinGecko = axios.create({
    
    baseURL: 'https://api.coingecko.com/api/v3/',
    headers: {
        Accept: 'application/json',
    }
})

const SearchCoin = async (search) => {
    const result = await ApiCoinGecko.get(`search?query=${search}`)
    return result.data
}

const getInfoCoin = async (id) => {
    const result = await ApiCoinGecko.get(`coins/${id}?tickers=false&community_data=false`)
    return result.data
}

const getListCoin = async () => {
    const result = await ApiCoinGecko.get(`coins/list?include_platform=false`)
    return result.data
}

const getPriceCoins = async (list) => {
    if (list.length > 0){
        const result = await ApiCoinGecko.get(`coins/markets?vs_currency=usd&ids=${list.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
        return result.data
    }
}

export { SearchCoin, getInfoCoin, getListCoin, getPriceCoins };