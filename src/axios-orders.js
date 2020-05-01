import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-8f493.firebaseio.com/'
});

export default instance;