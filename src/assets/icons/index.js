import { createApp } from 'vue'
import App from "../../App.vue";
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
const app = createApp(App)
createApp(app).component('svg-icon', SvgIcon)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)