<template>
  <el-aside :style="{width:tabCollapse?'auto':'200px'}" class="navleft">
    <el-scrollbar class="pagescroll">
      <el-menu
        :default-active="activeMenu"
        :collapse="tabCollapse"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#FF4988"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <template #title>导航二</template>
  </el-menu-item>
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path  + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { useStore,mapGetters, mapState } from "vuex";
import { computed,getCurrentInstance } from 'vue'
import SidebarItem from "./SidebarItem";
export default {
  name: "LeftNav",
  props:{
    tabCollapse: {
        type: Boolean,
        reuquired: true,
        default: false
    }
  },
  components: {
  SidebarItem
  },
  computed:{
  ...mapGetters(["sidebarRouters"]),
  },
   setup(props,context) {
      // const store = useStore();
    //  let sidebarRouters = computed(() =>store.getters.sidebarRouters.sidebarRouters)
   
      let activeMenu = computed(() =>　{
          const { ctx } = getCurrentInstance()
          const route = ctx.$router.currentRoute.value
          const { meta, path } = route;
        if (meta.activeMenu) {
              return meta.activeMenu;
          }
          return path;
      })
    return { activeMenu}
  },
  created(){
      console.log(this.sidebarRouters)
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>


<style scoped lang="less">
.pagescroll {
  background: @primary-bg;
  height: 100%;
    ::v-deep(.submenu-title-noDropdown,.el-submenu__title){
      &:hover {
        background-color: rgba(0, 0, 0, 0.06) !important;
      }
    }
       ::v-deep(.submenu-title-noDropdown) {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;

        .svg-icon {
          margin-left: 20px;
        }
      }
    }
//   ::v-deep(.el-menu--collapse .el-submenu > .el-submenu__title span){
//     height: 0;
//     width: 0;
//     overflow: hidden;
//     visibility: hidden;
//     display: inline-block;
// }
}

</style>
