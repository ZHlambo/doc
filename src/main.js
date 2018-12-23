import Vue from 'vue'
import vueResource from "vue-resource"
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(vueResource)

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
