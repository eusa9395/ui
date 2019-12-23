import axios from 'axios'
import sync_request from 'sync-request';

// axios 配置
axios.defaults.timeout = 50000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        //const token = localStorage.getItem('token');
        //console.log("token : " + token);
        // if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = `${token}`;
        // } else {
        //     config.headers.Authorization = `demo`;
        // }
        return config;
    },
    err => {
        this.$message.error(err);
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if(error.response) {
            switch (error.response.status) {
                case 401: {
                    // 返回 401 清除token信息并跳转到登录页面
                    window.location.href = process.env.API_LOGIN_URL;
                    break;
                }
                case 404: {
                    // 返回 404 清除token信息并跳转到登录页面
                    //store.commit(types.LOGOUT);
                    Vue.$message.error(error.response['statusText']);
                }
            }
        } else {
            console.warn(error['message']);
        }
        return Promise.reject(error);   // 返回接口返回的错误信息
    }
);

export function axios_get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(response => {
                //console.log("orinal response.data = " + JSON.stringify(response.data));
                //console.log("orinal response.data = " + response.data);
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export function axios_post(url, params) {
    //console.log("params = " + JSON.stringify(params));
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function axios_put(url, params) {
    //console.log("params = " + JSON.stringify(params));
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function axios_delete(url) {
    return new Promise((resolve, reject) => {
        axios.delete(url)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export default {
    get: function(url, params) {
        return axios_get(url, params);
    },

    post: function(url, params) {
        return axios_post(url, params);
    },

    put: function(url, params) {
        return axios_put(url, params);
    },

    delete: function(url) {
        return axios_delete(url);
    },
    axios: function() {
        return axios;
    },
    postOrPut: function(url, method, params) {

        if(method.toLowerCase() === "post") {
            return axios_post(url, params);
        } else {
            return axios_put(url, params);
        }
    },
    sync_get: function (url) {
        let response = sync_request('GET', url);
        return response['body'];
    }
}
