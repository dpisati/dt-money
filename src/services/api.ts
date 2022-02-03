import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://dp-dt-money.vercel.app/api',
});
