<template>
  <div class="home">
    <FilterView :options="{value: 'name'}" :dataSource="docs">
      <DocView v-for="(doc, index) in docs"  :slot="doc.name" :key="index" :data="doc.data"/>
    </FilterView>
  </div>
</template>

<script>
import http from "../lib/http.js";
import DocView from "../common/DocView.vue";
import FilterView from "../components/FilterView.vue";
import data from "../lib/data.js"

export default {
  name: 'home',
  components: {
    DocView,
    FilterView
  },
  data () {
    return {
      docs: []
    };
  },
  mounted () {
      this.setData({docs: data})
      console.log(data);

    // http.get("/api/docs").then(res => {
    //   let docs = [];
    //   for (let key in res) {
    //     docs.push({name: key, data: res[key]});
    //   }
    //   this.setData({docs})
    //   console.log(JSON.stringify(docs));
    // })
  }
}
</script>
