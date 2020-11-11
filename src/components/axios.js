import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:7000/api' // EXPRESS API URL
});

export default instance;