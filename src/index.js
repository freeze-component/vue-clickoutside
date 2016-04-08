import E from 'oui-dom-events';
import uid from 'uid';

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
    this.trigger = `click.clickoutside.${uid()}`;

    E.on(document, this.trigger, e => {
      if (!this.isParentElement(this.el, e.target) && this.vm) {
        this.vm.$eval(this.expression);
      }
    });
  },

  unbind() {
    E.on(document, this.trigger);
  },

  install(Vue) {
    Vue.directive('clickoutside', {
      bind: this.bind,
      unbind: this.unbind,
      isParentElement: this.isParentElement
    });
  },

  isParentElement(parentElement, element) {
    while (
        element !== null &&
        element !== undefined &&
        element.tagName &&
        element.tagName.toUpperCase() !== 'BODY') {
      if (element === parentElement) {
        return true;
      }
      element = element.parentNode;
    }
    return false;
  }
};
