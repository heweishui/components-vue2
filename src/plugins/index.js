import { harmonyInput as __vue_component__ } from './input/index.js';

var components = [__vue_component__];
var harmony_input = {
    install: function (Vue) {
        // 组件的安装逻辑
        components.forEach(function (component) {
            Vue.component(component.name, component);
        });
    },
};

export { harmony_input as default };
