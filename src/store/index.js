import { createStore } from "vuex";
import permission from './modules/permission'
import user from './modules/user'
import getters from './getters'
export default createStore({
  modules: {
    permission,
    user
  },
  getters
});
