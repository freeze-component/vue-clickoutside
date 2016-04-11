/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="show = false">
 * ```
 */
export default {
  bind() {
    this.handler = (e) => {
      if (this.vm && !this.el.contains(e.target)) {
        this.vm.$eval(this.expression);
      }
    };
    document.addEventListener('click', this.handler);
  },

  unbind() {
    document.removeEventListener('click', this.handler);
  },

  install(Vue) {
    Vue.directive('clickoutside', {
      bind: this.bind,
      unbind: this.unbind
    });
  }
};
