<template>
  <div class="cardMask">
    <!-- <n-card title="tittle"> -->
    <button circle @click.stop="moveLast" class="leftBtn">
      <span
        class="iconfont icon-shangyishebei"
        style="font-size: 64px; color: #4c68d9"
      ></span>
    </button>
    <formVue @close="cardClose"></formVue>

    <button circle @click.stop="moveNext" class="rightBtn">
      <span
        class="iconfont icon-shangyishebei"
        style="
          font-size: 64px;
          color: #4c68d9;
          display: inline-block;
          transform: rotate(180deg);
        "
      ></span>
    </button>
    <!-- </n-card> -->

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import formVue from "./cardUtil/form.vue";

export default defineComponent({
  setup(prop, context) {
    let cardClose = () => {
      context.emit("close");
    };

    let moveLast = () => {
      context.emit("moveLast");
    };
    let moveNext = () => {
      context.emit("moveNext");
    };
    return {
      cardClose,
      moveLast,
      moveNext,
    };
  },
  components: {
    formVue,
  },
});
</script>
 
 <style lang="scss" scoped>
.cardMask {
  position: absolute;
  z-index: 999;
  top: 54px;
  height: calc(100vh - 54px);
  width: 100%;
  display: flex;
  background: white;
  justify-content: space-between;
  align-items: center;
  .leftBtn {
    border: 0px;
    border-radius: 100%;
    margin-left: 32px;
    width: 64px;
    height: 64px;
  }
  .rightBtn {
    border: 0px;
    border-radius: 100%;
    margin-right: 32px;
    width: 64px;
    height: 64px;
  }
}
.n-card {
  max-width: 300px;
}
</style>
