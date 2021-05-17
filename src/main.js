import { createApp } from "vue";
// import {installElement} from "./plugins/elements";
// import './style/element/theme/index.css'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import 'lib-flexible'//适配
import SvgIcon from '@/components/SvgIcon'// svg icon component
import './permission' //权限

const app = createApp(App)

app.component('svg-icon', SvgIcon)
const req = require.context('./assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// installElement(app)
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
app
.use(ElementPlus)
.use(store)
.use(router)
.mount("#app");
