<template>
  <div class="feedbackWrapper">
    <div class="slideListWrapper">
      <slideListVue @onSelected="slideListSelected"></slideListVue>
    </div>
    <div class="formWrapper">
      <formVue @formClick="formClick"></formVue>
    </div>
  </div>
  <cardVue
    @close="cardClose"
    @moveNext="cardMoveNext"
    @moveLast="cardMoveLast"
    v-if="cardShowFlag"
  ></cardVue>
</template>


<script lang="ts">
import { defineComponent, ref, watch, reactive, onMounted } from "vue";
import formVue from "./feedbackUtil/form.vue";
import slideListVue from "./feedbackUtil/slideList.vue";
import cardVue from "./feedbackUtil/card.vue";
import { store } from "../../store";
import { axiosIns } from "../../utils/interactive/request";

export default defineComponent({
  setup() {
    let cardShowFlag = ref(false);

    let slideListSelected = (key: string) => {
      console.log(key)
      store.dispatch("setFeedbackList", key);
    };

    let formClick = (row: any) => {
      store.commit("setFeedbackCard", Number(row.key));
      cardShowFlag.value = true;
    };

    let cardClose = () => {
      cardShowFlag.value = false;
    };

    let cardMoveNext = () => {
      let cardIndex = store.getters.getFeedbackCard.key;
      let formDatalen = store.state.feedbackFormData.length;
      store.commit("setFeedbackCard", (Number(cardIndex) + 1) % formDatalen);
      // console.log("next");
    };

    let cardMoveLast = () => {
      let cardIndex = store.getters.getFeedbackCard.key;
      let formDatalen = store.state.feedbackFormData.length;
      store.commit(
        "setFeedbackCard",
        (Number(cardIndex) + formDatalen - 1) % formDatalen
      );
      // console.log("last");
    };
    store.dispatch("setScene", 123);
    return {
      cardMoveNext,
      cardMoveLast,
      slideListSelected,
      formClick,
      cardClose,
      cardShowFlag,
    };
  },
  components: {
    formVue,
    slideListVue,
    cardVue,
  },
});
</script>

 <style lang="scss" scoped>
.feedbackWrapper {
  display: flex;
  .slideListWrapper {
    width: 300px;
    height: calc(100vh - 50px);
    overflow: scroll;
  }

  .formWrapper {
    width: calc(100vw - 300px);
    height: calc(100vh - 50px);
    overflow: scroll;
  }
}
</style>


