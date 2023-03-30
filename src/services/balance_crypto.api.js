import axios from "axios";
//Authorization Api
const Authorization = 'f7cd1238323468fe53c9af31df1b47dcce417bf7ea2c06713238e48803db64df';
axios.defaults.headers.post["Content-Type"] = "application/json"
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: false,
    headers: {
        'Accept': 'application/json', 
        'Authorization': Authorization,
    
    }
})


export default api;