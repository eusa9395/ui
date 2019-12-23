<template>
    <el-menu :default-active="$route.path" theme="dark" mode="vertical" router>
        <sidebar-item :menus='menus'> </sidebar-item>
    </el-menu>
</template>

<script>
    import SidebarItem from './SidebarItem'

    export default {
        components: {SidebarItem},
        name: 'Sidebar',
      data() {
          return {
              menus: [
              ]
          }
      },
//      computed:{
//          onRoutes(){
//              return this.$route.path.replace('/','');
//          }
//      },
      methods: {
          initMenus() {
              Promise.resolve(this.$store.dispatch('loadMenus')).then(() => {
                this.menus = this.$store.getters.menus;
              });
          }
      },
      created() {
          this.initMenus();
      }
    }
</script>

