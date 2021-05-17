<template>
  <el-header class="top_nav_styl">
    <i
      :class="['icon_styl',!tabCollapse?'el-icon-s-fold':'el-icon-s-unfold']"
      @click="leftCollapse(tabCollapse)"
    ></i>
    <!-- <el-menu
      :default-active="activeIndex.toString()"
      mode="horizontal"
      text-color="#333333"
      @select="handleSelect"
    >
      <el-menu-item index="1">健康美肤</el-menu-item>
      <el-menu-item index="2">健康店务</el-menu-item>
    </el-menu> -->
     <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    @select="handleSelect"
  >
    <template v-for="(item, index) in topMenus">
      <el-menu-item :index="item.path" :key="index" v-if="index < visibleNumber"
        ><svg-icon :icon-class="item.meta.icon" />
        {{ item.meta.title }}</el-menu-item
      >
    </template>
    <!-- 顶部菜单超出数量折叠 -->
    <el-submenu index="more" v-if="topMenus.length > visibleNumber">
       <template #title>
           更多菜单
          </template>
      <template v-for="(item, index) in topMenus">
        <el-menu-item
          :index="item.path"
          :key="index"
          v-if="index >= visibleNumber"
          ><svg-icon :icon-class="item.meta.icon" />
          {{ item.meta.title }}</el-menu-item
        >
      </template>
    </el-submenu>
  </el-menu>

  </el-header>
</template>

<script>
import { reactive, toRefs, computed, onBeforeMount, onMounted, onBeforeUnmount} from 'vue'
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { constantRoutes } from "@/router";
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
    const store = useStore();
    const router = useRouter();
    const route = useRoute()
     const datastate = reactive({
         // 顶部栏初始数
      visibleNumber: 3,
      // 是否为首次加载
      isFrist: false,
      // 当前激活菜单的 index
      currentIndex: undefined,
        routers:computed(() => {
          return store.state.permission.topbarRouters;
        }),
       topMenus:computed(() => {
          let topMenus = [];
          console.log(datastate.routers)
          datastate.routers.map((menu) => {
            if (menu.hidden !== true) {
              // 兼容顶部栏一级菜单内部跳转
              if (menu.path === "/") {
                  topMenus.push(menu.children[0]);
              } else {
                  topMenus.push(menu);
              }
            }
          });
          console.log(topMenus)
          return topMenus;
       }),
       childrenMenus:computed(() => {
        var childrenMenus = [];
        datastate.routers.map((router) => {
          for (var item in router.children) {
            if (router.children[item].parentPath === undefined) {
              if(router.path === "/") {
                router.children[item].path = "/redirect/" + router.children[item].path;
              } else {
                router.children[item].path = router.path + "/" + router.children[item].path;
              }
              router.children[item].parentPath = router.path;
            }
            childrenMenus.push(router.children[item]);
          }
        });
        return constantRoutes.concat(childrenMenus);
       }),
       activeMenu:computed(() => {
          const path = route.path;
          let activePath = datastate.routers[0].path;
          if (path.lastIndexOf("/") > 0) {
            const tmpPath = path.substring(1, path.length);
            activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"));
          } else if ("/index" == path || "" == path) {
            if (!datastate.isFrist) {
              datastate.isFrist = true;
            } else {
              activePath = "index";
            }
          }
          var routes = datastate.activeRoutes(activePath);
          if (routes.length === 0) {
            activePath = datastate.currentIndex || datastate.routers[0].path
            datastate.activeRoutes(activePath);
          }
          console.log(activePath)
          return activePath;
       }),
       // 根据宽度计算设置显示栏数
    setVisibleNumber:(() => {
      const width = document.body.getBoundingClientRect().width / 3;
      datastate.visibleNumber = parseInt(width / 85);
      console.log(width)
      console.log(datastate.visibleNumber)
    }),
    // 菜单选择事件
    handleSelect: ((key, keyPath) => {
      console.log(key)
      datastate.currentIndex = key;
      if (key.indexOf("http://") !== -1 || key.indexOf("https://") !== -1) {
        // http(s):// 路径新窗口打开
        window.open(key, "_blank");
      } else if (key.indexOf("/redirect") !== -1) {
        // /redirect 路径内部打开
        router.push({ path: key.replace("/redirect", "") });
      } else {
        // 显示左侧联动菜单
        datastate.activeRoutes(key);
      }
    }),
    // 当前激活的路由
    activeRoutes:((key) => {
      var routes = [];
      if (datastate.childrenMenus && datastate.childrenMenus.length > 0) {
        datastate.childrenMenus.map((item) => {
          if (key == item.parentPath || (key == "index" && "" == item.path)) {
            routes.push(item);
          }
        });
      }
      if(routes.length > 0) {
        store.commit("SET_SIDEBAR_ROUTERS", routes);
      }
      console.log(routes)
      return routes;
    })
     })

    onBeforeMount(() => {
      window.addEventListener('resize', datastate.setVisibleNumber)
    })
    onMounted(() => {
     datastate.setVisibleNumber()
    })
    onBeforeUnmount(() => {
     window.removeEventListener('resize', datastate.setVisibleNumber)
    })


      function leftCollapse(e){
        emit('tabCollapse',!e)
      }
const refData = toRefs(datastate);
    return {
      props,
      ...refData,
      leftCollapse,
    }
  },
  computed:{

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
