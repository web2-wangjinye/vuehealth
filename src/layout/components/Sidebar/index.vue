<template>
  <div  class="navleft">
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
        class="el-menu-vertical-demo"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path  + index"
          :item="route"
          :base-path="route.path"
        />

      </el-menu>
    </el-scrollbar>
  </div>
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
    return { activeMenu }
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
  ::v-deep(.el-menu-item){
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    .svg-icon{
      margin-right:4px;
    }
  }
  ::v-deep(.el-submenu__title){
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    .svg-icon{
      margin-right:4px;
    }
  }
}

</style>
