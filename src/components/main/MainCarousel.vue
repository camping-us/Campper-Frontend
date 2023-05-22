<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      indicators
      background="#fafafa"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Slides with custom text -->
      <b-carousel-slide>
        <template #img>
          <img src="@/assets/camp1.jpg" width="1024" height="480" alt="image slot" />
        </template>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide>
        <template #img>
          <img src="@/assets/camp2.jpg" width="1024" height="480" alt="image slot" />
        </template>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide>
        <template #img>
          <img src="@/assets/camp3.jpg" width="1024" height="480" alt="image slot" />
        </template>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <b-carousel-slide>
        <template #img>
          <img src="@/assets/camp4.jpg" width="1024" height="480" alt="image slot" />
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>
