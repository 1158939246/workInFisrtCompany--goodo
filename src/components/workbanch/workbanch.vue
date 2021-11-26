<template>
  <div class="workbanch">
    <demoVue
      v-for="value in demoList"
      :key="value.head"
      :head="value.head"
      :imgUrl="value.imgUrl"
      :scription="value.scription"
      @click="workbanchDemoClick(value.head)"
    ></demoVue>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, watch, reactive, nextTick } from "vue";
import { useMessage, useDialog } from "naive-ui";
import demoVue from "./workbanchUtil/demo.vue";
import { useStore } from "../../store";
import { router } from "../../router";

export default defineComponent({
  setup(props, context) {
    const store = useStore();
    let demoList = reactive(store.state.demoList);
    let workbanchDemoClick = (key: string) => {
      switch (key) {
        case "设备反馈":
          router.push({
            path: "/home/feedback",
          });
          break;
      }
    };
    return {
      demoList,
      workbanchDemoClick,
    };
  },
  components: {
    demoVue,
  },
});
</script>
 
 <style lang="scss" scoped>
.workbanch {
  display: flex;
  flex-direction: row;
}
</style>


