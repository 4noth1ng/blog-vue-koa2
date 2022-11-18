import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css"

const requests = axios.create({
    timeout: 3000,
});




requests.interceptors.request.use((config) => {
    nprogress.start();
    const token = localStorage.getItem('token')
    config.headers.common['Authorization'] = 'Bearer '+token
    if (config.method === 'get') {
        //  给data赋值以绕过if判断
        config.data = true
    }
    return config
})
requests.interceptors.response.use((res) => {
    nprogress.done();
    return res.data
}, (error) => {
    if (error.message === 'Request failed with status code 401') {
        localStorage.removeItem('token')
        location.reload()
    }
    
    return Promise.reject(new Error('error'))
})


export default requests;