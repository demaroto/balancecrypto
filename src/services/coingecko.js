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

export { SearchCoin, getInfoCoin, getListCoin };