<template>
  <el-header class="top_nav_styl">
    <i
      :class="['icon_styl',!tabCollapse?'el-icon-s-fold':'el-icon-s-unfold']"
      @click="leftCollapse(tabCollapse)"
    ></i>
    <el-menu
      :default-active="activeIndex.toString()"
      mode="horizontal"
      text-color="#333333"
      @select="handleSelect"
    >
      <el-menu-item index="1">健康美肤</el-menu-item>
      <el-menu-item index="2">健康店务</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
import { ref } from "vue";
export default {
  name: "TopNav",
  props: {
        tabCollapse: {
            type: Boolean,
            reuquired: true,
            default: false
        }
    },
   setup(props,{ emit }) {
      const activeIndex = 2
      function leftCollapse(e){
        emit('tabCollapse',!e)
      }
      function handleSelect(key,keyPath){
        console.log(key, keyPath);
      }
    return {
      props,
      activeIndex,
      leftCollapse,
      handleSelect
    }
  }
};
</script>


<style scoped lang="less">
.top_nav_styl {
  display: flex;
  align-items: center;
  border-bottom: 1px solid @line-color;
  .icon_styl {
    font-size: 24px;
    margin-right: 20px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: 0px;
    > .el-menu-item.is-active{
      background: @primary-color;
      color: @white-color
    }
  } 
}
</style>
