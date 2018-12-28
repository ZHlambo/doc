<template>
  <ul v-if="params" class="tableList">
    <li v-if="params.headers">
      <table class="table">
        <tr>
          <td>参数(headers)</td>
          <td>参数类型</td>
          <td>参数名</td>
          <td>是否必须</td>
        </tr>
        <tr v-for="(item, index) in params.headers" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.type}}</td>
          <td>{{item.desc}}</td>
          <td>{{item.must ? "是" : "否"}}</td>
        </tr>
      </table>
    </li>
    <li v-if="params.data">
      <table class="table">
        <tr>
          <td>参数(data)</td>
          <td>参数类型</td>
          <td>参数名</td>
          <td>是否必须</td>
        </tr>
        <tr v-for="(item, index) in params.data" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.type}}</td>
          <td>{{item.desc}}</td>
          <td>{{item.must ? "是" : "否"}}</td>
        </tr>
      </table>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'ParamsTable',
  props: ["params"],
  data () {
    return {
    };
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
@import "../base.less";

.tableList {
  display: flex;

}
.table {
  border-spacing: 0;
  background: #fff;
  margin-bottom: 10px;
  margin-right: 10px;

  tr:nth-child(2n) {
    background-color: #f8f8f8;
  }
  tr:first-child {
    background: #0088CC;
    color: #fff;
  }
  td {
    padding: 5px 10px;
    border: @border;
  }
}

</style>
