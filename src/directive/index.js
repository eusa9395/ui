import Vue from 'vue';
import store from '../store';
import sdParamCheckbox from '../components/sdParamCheckbox.vue';
import sdParamSelect from '../components/sdParamSelect.vue';



//引用自定义组件
Vue.component('sdParamCheckbox', sdParamCheckbox);
Vue.component('sdParamSelect', sdParamSelect);

export default Vue.directive('hasPermission', {
  update: function (el, binding) {
    console.log("binding : " + JSON.stringify(binding));
    let menus = store.state.menus;
    console.log("menus : " + JSON.stringify(menus));
    let permission = binding.value;
    console.log("permission : " + permission);
    if(el instanceof HTMLElement) {
      console.log("el instanceof HTMLElement");
    }
    if(el instanceof Node) {
      console.log("el instanceof Node");
    }
    el && el.parentNode && el.parentNode.removeChild(el);
  },
  unbind: function (el) {
    // 卸载，别说了都是泪
    el.handler = function () {};
  }
});
