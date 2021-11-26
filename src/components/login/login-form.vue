/* * @Author: migao@wangguoyan * @Date: 2021-10-21 17:42:25 * @Last Modified by:
migao@wangguoyan * @Last Modified time: 2021-10-25 16:45:10 */

<template>
  <n-form
    class="loginformburred"
    :label-width="80"
    :model="formValue"
    :rules="rules"
    size="large"
    ref="formRef"
    style="height: 100%;width:100%"
  >
    <n-form-item>
      <div class="header">
        <div class="loginLogo">
          <img src="../../assets/plantformLoginLogo.jpg" />
        </div>
        <div>
          <h1 style="text-align: center; width: 100%">
            威孚资源威孚资源威孚资源协同优化平台
          </h1>
        </div>
      </div>
    </n-form-item>

    <n-form-item label-width="80" path="user.userNo" label="用户名">
      <n-input
        placeholder="请输入用户名"
        v-model:value="formValue.user.userNo"
        clearable
      ></n-input>
    </n-form-item>

    <n-form-item path="user.passWord" label="密码">
      <n-input
        placeholder="请输入密码"
        type="password"
        show-password-on="click"
        v-model:value="formValue.user.passWord"
        @enter="handleValidateClick"
        clearable
      ></n-input>
    </n-form-item>

    <n-form-item>
      <n-button
        style="width: 100%"
        @click.stop="handleValidateClick"
        attr-type="button"
        type="primary"
        class="loginbutton"
        >登录</n-button
      >
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { axiosIns } from "../../utils/interactive/request";
import { router } from "../../router";
import { useMessage } from "naive-ui";
import LocalStorageUtil from "../../utils/local/localstorage";

const request = axiosIns;

function gotoHome() {
  router.replace("/home");
}

export default defineComponent({
  setup() {
    const message = useMessage();

    const formValue = ref({
      user: {
        userNo: "",
        passWord: "",
      },
    });

    const formRef = ref(null);

    return {
      formRef,
      formValue,
      rules: {
        user: {
          userNo: {
            required: true,
            message: "请输入账号",
            trigger: ["input", "blur"],
          },
          passWord: {
            required: true,
            message: "请输入密码",
            trigger: ["input", "blur"],
          },
        },
      },
      handleValidateClick() {
        request
          .post<LoginMeta.Response>("/auth/login", formValue.value.user)
          .then((response) => {
            console.log(response);
            if (response.data) {
              console.log(111)
              const token = response.data.token;
              message.success("登录成功");
              let msg: UserMsg = {
                token: token,
                name: response.data.userName,
                config: {},
                userNo: response.data.userNo,
              };
              LocalStorageUtil.createUser(msg);
              gotoHome();
            } else {
              message.error("用户名密码错误")
            }
          });
        // .catch((error) => {
        //   message.error(error.toString());
        // });
      },
    };
  },
});
</script>

<style lang="scss" scoped>
/** 登录form */
.loginform {
  padding: 20px;
  border-radius: 10px;
}

.loginformburred {
  @extend .loginform;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  .header {
    width: 100%;

    h1 {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .loginLogo {
      width: 100%;
      height: 24px;
      display: flex;
      justify-content: center;
      img {
        width: 35%;
        height: 24px;
      }
    }
  }
}

.loginbutton {
  letter-spacing: "0.75px";
}
</style>
