<template>
  <div>
    <div class="header">
      <div class="headerLogo">
        <img src="../assets/plantformLoginLogo.jpg" />
      </div>
      <div class="operate">
        <div class="operateDemo operateModel">
          <span>模型</span>
          <modelOperateVue></modelOperateVue>
        </div>
        <div class="operateDemo operateScene">
          <span>场景</span>
          <sceneOperateVue></sceneOperateVue>
        </div>
  
        <div class="user">
          <userOperate>
            <n-button circle style="width: 36px"><img src="./home-util/MM.jpg" style="width: 36px;height:36px;border-radius:50%"></n-button>
          </userOperate>
        </div>
      </div>
    </div>
    <RouterView></RouterView>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, watch, reactive, nextTick } from "vue";
import { useMessage, useDialog } from "naive-ui";
import LocalStorageUtil from "../utils/local/localstorage";
import { router } from "../router/index";
import userOperate from "./home-util/userOperate.vue";
import sceneOperateVue from "./home-util/sceneOperate.vue";
import modelOperateVue from "./home-util/modelOperate.vue";
import { useStore } from "../store";

export default defineComponent({
  setup() {
    window.$message = useMessage();
    const message = useMessage();
    const dialog = useDialog();
    const store = useStore();

    store.dispatch("initData");
    let demoList = reactive(store.state.demoList);

    return {
      demoList,
    };
  },
  components: {
    userOperate,
    sceneOperateVue,
    modelOperateVue,
  },
});
</script>
 
 <style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  width: 100%;
  background: #4c68d9;
  .headerLogo {
    margin-left: 16px;
    width: 100px;
    height: 32px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .operate {
    display: flex;
    flex-direction: row;
    .operateDemo {
      width: 240px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-direction: row;
      span {
        width: 34px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
        margin-left: 10px;
      }
    }
    .user {
      margin-left: 10px;
      margin-right: 10px;
      height: 100%;
      line-height: 100%;
    }
  }
}
</style>


