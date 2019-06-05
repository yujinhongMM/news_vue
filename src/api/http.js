import axios from 'axios'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.defaults.baseURL = ''
const fetch = (options) => {
    const {
        method = 'post',
        data,
        url
    } = options
    switch (method.toLowerCase()){
        case 'get':
            return axios.get(`${url}${options.data ? `?${qs.stringify(options.data)}` : ''}`)
        case 'post':
            return axios.post(url,data)
        default:
            return axios(options)
    }
}
// http异步请求
export default async function http (options) {
    return fetch(options)
    .then((response) => {
        return response
    }).catch((error) => {
        return error
    })
}