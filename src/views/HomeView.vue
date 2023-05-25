<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <main-fire></main-fire>
        <main-campper></main-campper>
        <main-developer></main-developer>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import MainFire from "@/components/main/MainFire.vue";
import MainCampper from "@/components/main/MainCampper.vue";
import MainDeveloper from "@/components/main/MainDeveloper.vue";

export default {
  name: "HomeView",
  components: {
    MainFire,
    MainCampper,
    MainDeveloper,
  },
};
</script>
