/*
 * @Author: migao@wangguoyan 
 * @Date: 2021-10-21 10:35:01 
 * @Last Modified by: migao@wangguoyan
 * @Last Modified time: 2021-11-02 14:58:51
 */

import { axiosIns } from "../utils/interactive/request";
import LocalStorageUtil from "../utils/local/localstorage";
import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../components/login/login.vue";
import Home from "../components/home.vue"
import Workbanch from '../components/workbanch/workbanch.vue'
import Feedback from '../components/feedback/feedback.vue'

const routes = [
    {
        path: "/",
        name: "index",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "home",
        beforeEnter: (to: unknown, from: unknown, next: (arg0?: { path: string; } | undefined) => void) => {
            
            // axiosIns.get("/backendResource/list").then((res) => {
            //     // console.log(res)
            //     if (res.data === "success") next()
            //     else next({ path: '/login' })
            //     return
            // }).catch(() => {
            //     next({ path: '/login' })
            //     return
            // })
            if (LocalStorageUtil.getUserToken()) next()
            else next({ path: '/login' })
            return
        },
        component: Home,
        children:[
            {
                path:'',
                component:Workbanch
            },
            {
                path:'feedback',
                component:Feedback
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})