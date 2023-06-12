<template>
  <div id="app">
    <the-header-navbar></the-header-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar";

export default {
  name: "App",
  components: {
    TheHeaderNavbar,
  },
};
</script>

<style>
@font-face {
  font-family: "bitbit";
  src: url("//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff"),
    url("//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff2");
}

@font-face {
  font-family: "DungGeunMo";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

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
