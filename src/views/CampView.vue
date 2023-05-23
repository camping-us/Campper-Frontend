<template>
  <b-container class="bv-example-row mt-3 text-center">
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "CampView",
};
</script>

<style>
.underline-green {
  text-decoration: #42b983 wavy underline;
  text-decoration-thickness: 3px;
  display: inline-block;
  /* background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, #42b983 30%); */
}
</style>
