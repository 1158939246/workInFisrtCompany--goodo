/*
 * @Author: migao@wangguoyan
 * @Date: 2021-10-26 15:32:54
 * @Last Modified by: migao@wangguoyan
 * @Last Modified time: 2021-10-27 18:23:59
 */

import axios, { AxiosInstance } from 'axios';
import { LocalMeta } from '../local/local-meta';
import { ConfigMeta } from '../local/config';
import LocalStorageUtil from '../local/localstorage';
import { router } from '../../router';

/**
 * @description 生成axios实例
 * @returns
 */
// export function axiosIns(): AxiosInstance {
const prefix = ConfigMeta.API_PREFIX;
const host = LocalMeta.baseUrl;

let axiosIns = axios.create({
	baseURL: `${host}${prefix}`,
	// headers: {},
	timeout: 1000,
	transformResponse: [
		(result) => {
			let res;
			try {
				res = JSON.parse(result);
			} catch (error) {
				throw Error(`[]`)
			}

			return res.data;
		}
	]
});

axiosIns.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	let token = LocalStorageUtil.getUserToken()
	if (token)
		config.headers = { ...config.headers, ...{ 'Authorization': token } }
	return config
}, function (error) {
	// 对请求错误做些什么
	window.$message.error(error)
	return Promise.reject(error)
});

axiosIns.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	let token = response.headers["authorization"]
	if (token)
		LocalStorageUtil.setUserToken(token)
	return response;
}, function (error) {
	// 对响应错误做点什么
	console.log(error)
	// window.$message.error(error)
	if (error.response) {
		// The request was made and the server responded with a status code
		// console.log(error.response.data);

		if (error.response.status == 401) {
			window.$message.error("用户token超时或无效，请重新登入");
			router.push({ path: '/login' })
		}
		// console.log(error.response.headers);
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		window.$message.error(error.request);
	} else {
		// Something happened in setting up the request that triggered an Error
		window.$message.error('Error', error.message);
	}
	return Promise.reject(error);
})

export { axiosIns }
// }
