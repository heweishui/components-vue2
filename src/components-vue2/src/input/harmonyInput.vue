<template>
  <div class="container">
    <h3>{{ title }}：</h3>
    <input :type="type" v-model="data" @keyup.enter="onkeydown" />
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default {
  name: "harmonyInput",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {
      data: "",
    };
  },
  methods: {
    onkeydown() {
      this.$emit("onkeydown", this.data);
    },
  },
};
</script>

<style scoped>
.container {
  width: 90vw;
  height: 10vh;
  background-color: #eee;
}
</style>
