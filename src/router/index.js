import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Layout from "../layout/index.vue";
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/project/computed/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/project/computed/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/project/computed/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/project/Welcome'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
  // {
  //   path: '/user',
  //   component: Layout,
  //   hidden: true,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'profile',
  //       component: () => require(['@/views/system/user/profile/index'], ),
  //       name: 'Profile',
  //       meta: { title: '个人中心', icon: 'user' }
  //     }
  //   ]
  // },
  // {
  //   path: '/dict',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'type/data/:dictId(\\d+)',
  //       component: () => require(['@/views/system/dict/data'], ),
  //       name: 'Data',
  //       meta: { title: '字典数据', icon: '' }
  //     }
  //   ]
  // },
  // {
  //   path: '/job',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => require(['@/views/monitor/job/log'], ),
  //       name: 'JobLog',
  //       meta: { title: '调度日志' }
  //     }
  //   ]
  // },
  // {
  //   path: '/gen',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'edit/:tableId(\\d+)',
  //       component: () => require(['@/views/tool/gen/editTable'], ),
  //       name: 'GenEdit',
  //       meta: { title: '修改生成配置' }
  //     }
  //   ]
  // }
]
// export const constantRoutes = [
  // {
  //   path: '/login',
  //   component: () => require('@/project/computed/login'),
  //   hidden: true
  // },
  // {
  //   path: '/404',
  //   component: () => require('@/project/computed/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => require('@/project/computed/401'),
  //   hidden: true
  // },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect:"index",
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/project/Welcome.vue'),
  //       name: 'Welcome',
  //       meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
  //     }
  //   ]
  // }
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Layout,
  //   children: [
  //     {
  //       // 当 /user/:id/profile 匹配成功，
  //       // UserProfile 会被渲染在 User 的 <router-view> 中
  //       path: '',
  //       component: () => import('../project/Welcome.vue'),
  //     }
  //   ]
  // }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
// ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes:constantRoutes,
});

export default router;
