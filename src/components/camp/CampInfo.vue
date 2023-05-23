<template>
  <div id="app">
    <h3 class="underline-green">캠핑장정보</h3>
    <b-container class="bv-example-row" id="grid">
      <b-row>
        <b-col sm="8">col-sm-8</b-col>
        <b-col sm="4">
          <!-- col-sm-4 -->
          <div id="subHead">투표 결과</div>
          <div id="vote-box">
            <li>전체평점: {{ this.calculate(vote.total / vote.voteCount) }}</li>
            <li>위치_적합도: {{ this.calculate(vote.location / vote.voteCount) }}</li>
            <li>청결도: {{ this.calculate(vote.cleanliness / vote.voteCount) }}</li>
            <li>친절도: {{ this.calculate(vote.kindness / vote.voteCount) }}</li>
            <li>가격_적합도: {{ this.calculate(vote.price / vote.voteCount) }}</li>
            <li>부대시설_총합: {{ this.calculate(vote.facilities / vote.voteCount) }}</li>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { viewCamp } from "@/api/camp.js";
export default {
  name: "CampInfo",
  data() {
    return {
      info: [],
      vote: null,
    };
  },
  created() {
    console.log(this.$route.params.campno);
    viewCamp(
      this.$route.params.campno,
      ({ data }) => {
        this.info = data.data.info;
        this.vote = data.data.vote;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    calculate(num) {
      return isNaN(num) ? 0.0 : num;
    },
  },
};
</script>

<style scoped>
#grid {
  margin-top: 50px;
}
#vote-box {
  /* background-color: rgba(255, 255, 255, 0.8); */
  border-radius: 10px;
  width: 80%;
  height: 100%;
  margin: auto;
}
#subHead {
  /* font-weight: bold; */
  font-size: 20px;
}
</style>
