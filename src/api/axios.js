/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

// 环境切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'development'
} else if (processs.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'debug'
} else if (processs.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'production'
}

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        //const token = store.state.token
        //token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    response => {    
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    //服务状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                //其他错误待补充，直接抛出错误提示

            }
            return Promise.reject(error.response);
        }
    }
);
//封装数据返回失败提示函数
function errorState(response){
    //隐藏loading
    //如果http状态码正常，则直接返回数据
    if(response && (response.status === 200 || response.status === 304 || response.status === 400)){
        // 如果不需要除了data之外的数据，可以直接 return response.data
        return response
    } else {
        console.log('数据获取错误')
    }
}

//封装数据返回成功提示函数 
function successState(res){
    // 隐藏loading
    // 统一判断后端返回的错误码(错误码与后台协商而定)
    // if (res.data.code === '000000') {
    //     alert('success')
    //     return res
    // }
    return res
}
/**
 * 构造函数
 * 封装请求
 *  @param {String} url [请求的url地址]
 *  @param {Object} params [请求时携带的参数]
 */
function apiAxios(method, url, params) {
    let httpDeafult = {
        method: method,
        url: url,
        // `params` 是即将与请求一起发送的 URL 参数
        // `data` 是作为请求主体被发送的数据
        params: method === 'GET' || method === 'DELETE' ? params : null,
        data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
        timeout: 10000
    }

    //注意**Promise**使用(Promise首字母大写)
    return new Promise((resolve, reject) => {
        axios(httpDeafult)
            //此处的.then属于axios
            .then((res) => {
                successState(res)
                resolve(res)
            })
            .catch((response) => {
                errorState(response)
                reject(response)
            })
    })
}


// 输出函数getAxios、postAxios、putAxios、delectAxios，供其他文件调用-----------------------------
// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
export default {
    install: function (Vue) {
        Vue.prototype.$get = (url, params) => apiAxios('GET', url, params)
        Vue.prototype.$post = (url, params) => apiAxios('POST', url, params)
        Vue.prototype.$put = (url, params) => apiAxios('PUT', url, params)
        Vue.prototype.$delete = (url, params) => apiAxios('DELETE', url, params)
    }
}