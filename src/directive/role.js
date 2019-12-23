import Vue from 'vue';
import store from '../store';

export default Vue.directive('hasRole', {
    inserted: function (el, binding) {
        console.group("directive - hasRole");
        console.log("el.type:" + el.type);
        console.log("el.methods:" + el.methods);
        console.log("binding : " + binding.value);
        console.groupEnd();

        // 获取当前登录用户的角色
        let userRole = store.state.app.userInfo;
        console.log("userRole:" + userRole);
        if (binding.value.toString().indexOf(userRole) !== -1) {
            console.log("当前用户有访问权限，角色为" + userRole);
        } else {
            console.log("当前用户没有访问权限，角色为" + userRole);
            // 对元素进行操作
            // 隐藏元素
            // el.style.visibility = "hidden";
            // 删除元素
            el.remove();
        }
    }
});

