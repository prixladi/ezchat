import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const client = axios.create({ baseURL: url });

export default client;
