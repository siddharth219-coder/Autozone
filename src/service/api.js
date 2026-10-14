import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:7000/',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default axiosClient;
