import axios from "axios";
//Authorization Api
const Authorization = 'f7cd1238323468fe53c9af31df1b47dcce417bf7ea2c06713238e48803db64df';


const ApiBalance = axios.create({
    
    baseURL: 'http://localhost:8000/api/',
    headers: {
        Authorization: Authorization,
        Accept: 'application/json',
        "Access-Control-Allow-Headers": "Content-Type"
    }
})

export default ApiBalance;