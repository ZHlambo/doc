<template>
  <ul class="ulView">
    <li v-for="(item, index) in dataSource" :key="index">
      <div :class="{show: item.show}" class="title" @click="clickRoute(index)" > {{item.name}}</div>
      <ul v-show="item.show">
        <li v-for="(route, index) in item.routes" :key="index" class="route">
          <div @click="showCodeView(route)">
            <p>
              <span class="method">{{route.verb.toUpperCase()}}</span>
              <span v-for="(str, index) in route.uriArr" :key="index" class="url">
                <span v-if="!str.key">
                  <span>{{str}}</span>
                  <span v-if="route.uriArr.length - 1 !== index">/</span>
                </span>
                <span v-else>
                  <input v-if="route.show" :placeholder="str.key" :value="str.value" @input="e => str.value = e.target.value" @click.stop="'javascript:void();'">
                  <span v-else>:{{str.key}}</span>
                  <span v-if="route.uriArr.length - 1 !== index">/</span>
                </span>
              </span>
              <span class="btn" v-show="route.show" @click.stop="sendHttp(route)">try it</span>
            </p>
            <p>{{route.description}}</p>
          </div>
          <ParamsTable :params="route.body && route.body.params"/>
          <div class="reqAndRes" v-show="route.show">
            <div class="">
              <div :ref="getRefStr(route).req"></div>
            </div>
            <div class="">
              <div :ref="getRefStr(route).res"></div>
            </div>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import ParamsTable from "./ParamsTable.vue";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/blackboard.css";
import "codemirror/addon/lint/lint.css";
import "codemirror/mode/javascript/javascript.js";

const getRefStr = (route) => {
  return {
    req: 'req_' + route.verb + route.uri,
    res: 'res_' + route.verb + route.uri,
  };
}

export default {
  name: "DocView",
  components: {
    ParamsTable
  },
  data () {
    return {
      dataSource: [],
      getRefStr,
    };
  },
  props: ["data"],
  watch: {
    dataSource (dataSource) {
      let uriArr = [];
      dataSource.map(item => {
        for (let j = 0; j < item.routes.length; j++) {
          uriArr = item.routes[j].uri.split("/");
          uriArr = uriArr.map(item => {
            if (item.indexOf(":") !== -1) {
              item = {
                key: item.replace(":",""),
                value: ""
              }
            }
            return item;
          })
          item.routes[j].uriArr = uriArr;
        }
      })
      console.log(dataSource);
      return dataSource;
    },
  },
  created () {
    this.setData({dataSource: this.data});
  },
  methods: {
    asd(e){console.log(e);},
    clickRoute (index) {
      let {dataSource} = this;
      dataSource[index].show = !dataSource[index].show;
      // 新数组触发渲染
      dataSource = dataSource.concat([]);
      this.setData({dataSource})

    },
    showCodeView (route) {
      route.show = !route.show;
      let {dataSource} = this;
      dataSource = dataSource.concat([]);
      this.setData({dataSource});

      if (!route.reqMirror) {
        // QUESTION: 为何是个数组  dom[0]
        this.$nextTick(() => {
          let req = this.$refs[getRefStr(route).req][0];
          let res = this.$refs[getRefStr(route).res][0];
          // var myCodeMirror = CodeMirror.fromTextArea(myTextArea);  //该方法无效
          let params = route.body && route.body.example || {}
          let headers = route.body && route.body.headers || {}

          route.reqMirror = CodeMirror(req, {
            value: JSON.stringify({params, headers}, null, 4),
            mode:  "application/json",
            lineNumbers: true,
            indentUnit: 4,
            theme: "blackboard",
          });


          route.resMirror = new CodeMirror(res, {
            value: JSON.stringify(route.body && route.body.example || {}, null, 4),
            mode:  "application/json",
            lineNumbers: true,
            indentUnit: 4,
          });
          let {dataSource} = this;
          dataSource = dataSource.concat([]);
          this.setData({dataSource});
        });
      }
    },
    sendHttp (route) {
      console.log(route);
      let req = route.reqMirror.getValue();
      try {
        req = JSON.parse(req);
      } catch (e) {
        route.reqError = "请输入正确的JSON格式";
        alert("请输入正确的JSON格式");
      }
      let url = route.uri;
      route.uriArr.map(item => {
        if (item.key) {
          if (!item.value) {
            route.reqError = `请输入正确${item.key}`;
            alert(`请输入正确${item.key}`);
            return ;
          } else {
            url = url.replace(`:${item.key}`, item.value);
          }
        }
      })
      this.$_http[route.verb](url, req.params, req.headers).then(res => {
        route.resMirror.setValue(JSON.stringify(res || {}, null, 4))
      });
    }
  }
}

</script>
<style lang="less">
@import "../base.less";

.ulView {
  >li {
    border-bottom: @border;
  }
}
.title {
  color: @color-99;
  cursor: pointer;
  padding: @space-10 0;
  font-weight: bold;
  &:hover {
    color: @color-33;
  }
  &.show {
    color: @color-33;
  }
}
.route {
  background: @bg;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  >div:first-child {
    cursor: pointer;
    >p {
      margin: 0 0 10px 0;
    }
  }
  .method {
    color: @theme;
    font-weight: bold;
    margin-right: @space-10;
  }
  .url {
    input {
      width: 50px;
      border-radius: 4px;
      border: @border;
      padding: 3px 5px;
      margin: 0 3px;
      outline: none;
      &:focus {
        border-color: @theme;
      }
    }
  }
}
.reqAndRes {
  display: flex;
  >* {
    width: 50%;
  }
}
</style>
