<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Login />
    <FeedRegister />
    <FeedList />
    <!--    <upload></upload>-->
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import FeedRegister from "./components/FeedRegister.vue";
import FeedList from "./components/FeedList.vue";
// import Upload from "./components/Upload.vue";

export default {
  name: "App",
  components: {
    Login,
    FeedRegister,
    FeedList,
    // Upload,
  },
};
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
