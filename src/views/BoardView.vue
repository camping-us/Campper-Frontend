<template>
    <b-container class="bv-example-row mt-3 text-center">
      <h3 class="underline-green">게시판</h3>
      <router-view></router-view>
    </b-container>
</template>

<script>
export default {
  name: "BoardView",
};
</script>

<style scoped>
.underline-green {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, #42b983 30%);
}
</style>