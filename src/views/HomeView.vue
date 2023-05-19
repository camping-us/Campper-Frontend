<template>
  <div class="home">
    <b-container class="bv-example-row" max-width: 100%>
      <b-row>
        <b-col>
          <main-carousel></main-carousel>
        </b-col>
        <b-col>
          <main-card></main-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MainCarousel from "@/components/main/MainCarousel.vue";
import MainCard from "@/components/main/MainCard.vue";

export default {
  name: "HomeView",
  components: {
    MainCarousel,
    MainCard,
  },
};
</script>
