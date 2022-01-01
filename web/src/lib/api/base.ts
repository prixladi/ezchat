import config from '@lib/config';
import axios from 'axios';

const client = axios.create({ baseURL: config.apiUrl, withCredentials: true });

export default client;
