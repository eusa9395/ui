<template>
    <el-menu class="navbar" mode="horizontal">
        <Hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></Hamburger>
        <levelbar></levelbar>
        <div class="back-index">
            <a href="/ams">返回首页</a>
        </div>
    </el-menu>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Levelbar from './Levelbar';
    import Hamburger from '../components/Hamburger';

    export default {
      components: {
        Levelbar,
        Hamburger
      },
      data() {
        return {
        }
      },
      computed: {
        ...mapGetters([
          'sidebar',
          'name',
          'avatar'
        ])
      },
      methods: {
        toggleSideBar() {
          this.$store.dispatch('ToggleSideBar')
        }
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 40px;
        line-height: 40px;
        border-radius: 0 !important;
        .hamburger-container {
            line-height: 38px;
            height: 40px;
            float: left;
            padding: 5px 5px;
        }
    }
    .back-index {
        float: right;
        padding-right: 40px;
        font-size: 14px;
    }
</style>
