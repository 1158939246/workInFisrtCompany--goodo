<template>
  <div>
    <n-popselect
      v-model:value="userValue"
      :options="userOptions"
      trigger="click"
      @update:value="userOperate"
      placement="bottom-end"
    >
      <slot></slot>
    </n-popselect>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMessage, useDialog } from "naive-ui";
import LocalStorageUtil from "../../utils/local/localstorage";
import { router } from "../../router/index";

export default defineComponent({
  setup() {
    const message = useMessage();
    const dialog = useDialog();

    //设置注销登入弹出框
    let dialogForLogout = function () {
      dialog.success({
        title: "关闭",
        content: "确实要注销登录吗？注销后将返回登录页。",
        positiveText: "确定",
        negativeText: "取消",
        maskClosable: false,
        onMaskClick: () => {
          return;
        },
        onPositiveClick: () => {
          LocalStorageUtil.dropUser();
          router.push({ path: "/login" });
        },
      });
    };
    
   interface tag {
      label: string;
      value: string;
    }

    //设置场景下拉框
    let userValue = ref("人头");
    let userOptions = [
      {
        label: "注销账号",
        value: "logOff",
      },
    ];
    let userOperate = (value:string, label:tag) => {
      switch(value){
        case 'logOff':dialogForLogout();break;
      }
    };
    return {
      // dialogForLogout,
      userValue,
      userOptions,
      userOperate,
    };
  },
});
</script>
 


