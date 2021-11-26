/* * @Author: migao@wangguoyan * @Date: 2021-10-21 15:58:16 * @Last Modified by:
migao@wangguoyan * @Last Modified time: 2021-10-27 00:01:59 */
<template>
  <NConfigProvider :themeOverrides="themeOverrides">
    <NLoadingBarProvider>
      <NMessageProvider>
        <NNotificationProvider>
          <NDialogProvider>
            <NThemeEditor>
              <RouterView></RouterView>
              <n-button
                circle
                @click="goHome"
                v-if="goHomeIconFlag.path !== '/login'"
                class="goHomeBtn"
              >
                <span class="iconfont icon-shouye"></span>
              </n-button>
            </NThemeEditor>
          </NDialogProvider>
        </NNotificationProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { router } from "./router";
import {
  NConfigProvider,
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider,
  NThemeEditor
} from "naive-ui";
import themeOverrides from "./theme";

export default defineComponent({
  setup() {
    let goHome = () => {
      router.push({
        path: "/home",
      });
    };
    let goHomeIconFlag = router.currentRoute;
    return {
      goHomeIconFlag,
      themeOverrides,
      goHome,
    };
  },
  components: {
    NConfigProvider,
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
    NLoadingBarProvider,
    NThemeEditor,
  },
});
</script>

<style lang="scss">
@import './assets/icon/iconfont.css';

.goHomeBtn {
  position: fixed;
  bottom: 50px;
  left: 50px;
  width:54px;
  height: 54px;
  span{
    font-size:28px
  }
}
// 阿里字体图标设置
.icon, .iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>