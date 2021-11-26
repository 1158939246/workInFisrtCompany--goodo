import { axiosIns } from "../../utils/interactive/request";
import { modelListProcess, sceneListProcess, feedbackListProcess,feedbackFormDataProcess} from './dataChange'
interface Tag {
    label: string,
    value: string
}



export let getSceneList = async (model?: string) => {
    let data: Tag[] = []
    // model = "b492bef4e70d715e5cd8f9570e1754a8" 作业排程
    await axiosIns.get(`/scene/model/${model}`).then((res) => {
        let tmp = res.data as { id: string, name: string }[]
        data = sceneListProcess(tmp)
    }).catch((err) => {
        console.log(err)
    })
    return data
}

export let getModelList = async () => {
    let data: Tag[] = []

    await axiosIns.post('/model/page', {}).then((res) => {
        let tmp = res.data as {
            rows: { identity: string, name: string }[],
            total: number
        }
        data = modelListProcess(tmp.rows)
    }).catch((err) => {
        data = []
    })
    return data
    // return [
    //     {
    //       label: "供应链管理",
    //       value: "d07ea7b69739d1d074e84294189c3447"
    //     },
    //     {
    //       label: "作业排程",
    //       value: "b492bef4e70d715e5cd8f9570e1754a8"
    //     }
    // ]
}

//用于维护每个model与之对应的功能
let dataMap: {
    [key: string]: { head: string, scription: string, imgUrl: string }[]
} = {
    //作业排程
    'b492bef4e70d715e5cd8f9570e1754a8': [
        {
            head: '设备反馈',
            scription: '查看设备列表，反馈设备状态',
            imgUrl: "./src/assets/workbanch/feedback.png"
        },
        {
            head: '查看设备排程',
            scription: '查看设备甘特图排程',
            imgUrl: "./src/assets/workbanch/scheduling.png"
        }
    ]
}

export let getDemoList = (model: string) => {
    if (model in dataMap) return dataMap[model]
    // 一般无用，用于default 防止测试时 因为没有更新datamap而导致demolist没有及时更新。
    return [
        {
            head: '设备反馈',
            scription: '查看设备列表，反馈设备状态',
            imgUrl: "http://localhost:3000/src/components/home-util/MM.jpg"
        },
        {
            head: '查看设备排程',
            scription: '查看设备甘特图排程',
            imgUrl: "http://localhost:3000/src/components/home-util/MM.jpg"
        }
    ]
}

export let getFeedbackList = async (sceneId: string) => {
    let returnData = [
        {
            label: "设备名称",
            key: "0",
            children: [
                {
                    label: "请等待",
                    key: "1",
                    children: [
                        {
                            label: "请等待..",
                            key: "1-1",
                        },
                        {
                            label: "请等待..",
                            key: "1-2",
                        },
                        {
                            label: "请等待..",
                            key: "1-3",
                        },
                    ],
                },
            ],
        },
    ]
    await axiosIns
        .post(`scene/${sceneId}/datas`, {
            Resource: {
                condition: "isUsed = true",
                __page: { num: 1, size: 4500 },
            },
        })
        .then((res) => {
            if (!res.data) return returnData
            let data = (res.data as {
                Resource: {
                    rows: {
                        resourceGroupName: string
                        resourceGroupId: string
                        resourceName: string
                        resourceId: string
                    }[]
                }
            }).Resource.rows
            console.log(feedbackListProcess(data))
            returnData = feedbackListProcess(data);
        });
    return returnData
}


export let getFeedbackFormData = async(sceneid:string,resourceid:string) => {
    let result=[{
            key: '0',
            batch: "暂无",
            productCode: "暂无",
            productName: "暂无",
            operateType: "暂无",
            startTime: "暂无",
            endTime: "暂无",
            lastFeedbackTime: "暂无",
            tags: ["no"],
            oid:'000'
        }]
    await axiosIns
        .post(`scene/${sceneid}/datas`, {
            Assignment: {
                condition: `resourceId = ${resourceid}`,
                __page: { num: 1, size: 4500 },
            },
        })
        .then((res) => {
            let data = (res.data as {
                Assignment: { rows: [] }
            }).Assignment.rows
            console.log(res)
            result= feedbackFormDataProcess(data);
        });
    return result
}