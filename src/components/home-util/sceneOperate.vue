<template>
  <div>
    <n-popselect
      v-model:value="userValue"
      :options="options"
      trigger="click"
      @update:value="userOperate"
    >
      <n-button style="width: 164px"> {{ text.label || "我是场景" }}</n-button>
    </n-popselect>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, watch, reactive } from "vue";
import { useMessage, useDialog } from "naive-ui";
import { useStore } from "../../store";

export default defineComponent({
  setup() {
    const message = useMessage();
    const dialog = useDialog();
    const store = useStore();

    //设置场景下拉框
    let text = store.getters.getSceneNow;
    let userValue = ref(text.value);

    //设置模型操作
    let dialogForModelOperate = function (value: string, tag: tag) {
      store.dispatch("setScene", tag);
    };
    let userOperate = (value: string, tag: tag) => {
      dialogForModelOperate(value, tag);
    };
    interface tag {
      label: string;
      value: string;
    }

    let userOptions: tag[] = store.state.sceneList ? store.state.sceneList : [];

    let style = {
      width: "164px",
      "font-size": "14px",
      "font-family": "PingFangSC-Regular, PingFang SC",
      "font-weight": 400,
      color: "#333333",
      "line-height": "20px",
    };

    let options: any = reactive([]);

    watch(userOptions, () => {
      userValue.value = store.getters.getSceneNow.value;

      //重新为每个option赋予style
      options.splice(0, options.length);
      userOptions.forEach((ele) => {
        let tmp = { ...ele, style };
        options.push(tmp);
      });
    });
    return {
      // dialogForLogout,
      text,
      userValue,
      // userOptions,
      userOperate,
      options,
    };
  },
});
</script>
 


