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
  text-decoration: #42b983 dashed underline;
  text-decoration-thickness: 3px;
  display: inline-block;
  margin: auto;
}
</style>
