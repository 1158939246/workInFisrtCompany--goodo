<template>
  <div>
    <n-data-table
      :columns="columns"
      :data="data"
      :row-props="handle"
      scroll-x="1400"
    />
  </div>
</template>

<script lang="ts">
import { h, defineComponent } from "vue";
import { NTag, NButton, useMessage } from "naive-ui";
import { store } from "../../../store";

const createColumns = () => {
  return [
    {
      title: "是否反馈",
      key: "tags",
      width: 100,
      render(row: any) {
        const tags = row.tags.map((tagKey: string) => {

          if (tagKey === "yes") {
            return h("span", {
              class: "iconfont icon-yifankui",
              style: "color:green;font-size:10px;text-align: center;display:block;",
            });
          } else {
            return h("div", {
              style: "width:11px;height:2px;background:grey;margin:0 auto ",
            });
          }
        });
        return tags;
      },
    },
    {
      title: "批次号",
      key: "batch",
      width: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: "产品代码",
      key: "productCode",
      width: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: "产品名称",
      key: "productName",
      width: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: "工序类型",
      key: "operateType",
      width: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: "开始时间",
      key: "startTime",
    },
    {
      title: "结束时间",
      key: "endTime",
    },
    {
      title: "上次反馈时间",
      key: "lastFeedbackTime",
    },
  ];
};

// const createData = () => [
//   {
//     key: 0,
//     batch: "2021514sasaw14",
//     productCode: "888458",
//     productName: "我也不知道",
//     operateType: "????",
//     startTime: "今天",
//     endTime: "明天",
//     lastFeedbackTime: "昨天",
//     tags: ["yes"],
//   },
//   {
//     key: 1,
//     batch: "2021514sasaw14",
//     productCode: "888458",
//     productName: "我也不知道",
//     operateType: "????",
//     startTime: "今天",
//     endTime: "明天",
//     lastFeedbackTime: "昨天",
//     tags: ["yes"],
//   },
//   {
//     key: 2,
//     batch: "2021514sasaw14",
//     productCode: "888458",
//     productName: "我也不知道",
//     operateType: "????",
//     startTime: "今天",
//     endTime: "明天",
//     lastFeedbackTime: "昨天",
//     tags: ["yes"],
//   },
// ];

export default defineComponent({
  // props:{
  //    data:Array
  // },
  setup(props, context) {
    const message = useMessage();
    let data = store.getters.getFeedbackFormData;
    let handle = (row: any) => {
      return {
        onClick: () => {
          context.emit("formClick", row);
        },
      };
    };
    let toDate = (data: number) => {
      let tmp = new Date(data);
      return (
        tmp.toLocaleDateString().replaceAll("/", "-") +
        " " +
        tmp.toTimeString().slice(0, 8)
      );
    };
    return {
      toDate,
      data,
      columns: createColumns(),
      handle,
    };
  },
});
</script>
 
 <style lang="scss" scoped>
</style>
