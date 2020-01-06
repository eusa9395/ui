import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../layout/Layout.vue';
import invoke_api_log from "../page/invoke_api_log.vue";
import created_order from "../page/created_order.vue";
/*系统设置页面*/
import paramSetting from "../page/sysManagement/paramSetting.vue";
import companyManage from "../page/sysManagement/companyManage.vue";
import deptManage from "../page/sysManagement/deptManage.vue";
import storeManage from "../page/sysManagement/storeManage.vue";
import groupManage from "../page/sysManagement/groupManage.vue";
import peopleManage from "../page/sysManagement/peopleManage.vue";
import roleManage from "../page/sysManagement/roleManage.vue";
import ipManage from "../page/sysManagement/ipManage.vue";
import regionSetting from "../page/dicManagement/regionManage.vue";
import streetSetting from "../page/dicManagement/streetManage.vue";
import communitySetting from "../page/dicManagement/communityManage.vue";



Vue.use(VueRouter);

export default new VueRouter({
    //mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            name: '',
            path: '/',
            redirect: '/home',
            hidden: true
        },
        {
            name: '首页',
            path: '/home',
            component: Layout,
            children:[
                {
                    name: '接口监控页面',
                    path: '/invoke_api_log',
                    component: invoke_api_log
                },{
                    name:'监控主页面',
                    path:'/created_order',
                    component:created_order
                }
            ]
        },{
            name: '参数设置',
            path: '/paramSetting',
            component: Layout,
            children:[
               {
                    name: '参数管理',
                    path: '/paramSetting',
                    component: paramSetting
                },{
                    name: '公司管理',
                    path: '/companyManage',
                    component: companyManage
                },{
                    name: '部门管理',
                    path: '/deptManage',
                    component: deptManage
                },{
                    name: '门店管理',
                    path: '/storeManage',
                    component: storeManage
                },{
                    name: '小组管理',
                    path: '/groupManage',
                    component: groupManage
                },{
                    name: '人员管理',
                    path: '/peopleManage',
                    component: peopleManage
                },{
                    name: '角色管理',
                    path: '/roleManage',
                    component: roleManage
                },{
                    name: '可登录Ip管理',
                    path: '/ipManage',
                    component: ipManage
                }
            ]
        },{
            name: '字典管理',
            path: '/regionSetting',
            component: Layout,
            children:[
               {
                    name: '区域管理',
                    path: '/regionSetting',
                    component: regionSetting
                },{
                    name: '街道管理',
                    path: '/streetSetting',
                    component: streetSetting
                },{
                    name: '小区管理',
                    path: '/communitySetting',
                    component: communitySetting
                }
            ]
        }
    ]
});

// 全局导航钩子
// router.beforeEach((to, from, next) => {
//     console.log("to.meta.requireAuth = " + to.meta.requireAuth);
//     if (to.meta.requireAuth) {
//  		    // console.log(isEmptyObject(store.state.user))
//  		    if(!isEmptyObject(store.state.user)) {
//  			      next();
//  		    } else {
//           console.log("next to login");
//           next({
//                 path: '/login',
//                 query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           })
//         }
//     } else {
//  		    next();
//  	  }
// })
