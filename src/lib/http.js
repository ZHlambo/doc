import Vue from 'vue';
import config from "./config.js";

const methods = ["get", "put", "delete", "post"];

let obj = {};
methods.forEach(method => {
  obj[method] = (url) => {
    return Vue.http.get(config.host + url).then(res => {
      try {
        res = res.json();
      } catch (e) {
        throw e;
      } finally {

      }
      return res;
    });
  }
})
export default obj;
