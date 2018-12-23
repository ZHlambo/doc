<template>
  <div class="filterBg">
      <ul class="filter">
        <li v-for="(data, index) in dataSource" :key="index" :class="{active: current === index}" @click="changeItem(index)"> {{data.name}} </li>
      </ul>
      <div class="filterContainer">
        <slot v-for="(data, index) in dataSource" :name="data[value]" v-if="dataSource[current][value] === data[value]"></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'FilterView',
  data () {
    return {
      name: "name",
      value: "value",
      current: 0
    }
  },
  props: ['dataSource', 'options'],
  watch: {
    options (options) {
      if (options) {
        this.setData({...options});
      }
      return options;
    },
    dataSource (dataSource) {
      if (dataSource && dataSource.length > 0) {
        this.setData({current: 0});
      }
      return dataSource;
    },
  },
  mounted () {
  },
  methods: {
    changeItem (index) {
      this.setData({current: index});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../base.less";

.filterBg {
  background: @bg;
  padding: @space-30;
}
.filter {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  >li {
    padding: @space-10 @space-30;
    cursor: pointer;
  }
  .active {
    background: white;
    border-radius: 5px 5px 0 0;
  }
}
.filterContainer {
  background: white;
  padding: @space-20;
}
</style>
