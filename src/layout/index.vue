<template>
 <el-container :class="isCollapse?'hideSidebar':'showSiderbar'">
    <sidebar :tabCollapse="isCollapse" class="sidebar-container"  />
    <el-container direction="vertical">
      <TopNav @tab-collapse="tabCollapse" :tabCollapse="isCollapse"/>
       <TopTab />
      <el-main>
        <router-view :key="key" />
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import { reactive, toRefs, computed,ref } from "vue";
import { useRoute } from "vue-router";
import { Sidebar } from './components'
import TopNav from "./top_nav.vue";
import TopTab from "./top_tab.vue";
export default {
  name: "Index",
  components: {
    Sidebar,
    TopNav,
    TopTab
  },
  setup() {
    const route = useRoute()
    const isCollapse = ref(false)
    const datastate=reactive({
      key:computed(() => {
        return route.path;
      }),
    })
  
    function tabCollapse (params) {
      isCollapse.value = params
    }
    const refData = toRefs(datastate);
    return {
      ...refData,
      isCollapse,
      tabCollapse
    };
  },
};
</script>

<style scoped lang="less">

</style>
