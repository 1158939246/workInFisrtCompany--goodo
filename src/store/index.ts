import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import LocalStorageUtil from '../utils/local/localstorage'
import { axiosIns } from '../utils/interactive/request'

interface tag {
    label: string,
    value: string
}

interface demo {
    head: string,
    imgUrl: string,
    scription: string
}

interface feedbackListIF {
    label: string,
    key: string,
    children:
    {
        label: string,
        key: string,
        children: {
            label: string,
            key: string
        }[]
    }[]
}

interface feedbackFormDataIF {
    key: string,
    batch: string,
    productCode: string,
    productName: string,
    operateType: string,
    startTime: number,
    endTime: number,
    lastFeedbackTime: number,
    tags: string[],
    oid:string
}

export interface State {
    username?: string | undefined,
    userToken?: string,
    modelNow: tag,
    modelList?: tag[],
    sceneNow: tag,
    sceneList?: tag[],
    demoList: demo[],
    feedbackList: feedbackListIF[],
    feedbackFormData: feedbackFormDataIF[],
    feedbackCard: feedbackFormDataIF,
}

export const key: InjectionKey<Store<State>> = Symbol()

import { getModelList, getSceneList, getDemoList, getFeedbackList, getFeedbackFormData } from './storeUtil/storeUtil'
import { getModeFromValue } from 'naive-ui/lib/color-picker/src/utils'


let feedbackCard = {
    key: '0',
    equipmentCode: "正在获取数据",
    batch: "正在获取数据",
    productCode: "正在获取数据",
    productName: "正在获取数据",
    operateType: "正在获取数据",
    startTime: 0,
    endTime: 0,
    lastFeedbackTime: 0,
    tags: ["yes"],
    oid:'000'
}

//日期字符串转成时间戳
//例如var date = '2015-03-05 17:59:00.0';
function dateStrChangeTimeTamp(dateStr:string){
    dateStr = dateStr.substring(0,19);
    dateStr = dateStr.replace(/-/g,'/');
    let timeTamp = new Date(dateStr).getTime();
    return timeTamp
 }

export const store = createStore<State>({
    state: {
        username: LocalStorageUtil.getUserName(),
        userToken: LocalStorageUtil.getUserToken(),
        modelList: [],
        modelNow: {
            label: '请输入模型',
            value: 'unknow'
        },
        sceneList: [],
        sceneNow: {
            label: '请输入场景',
            value: 'unknow'
        },
        demoList: [],
        feedbackList: [],
        feedbackFormData: [],
        feedbackCard: feedbackCard
    },
    mutations: {
        setModelNow(state, modelNow: tag) {
            if (state.modelNow) {
                state.modelNow.label = modelNow.label
                state.modelNow.value = modelNow.value
            }
            else state.modelNow = modelNow
        },
        setSceneNow(state, sceneNow: tag) {
            if (state.sceneNow) {
                state.sceneNow.label = sceneNow.label
                state.sceneNow.value = sceneNow.value
            }
            else state.modelNow = sceneNow
        },
        setModelList(state, list: tag[]) {
            state.modelList?.splice(0, state.modelList.length)
            state.modelList?.push(...list)
        },
        setSceneList(state, list: tag[]) {
            state.sceneList?.splice(0, state.sceneList.length)
            state.sceneList?.push(...list)
        },
        setDemoList(state, list: demo[]) {
            state.demoList?.splice(0, state.demoList.length)
            state.demoList?.push(...list)
        },
        setFeedbackFormData(state, arr) {
            // if(!arr||!state.feedbackFormData) return
            state.feedbackFormData.splice(0, state.feedbackFormData.length)
            state.feedbackFormData.push(...arr)
        },
        setFeedbackCard(state, index: number) {
            let tmp = state.feedbackFormData[index]
            for (const [key, val] of Object.entries(tmp)) {
                // 因为feedbackcard内部的日期数据 使用的是时间戳
                if(key==="startTime"||key==="endTime"||key==="lastFeedbackTime"){
                   (state.feedbackCard as any)[key] = dateStrChangeTimeTamp(val)  
                }else{
                   (state.feedbackCard as any)[key] = val                    
                }
            }
        },
        setFeedbackList(state, feedbackList: feedbackListIF[]) {
            state.feedbackList.splice(0, state.feedbackList.length)
            state.feedbackList.push(...feedbackList)
        }
    },
    actions: {
        async initData(context) {
            let modelList = await getModelList()
            let sceneList = await getSceneList(modelList[0].value)
            let demoList = await getDemoList(modelList[0].value)
            context.commit('setSceneList', sceneList)
            context.commit('setModelList', modelList)
            context.commit('setDemoList', demoList)
        },
        async setModel(context, modelNow: tag) {
            let sceneList = await getSceneList(modelNow.value)

            let demoList = await getDemoList(modelNow.value)

            context.commit('setDemoList', demoList)
            context.commit('setSceneList', sceneList)
            context.commit('setSceneNow', sceneList[0])
            context.commit('setModelNow', modelNow)
        },
        async setScene(context, sceneNow: tag) {
            // let demoList= await getDemoList(context.state.modelNow?.value,sceneNow.value)
            // context.commit('setDemoList',demoList)
            let feedbackList =await getFeedbackList(sceneNow.value)
            context.commit('setFeedbackList', feedbackList)
            context.commit('setSceneNow', sceneNow)
        },

        async setFeedbackList(context, id:string) {
            
            let feedbackFormData=await getFeedbackFormData(context.state.sceneNow.value,id)
            context.commit('setFeedbackFormData', feedbackFormData)
        }
    },
    getters: {
        getModelNow(state) {
            // if (state.modelNow) return state.modelNow
            // else if (state.modelList?.length) {
            //     // let tmp:tag={
            //     //     value:' ',
            //     //     label:' '
            //     // }
            //     // console.log(state.modelList)
            //     state.modelNow.value=state.modelList[0].value
            //     state.modelNow.label=state.modelList[0].label
            //     // state.modelNow = tmp
            //     return state.modelNow
            // } else return state.modelNow
            return state.modelNow
        },
        getSceneNow(state) {
            // if (state.sceneNow) return state.sceneNow
            // else if (state.sceneList) {
            //     let tmp:tag={
            //         value:' ',
            //         label:' '
            //     }
            //     tmp.value=state.sceneList[0].value
            //     tmp.label=state.sceneList[0].label
            //     state.sceneNow = tmp
            //     return state.sceneNow
            // } else return {
            //     label: '查无此数据',
            //     value: 'no'
            // }
            return state.sceneNow
        },
        getFeedbackList(state) {
            // state.feedbackList =getFeedbackList()
            return state.feedbackList
        },
        getFeedbackFormData(state) {
            // state.feedbackFormData = getFeedbackFormData()

            return state.feedbackFormData
        },
        getFeedbackCard(state) {
            return state.feedbackCard
        }
    }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore(key)
}