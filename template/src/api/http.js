// 引入axios
import axios from 'axios';
import config from './config';
// 配置API接口地址
const root = config.baseUrl;

const $http = axios.create({
  baseURL: root,
  timeout: 20000,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
});
// 引入响应拦截器
$http.interceptors.response.use(
  res => {
    // 若需另统一处理后台返回的错误码，可在此处加elseif
    if (res.data.code === '0') {
      return Promise.resolve(res.data.data);
    } else {
      return Promise.reject(res.data);
    }
  },
  async err => {
    // 超时提示
    if (err.message.indexOf('timeout') !== -1) {
      err.message = '请求超时';
    } else if (err.message.indexOf('404') !== -1) {
      err.message = '页面不存在';
    }
    return Promise.reject(err);
  }
);

export default {
  post(url, params = {}, headers = {}) {
    return $http({
      method: 'post',
      url,
      data: params,
      headers
    });
  },
  get(url, params = {}, headers = {}) {
    if (!params['t']) params['t'] = new Date().getTime();
    return $http({
      method: 'get',
      url,
      params,
      headers
    });
  },
  delete(url, params, headers = {}) {
    return $http({
      method: 'delete',
      url,
      params,
      headers
    });
  },
  put(url, config, headers = {}) {
    return $http({
      method: 'put',
      url,
      params: config.params,
      data: config.data,
      headers
    });
  }
};
