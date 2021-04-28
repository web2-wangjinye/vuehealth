<template>
  <el-aside :style="{width:tabCollapse?'auto':'200px'}" class="navleft">
    <el-scrollbar class="pagescroll">
      <el-menu
        default-active="1-1"
        :collapse="tabCollapse"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#FF4988"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
      <!-- <sidebar-item
            v-for="(route, index) in sidebarRouters"
            :key="route.path  + index"
            :item="route"
            :base-path="route.path"
        /> -->
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>门店管理</span>
          </template>
          <el-menu-item index="1-1">
             <span>品牌列表</span>
          </el-menu-item>
          <el-menu-item index="1-2">
             <span>门店区域</span>
          </el-menu-item>
            <el-menu-item index="1-3">
             <span>门店列表</span>
          </el-menu-item>
          <el-menu-item index="1-4">
             <span>门店标签</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template #title>
            <i class="el-icon-location"></i>
            <span>员工管理</span>
          </template>
          <el-menu-item index="2-1">
             <span>员工列表</span>
          </el-menu-item>
          <el-menu-item index="2-2">
             <span>职位列表</span>
          </el-menu-item>
        </el-submenu>
             <el-submenu index="3">
          <template #title>
            <i class="el-icon-location"></i>
            <span>客户管理</span>
          </template>
          <el-menu-item index="3-1">
             <span>客户列表</span>
          </el-menu-item>
          <el-menu-item index="3-2">
             <span>会员卡设置</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { useStore } from "vuex";
import { computed,getCurrentInstance } from 'vue'
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
  
  },
   setup() {
      const store = useStore();
      console.log(store.state)
     let sidebarRouters = computed(() =>state.permission.sidebarRouters)
      let activeMenu = computed(() =>　{
          const { ctx } = getCurrentInstance()
          const route = ctx.$router.currentRoute.value
          const { meta, path } = route;
        if (meta.activeMenu) {
              return meta.activeMenu;
          }
          return '1-1';
      })
    return { activeMenu, sidebarRouters}
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
}
</style>
