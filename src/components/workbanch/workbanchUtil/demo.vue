<template>
  <n-card hoverable>
    <div class="card" >
      <div class="card-demo-content">
        <h2>{{ head }}</h2>
        <div>{{ scription }}</div>
      </div>
      <img :src="imgUrl" class="card-demo-img" />
    </div>
  </n-card>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "../../../store";

export default defineComponent({
  props: {
    head: String,
    scription: String,
    imgUrl: {
      type: String,
      default: "./src/assets/workbanch/feedback.png",
    }
  },
  setup(props, context) {
    const store = useStore();
    let head = props.head;
    let scription = props.scription;
    let imgUrl = props.imgUrl;

    return {
      head,
      scription,
      imgUrl,
    };
  },
});
</script>
 
<style lang="scss" scoped>
.n-card {
  width: 278px;
  height: 150px;
  padding: 0;
  margin-left: 5px;
  margin-top: 5px;
}
.card {
   width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.card-demo-content {
  width: 70%;
  height: 100%;
}

.card-demo-img {
  width: 30%;
  height: 100%;
  object-fit: contain;
}
</style>

