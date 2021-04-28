<template>
 <el-container>
    <LeftNav :tabCollapse="isCollapse" />
    <el-container direction="vertical">
      <TopNav @tab-collapse="tabCollapse" :tabCollapse="isCollapse"/>
       <TopTab />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import { ref } from "vue";
import LeftNav from "./left_nav.vue";
import TopNav from "./top_nav.vue";
import TopTab from "./top_tab.vue";
export default {
  name: "Index",
  components: {
    LeftNav,
    TopNav,
    TopTab
  },
  setup() {
    const isCollapse = ref(false)
    function tabCollapse (params) {
      isCollapse.value = params
    }
    return {
      isCollapse,
      tabCollapse
    };
  },
};
</script>

<style scoped lang="less">

</style>
