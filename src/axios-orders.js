import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-xburger.firebaseio.com/'
});