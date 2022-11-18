import axios from "axios";


const requests = axios.create({
    timeout: 5000,
});




requests.interceptors.request.use((config) => {
    if (config.method === 'get') {
        //  给data赋值以绕过if判断
        config.data = true
    }
    return config
})
requests.interceptors.response.use((res) => {
    return res.data
}, (error) => {
    return Promise.reject(new Error('error'))
})


export default requests;