import axios from "axios";

const coingeckoApi = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {'Accept': 'application/json'}
})


export default coingeckoApi;