<template>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
        <div class="sidebar-wrapper">
            <Sidebar class="sidebar-container"/>
        </div>
        <div class="main-container">
            <Navbar/>
            <App-main/>
        </div>
    </div>
</template>

<script>
    import Navbar from './Navbar';
    import Sidebar from './Sidebar';
    import AppMain from './AppMain';
    // import { Loading } from 'element-ui';
    // let loadingInstance;
    export default {
      name: 'layout',
      components: {
        Navbar,
        Sidebar,
        AppMain
      },
      computed: {
        sidebar() {
          return this.$store.state.app.sidebar;
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
     /* css of  Layout.vue */
    @import "../../static/styles/mixin";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        padding-left: 180px;
        &.hideSidebar {
            padding-left: 40px;
            .sidebar-wrapper {
                transform: translate(-140px, 0);
                .sidebar-container {
                    transform: translate(132px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
        }
        .sidebar-wrapper {
            width: 180px;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 2;
            overflow-x: hidden;
            transition: all .28s ease-out;
            @include scrollBar;
        }
        .sidebar-container {
            transition: all .28s ease-out;
        }
    }
</style>
