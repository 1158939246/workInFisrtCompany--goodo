<template>
  <n-menu
    style="width: 300px"
    :options="menuOptions"
    accordion
    :expanded-keys="expandedKeys"
    :on-update:expanded-keys="watchExpand"
    :value="value"
    :on-update:value="handle"
    :render-label="renderMenuLabel"
    :expand-icon="expandIcon"
  />
</template>


<script lang="ts">
import { defineComponent, h, ref, watch, reactive, nextTick } from "vue";
import { useMessage, useDialog } from "naive-ui";
import { NIcon } from "naive-ui";
import { keysOf } from "naive-ui/lib/_utils";
import { store } from "../../../store";

// function renderIcon (icon) {
//   return () => h(NIcon, null, { default: () => h(icon) })
// }

// const menuOptions = [
//   {
//     label: "设备名称",
//     key: "0",
//     children: [
//       {
//         label: "罐装设备组",
//         key: "1",
//         children: [
//           {
//             label: "100..",
//             key: "1-1",
//           },
//           {
//             label: "200..",
//             key: "1-2",
//           },
//         ],
//       },
//       {
//         label: "灌装设备组",
//         key: "2",
//         children: [
//           {
//             label: "100",
//             key: "2-1",
//           },
//         ],
//       },
//     ],
//   },
// ];


export default defineComponent({
  setup(props, context) {
    let value = ref("1-1");
    let expandedKeys = reactive(["0", "1", "2"]);
    // value.value = "1-1";

    let menuOptions = store.getters.getFeedbackList;
    watch(menuOptions, () => {
      nextTick(() => {
        expandedKeys.splice(0, expandedKeys.length);
        expandedKeys.push(...["0", "1", "2"]);
      });
    });

    let handle = function (key: string) {
      value.value = key;
      context.emit("onSelected", key);
    };

    let editMenu: string[] = [];
    let watchExpand = (path: string) => {


      // if(path.length<=1) return
      expandedKeys.splice(0, expandedKeys.length);
      expandedKeys.push(...path);
      if (expandedKeys.indexOf("0") === -1) expandedKeys.push("0");
      editMenu.splice(0, editMenu.length);
      editMenu.push(...path);
      console.log(path);
    };

    let menuHeadStyle = {
      width: "84px",
      height: "22px",
      "font-size": "16px",
      "font-family": "PingFangSC-Medium, PingFang SC",
      "font-weight": 500,
      color: "#666666",
      "line-height": "22px",
    };

    let menuItemStyle = {
      width: "175px",
      height: "20px",
      "font-size": "14px",
      "font-family": "PingFangSC-Regular, PingFang SC",
      "font-weight": 400,
      color: "#666666",
      "line-height": "20px",
    };

    return {
      value,
      menuOptions,
      expandedKeys,
      handle,
      watchExpand,
      renderMenuLabel(option: any) {
        if (option.key.indexOf("Group") > 0) {
          if (editMenu.indexOf(option.key) != -1)
            return h("div", {}, [
              h("span", { class: "iconfont icon-hangfenzuzhankai" }),
              h("span", { style: menuHeadStyle }, option.label),
            ]);
          return h("div", {}, [
            h("span", { class: "iconfont icon-hangfenzushouqi" }),
            h("span", { style: menuHeadStyle }, option.label),
          ]);
        }
        if (option.key === "0")
          return h("span", { style: menuHeadStyle }, option.label);
        return h("span", {style:menuItemStyle}, option.label);
      },
      expandIcon() {
        return h("span", {});
      },
    };
  },
});
</script>
 
 <style lang="scss" scoped>

</style>
