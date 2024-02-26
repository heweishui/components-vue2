import { harmonyInput } from "./input";
import Vue, { VueConstructor } from "vue";
const components = [harmonyInput];
const harmony_input: { install: (Vue: VueConstructor<Vue>) => void } = {
  install(Vue: VueConstructor<Vue>) {
    // 组件的安装逻辑
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};

export default harmony_input;
