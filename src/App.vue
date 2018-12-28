<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 1020px;
  margin: auto;
  font-size: 14px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

li {
  list-style: none;
}
a {
  cursor: pointer;
}
body, html, ul, li  {
  margin: 0;
  padding: 0;
}
</style>
