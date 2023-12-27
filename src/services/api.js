import axios from 'axios';


const baseURL = 'https://api.escuelajs.co/api/v1';

const api = axios.create({
    baseURL,
});

export default api;
