import axios from "axios";


const fetch = axios.create({
    baseURL: 'https://express-js-on-vercel-mu-orpin.vercel.app/',
    timeout: 50000,
    headers: { 'content-type': 'application/json' }
});


// Add a request interceptor
fetch.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
},


);

export default fetch;