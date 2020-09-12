<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Login/>
    <Feed/>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Feed from './components/Feed.vue'

export default {
  name: 'App',
  components: {
    Login,
    Feed
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
