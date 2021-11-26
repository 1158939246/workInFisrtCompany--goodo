<template>
  <div class="formWrapper">
    <n-form
      :model="model"
      ref="formRef"
      :rules="rules"
      label-placement="left"
      label-width="67px"
      class="form"
      label-align="left"
      size="large"
    >
      <!--  -->
      <n-form-item>
        <div class="header">paicheng</div>
      </n-form-item>
      <n-form-item path="equipmentCode" label="设备代码">
        {{ data.equipmentCode }}
      </n-form-item>

      <n-form-item path="productCode" label="产品代码">
        {{ data.productCode }}
      </n-form-item>

      <n-form-item path="productName" label="产品名称">
        {{ data.productName }}
      </n-form-item>

      <n-form-item path="batch" label="批次号">
        {{ data.batch }}
      </n-form-item>

      <n-form-item path="startTime" label="开始时间">
        <n-date-picker
          style="width: 358px"
          v-model:value="data.startTime"
          type="datetime"
          clearable
        />
      </n-form-item>

      <n-form-item path="endTime" label="结束时间">
        <n-date-picker
          style="width: 358px"
          v-model:value="data.endTime"
          type="datetime"
          clearable
        />
      </n-form-item>

      <n-form-item path="status" label="任务状态">
        <n-switch v-model:value="isStart" class="switch" />{{ isStartTag }}
        <n-switch v-model:value="isEnd" class="switch" />{{ isEndTag }}
      </n-form-item>

      <div style="margin-top: 30px">
        <div class="buttomTag">
          {{
            data.tags[0] == "yes"
              ? "已提交:" + "上次提交时间为" + toDate(data.lastFeedbackTime)
              : ""
          }}
        </div>
        <div style="display: flex; justify-content: center">
          <n-button @click="submit" round type="primary" class="subBtn">
            验证
          </n-button>
          <n-button @click="goBack" round type="primary" class="subBtn">
            返回
          </n-button>
        </div>
      </div>
    </n-form>
    <span class="word11">
      copyright&nbsp;&nbsp;&nbsp;谷斗科技（上海）有限公司
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { useMessage } from "naive-ui";
import { store } from "../../../../store";
import { axiosIns } from "../../../../utils/interactive/request";

export default defineComponent({
  setup(props, context) {
    const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const message = useMessage();
    // let data=reactive({
    //   key: 0,
    //   equipmentCode:"asdasd",
    //   batch: "2021514sasaw14",
    //   productCode: "888458",
    //   productName: "我也不知道",
    //   operateType: "????",
    //   startTime: 1183135260000,
    //   endTime: 1183135260000,
    //   lastFeedbackTime: "昨天",
    //   tags: ["yes"],
    //    oid:string
    // });
    let data = store.getters.getFeedbackCard;
    // status
    data.status = ref(false);
    let isStart = ref(false);
    let isEnd = ref(false);
    let isStartTag = ref("未开始");
    let isEndTag = ref("未结束");
    watch(isStart, (val) => {
      isStartTag.value = val ? "已开始" : "未开始";
    });
    watch(isEnd, (val) => {
      isEndTag.value = val ? "已结束" : "未结束";
    });

    let goBack = () => {
      context.emit("close");
    };

    let toDate = (data: number) => {
      let tmp = new Date(data);
      return (
        tmp.toLocaleDateString().replaceAll("/", "-") +
        " " +
        tmp.toTimeString().slice(0, 8)
      );
    };

    let submit = function (e: any) {
      (formRef as any).value.validate((errors: any) => {
        if (!errors) {
          let scene = store.state.sceneNow.value;
          axiosIns
            .post(`scene/${scene}/data-method`, {
              args: [
                data.startTime,
                data.endTime,
                data.lastFeedbackTime,
                data.productCode,
                data.batch,
                isEnd.value,
              ],
              method: "feedback",
              userNo: "admin",
              oid: data.oid,
            })
            .then((res) => {
              // console.log(res)
              if (!res.data) {
                message.error("服务器繁忙");
              } else {
                message.success((res as any).data);
              }
            });
        } else {
          console.log(errors);
          message.error("验证失败");
        }
      });
    };
    let rules = {
      endTime: {
        validator(rule: any, value: number) {
          return value > 0;
        },
        trigger: ["blur", "change"],
        message: "结束时间不能为空",
      },
      startTime: {
        validator(rule: any, value: number) {
          return value > 0;
        },
        trigger: ["blur", "change"],
        message: "开始时间不能为空",
      },
      status: {
        validator(rule: any, value: boolean) {
          if (!isStart.value && isEnd.value) {
            isEnd.value = false;
            return false;
          } else {
            return true;
          }
        },
        trigger: ["blur", "change"],
        message: "必须要先开始才能结束",
      },
    };

    let labelStyle = {
      width: "67px",
      height: "22px",
      fontSize: "16px",
      fontFamily: "PingFangSC-Medium, PingFang SC",
      fontWeight: "500",
      color: "#666666",
      lineHeight: "22px",
    };

    return {
      labelStyle,
      isStartTag,
      isEndTag,
      isStart,
      isEnd,
      data,
      toDate,
      submit,
      goBack,
      formRef,
      model: data,
      rules,
    };
  },
});
</script>
 
 <style lang="scss" scoped>
.formWrapper {
  width: 450px;
  line-height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  .header {
    text-align: center;
    width: 201px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #666666;
    margin: 0 auto;
    // line-height: 22px;
  }

  .buttomTag {
    width: 310px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
    text-align: center;
    margin: 13px auto;
  }
  .subBtn {
    width: 114px;
    height: 39px;
    border-radius: 6px;
    border: 1px solid #4c68d9;
    margin-left: 20px;
  }

  .switch {
    width: 44px;
    height: 24px;
  }

  .word11 {
  z-index: 40;
  width: 328px;
  height: 20px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(102, 102, 102, 1);
  font-size: 14px;
  letter-spacing: 0.5833333730697632px;
  font-family: PingFangSC-Medium;
  white-space: nowrap;
  line-height: 20px;
  text-align: center;
  // align-self: flex-start;
  margin-top:30px;
}
}
</style>
