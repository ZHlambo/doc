import Vue from 'vue'
import vueResource from "vue-resource"
import App from './App.vue'
import router from './router'
import store from './store'
import http from "./lib/http.js"

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.prototype.$_http = http;

Vue.mixin({
  methods:{
    setData: function (obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          this[key] = obj[key];
        }
      }
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
