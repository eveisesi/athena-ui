import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
// import alert from "./modules/alert"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    // alert,
  }
});

if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept(["./modules/auth"], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output

    store.hotUpdate({
      modules: {
        auth: require("./modules/auth").default // swap in the new modules and mutations
      }
    });
  });
}

export default store;
