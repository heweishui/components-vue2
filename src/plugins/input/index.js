//
//
//
//
//
//
//
//

var script = {
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

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "container" },
    [
      _c("h3", [_vm._v(_vm._s(_vm.title) + "：")]),
      _vm._v(" "),
      _vm.type === "checkbox"
        ? _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.data,
                expression: "data",
              },
            ],
            attrs: { type: "checkbox" },
            domProps: {
              checked: Array.isArray(_vm.data)
                ? _vm._i(_vm.data, null) > -1
                : _vm.data,
            },
            on: {
              keyup: function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                return _vm.onkeydown.apply(null, arguments)
              },
              change: function ($event) {
                var $$a = _vm.data,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false;
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v);
                  if ($$el.checked) {
                    $$i < 0 && (_vm.data = $$a.concat([$$v]));
                  } else {
                    $$i > -1 &&
                      (_vm.data = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                  }
                } else {
                  _vm.data = $$c;
                }
              },
            },
          })
        : _vm.type === "radio"
        ? _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.data,
                expression: "data",
              },
            ],
            attrs: { type: "radio" },
            domProps: { checked: _vm._q(_vm.data, null) },
            on: {
              keyup: function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                return _vm.onkeydown.apply(null, arguments)
              },
              change: function ($event) {
                _vm.data = null;
              },
            },
          })
        : _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.data,
                expression: "data",
              },
            ],
            attrs: { type: _vm.type },
            domProps: { value: _vm.data },
            on: {
              keyup: function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                return _vm.onkeydown.apply(null, arguments)
              },
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.data = $event.target.value;
              },
            },
          }),
      _vm._v(" "),
      _vm._t("default"),
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-5af35222_0", { source: "\n.container[data-v-5af35222] {\n  width: 90vw;\n  height: 10vh;\n  background-color: #eee;\n}\n", map: {"version":3,"sources":["D:\\Project\\components\\components-vue2\\src\\components-vue2\\src\\input\\harmonyInput.vue"],"names":[],"mappings":";AAoCA;EACA,WAAA;EACA,YAAA;EACA,sBAAA;AACA","file":"harmonyInput.vue","sourcesContent":["<template>\n  <div class=\"container\">\n    <h3>{{ title }}：</h3>\n    <input :type=\"type\" v-model=\"data\" @keyup.enter=\"onkeydown\" />\n    <slot></slot>\n  </div>\n</template>\n\n<script>\nimport { defineComponent } from \"vue\";\nexport default {\n  name: \"harmonyInput\",\n  props: {\n    title: {\n      type: String,\n      default: \"标题\",\n    },\n    type: {\n      type: String,\n      default: \"text\",\n    },\n  },\n  data() {\n    return {\n      data: \"\",\n    };\n  },\n  methods: {\n    onkeydown() {\n      this.$emit(\"onkeydown\", this.data);\n    },\n  },\n};\n</script>\n\n<style scoped>\n.container {\n  width: 90vw;\n  height: 10vh;\n  background-color: #eee;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-5af35222";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export { __vue_component__ as harmonyInput };
