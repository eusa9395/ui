import Vue from 'vue';
import ElementUI from 'element-ui';
import vue_moment from "vue-moment";
import App from './App.vue';
import store from './store';
import directive from './directive';
import router from './router/index';
import * as filters from './filter'; // 全局filter
// 引入自定义指令并注册到全局
import hasRole from './directive/role';
// 封装公共参数和公共方法
import utils from './store/utils';
// ajax 支持
import http from './axios/http';

// css相关
import "../static/styles/main.css";
import 'element-ui/lib/theme-default/index.css'; // 默认主题
import '../static/styles/index.scss';
/*用户自定义样式*/
// import "../static/css/theme-green/color-green.css";   /*浅绿色主题*/
// import '../static/css/theme-green/index.css';       // 浅绿色主题
// es6 语法兼容性处理
import "babel-polyfill";

// import 'element-ui/lib/theme-chalk/index.css' // upgrade to 2.0.0

Vue.use(ElementUI);
Vue.use(vue_moment);


Vue.use(hasRole);


Vue.use(utils);

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

Vue.prototype.http = http;

// 引入自定义组件并注册到全局


// 初始化
new Vue({
    http,
    router,
    store,
    directive,
    render: h => h(App)
}).$mount('#app');
