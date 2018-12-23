<template>
  <ul>
    <li v-for="(item, index) in dataSource" :key="index">
      <div :class="{show: item.show}" class="title" @click="clickItem(index)"> {{item.name}}</div>
      <ul v-if="item.show">
        <li v-for="(route, index) in item.routes" :key="index">
          <p>
            <span class="method">{{route.verb.toUpperCase()}}</span>
            <span>{{route.uri}}</span>
          </p>
          <p>{{route.description}}</p>
        </li>
      </ul>
      <DocView v-if="item.data" :data="item.data"/>
    </li>
  </ul>
</template>

<script>

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
    this.setData({dataSource: this.data});
  },
  methods: {
    clickItem (index) {
      let {dataSource} = this;
      dataSource[index].show = !dataSource[index].show;
      // 新数组触发渲染
      dataSource = dataSource.concat([]);
      this.setData({dataSource})
    },
  }
}

</script>
<style lang="less">
@import "../base.less";

.title {
  color: @color-66;
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
