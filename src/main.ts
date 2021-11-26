/*
 * @Author: migao@wangguoyan
 * @Date: 2021-10-19 15:14:01
 * @Last Modified by: migao@wangguoyan
 * @Last Modified time: 2021-10-27 00:07:49
 */
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import naive from "naive-ui";
import {store, key} from './store'
import './assets/icon/iconfont.css'


const app = createApp(App);
app.use(router);
app.use(naive);
app.use(store, key)
app.mount('#app');
