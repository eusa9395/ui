<template>
    <div>
        <el-submenu :index="menu.menuLink" v-for="(menu, index) in menus" :key="menu.menuCode">

            <template slot="title">
                <i v-if="menu.icon" :class="menu.icon"></i>
                <i v-else class="el-icon-setting"></i>
                <span class="nav-next">{{menu.menuCname}}</span>
            </template>

            <template v-if="menu.children">
                <template  v-for="subMenu in menu.children" >
                     <template v-if="subMenu.children && subMenu.children.length > 0" >
                        <sidebar-item :menus='[subMenu]'> </sidebar-item>
                     </template>
                    <template v-else>
                        <el-menu-item :index="subMenu.menuLink">
                            <i v-if="subMenu.icon" :class="subMenu.icon"></i>
                            <i v-else class="el-icon-setting"></i>
                            <span class="nav-next">{{subMenu.menuCname}}</span>
                        </el-menu-item>
                    </template>
                </template>
            </template>

        </el-submenu>
    </div>
</template>

<script>
    export default {
        name: 'SidebarItem',
        props:{
            menus: {
                type: Array
            }
        }
    }
</script>

