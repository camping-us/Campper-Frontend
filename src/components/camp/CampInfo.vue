<template>
  <div id="app">
    <h3 class="underline-green">캠핑장정보</h3>
  </div>
</template>

<script>
import { viewCamp } from "@/api/camp.js";
export default {
  name: "CampInfo",
  data() {
    return {
      info: [],
    };
  },
  created() {
    console.log(this.$route.params.campno);
    viewCamp(
      this.$route.params.campno,
      ({ data }) => {
        this.info = data;
        console.log(this.info);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>
