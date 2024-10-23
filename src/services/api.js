import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this with your backend URL
});

export default api;