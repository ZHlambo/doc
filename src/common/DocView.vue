<template>
  <ul>
    <li v-for="(item, index) in dataSource" :key="index">
      <div :class="{show: item.show}" class="title" @click="clickItem(index)"> {{item.name}}</div>
      <ul v-if="item.show">
        <li v-for="(route, index) in item.routes" :key="index">
          <p>
            <span class="method">{{route.verb.toUpperCase()}}</span>
            <span>{{route.uri}}</span>
            <span class="btn" @click="showCodeView(route)">try it</span>
          </p>
          <p>{{route.description}}</p>
          <p>{{JSON.stringify(route.body && route.body.example || {})}}</p>
          <textarea :ref="route.verb + route.uri" v-if="route.show"> </textarea>
        </li>
      </ul>
      <DocView v-if="item.data" :data="item.data"/>
    </li>
  </ul>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/blackboard.css";
import "codemirror/addon/lint/lint.css";
import "codemirror/mode/javascript/javascript.js";


export default {
  name: "DocView",
  data () {
    return {
      dataSource: [],
    };
  },
  props: ["data"],
  watch: {
    data (data) {
      this.setData({dataSource: data});
      return data;
    },
  },
  created () {
    console.log(CodeMirror.lint);
    this.setData({dataSource: this.data});
  },
  methods: {
    clickItem (index) {
      let {dataSource} = this;
      dataSource[index].show = !dataSource[index].show;

      if (dataSource[index].show) {
      }
      // 新数组触发渲染
      dataSource = dataSource.concat([]);
      this.setData({dataSource})

    },
    showCodeView (route) {
      route.show = true;
      let {dataSource} = this;
      dataSource = dataSource.concat([]);
      this.setData({dataSource})
      this.$nextTick(() => {
        // QUESTION: 为何是个数组  dom[0]
        let dom = this.$refs[route.verb + route.uri][0];
        // var myCodeMirror = CodeMirror.fromTextArea(myTextArea);  //该方法无效
        let myCodeMirror = CodeMirror(function(elt) {
          dom.parentNode.replaceChild(elt, dom);
        }, {
          value: JSON.stringify(route.body && route.body.example || {}, null, 4),
          mode:  "application/json",
          lineNumbers: true,
          indentUnit: 4,
          theme: "blackboard",
        });
      })
    }
  }
}

</script>
<style lang="less">
@import "../base.less";

.title {
  color: @color-99;
  border-bottom: @border;
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
.method {
  color: @theme;
  font-weight: bold;
  margin-right: @space-30;
}
</style>
