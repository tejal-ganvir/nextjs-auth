import axios from 'axios';
import { base_url, token } from '../constants';

const instance = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json'
    },
});

instance.interceptors.request.use(function (config) {
    const token = token;
    config.headers.Authorization =  token ? `${token}` : '';
    return config;
});


export default instance;
