import { tabsLight } from "naive-ui/lib/tabs/styles"

interface Tag {
    label: string,
    value: string
}


export let modelListProcess = function (params: { identity: string, name: string }[]) {
    let modelList: Tag[] = []
    params.forEach(ele => {
        switch (ele.name) {
            // case 'SupplyChainPlanner': { modelList.push({ label: '供应链管理', value: ele.identity }) }
            case 'PiecePlanner': { modelList.push({ label: '作业排程', value: ele.identity }) }
        }
    })
    return modelList
}

export let sceneListProcess = function (params: { id: string, name: string }[]) {
    let sceneList: Tag[] = []
    params.forEach(ele => {
        sceneList.push({
            label: ele.name,
            value: ele.id
        })
    })
    return sceneList
}


interface feedbackListChildIf {
    label: string,
    key: string,
    children: {
        label: string,
        key: string,
    }[]
}

interface feedbackListIf {
    label: string,
    key: string,
    children: feedbackListChildIf[]
}

export let feedbackListProcess = (params: {
    resourceGroupName: string
    resourceGroupId: string
    resourceName: string
    resourceId: string
}[]) => {
    let tmp = []
    let equipment: feedbackListIf = {
        label: "设备名称",
        key: "0",
        children: []
    }

    let judge = (arr: feedbackListChildIf[], id: string) => {
        let i = 0
        for(i;i<arr.length;i++){
            if (arr[i].key == id) return i
        }
        return -1
    }
    params.forEach(ele => {
        let index = judge(equipment.children, ele.resourceGroupId)
        if (index >=0) {
            (equipment.children[index].children as any).push({
                label: ele.resourceName,
                key: ele.resourceId
            })
        } else {
            (equipment.children as any).push({
                label: ele.resourceGroupName,
                key: ele.resourceGroupId,
                children: [{
                    label: ele.resourceName,
                    key: ele.resourceId
                }
            ]
            })
        }
    })
    tmp.push(equipment)

    return tmp
}

// {
//     key: '0',
//     batch: "2021514sasaw14",
//     productCode: "888458",
//     productName: "asd",
//     operateType: "????",
//     startTime: 1183135260000,
//     endTime: 1183135260000,
//     lastFeedbackTime: 1183135260000,
//     tags: ["yes"],
// }
interface feedbackFormData{
    key: string,
    batch: string,
    productCode: string,
    productName: string,
    operateType:string,
    startTime: number,
    endTime: number,
    lastFeedbackTime: number,
    tags: string[],
    oid:string
}

//日期字符串转成时间戳
//例如var date = '2015-03-05 17:59:00.0';
function dateStrChangeTimeTamp(dateStr:string){
    dateStr = dateStr.substring(0,19);
    dateStr = dateStr.replace(/-/g,'/');
    let timeTamp = new Date(dateStr).getTime();
    return timeTamp
 }

export let feedbackFormDataProcess=(data:any[])=>{
    let result = []
    for(let i=0;i<data.length;i++){
        result.push({
            key: String(i),
            batch:data[i].displayPieceNr,
            equipmentCode:data[i].assignmentId,
            productCode: data[i].finishedProductId,
            productName: data[i].finishedProductName,
            operateType: data[i].operationTypeName,
            startTime: data[i].startTime,
            endTime: data[i].endTime,
            lastFeedbackTime: data[i].processEndTime,
            tags: [data[i].lastFeedbackAssignment?'yes':'no'],
            oid:data[i].oid
        })
    }

    return result
}