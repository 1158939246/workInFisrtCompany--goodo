<template>
  <div class="login">
    <img src="../../assets/goodo-logo.png" class="compony-logo" style="position:absolute"/>
    <div class="background"></div>
    <div class="form-wrapper">
      <div class="form">
        <LoginForm></LoginForm>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, watch, reactive, nextTick } from "vue";
import { useMessage, useDialog } from "naive-ui";
import LoginForm from "./login-form.vue";

export default defineComponent({
  setup() {
    window.$message = useMessage();
    return {};
  },
  components: {
    LoginForm,
  },
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  .background {
    width: 70%;
    background:url('/src/assets/login-bg.gif');
      background-size: contain;
    background-repeat:no-repeat;
    background-position:center;
    height: 100%;
    float: left;
    .compony-logo{
      margin: 23px;
    }
  }
  .form-wrapper {
    width: 30%;
    height: 100%;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    .form{
      width: 100%;
      // height: 433px;
      // transform: translate(0,-50%);
      margin: 0;
      padding:0;
      margin-right: 80px;
    }
  }
}
</style>
