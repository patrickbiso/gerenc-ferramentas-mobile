import axios from 'axios';

const API_BASE = "http://192.168.1.111/api/ferramentas";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
});

export default api;
