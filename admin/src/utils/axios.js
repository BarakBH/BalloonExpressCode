import axios from "axios";
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.baseURL = 'http://localhost:4000/';
export default axios;