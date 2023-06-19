<template>
  <div id="app">
    <the-header-navbar></the-header-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar";
import "@/assets/font.css";

export default {
  name: "App",
  components: {
    TheHeaderNavbar,
  },
};
</script>

<style>
#app {
  font-family: DungGeunMo, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.underline-green {
  text-decoration: #42b983 dashed underline;
  text-decoration-thickness: 3px;
  text-align: center;
  display: inline-block;
  margin: auto;
}
</style>
