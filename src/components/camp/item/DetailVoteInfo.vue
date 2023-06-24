<template>
  <div id="vote-box">
    <li>전체평점: {{ this.calculate(vote.total / vote.voteCnt) }}</li>
    <li>
      위치_적합도:
      {{ this.calculate(vote.location / vote.voteCnt) }}
    </li>
    <li>청결도: {{ this.calculate(vote.cleanliness / vote.voteCnt) }}</li>
    <li>친절도: {{ this.calculate(vote.kindness / vote.voteCnt) }}</li>
    <li>가격_적합도: {{ this.calculate(vote.price / vote.voteCnt) }}</li>
    <li>
      부대시설_총합:
      {{ this.calculate(vote.facilities / vote.voteCnt) }}
    </li>
    <button id="voteBtn" @click="openVote">
      <div v-if="!isVote">
        나도_투표하기:
        <img
          id="btn_img"
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Right%20Light%20Skin%20Tone.png"
        />
      </div>
      <div v-if="isVote">
        다시_투표하기:
        <img
          id="btn_img"
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Left%20Light%20Skin%20Tone.png"
        />
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "DetailVoteInfo",
  components: {},
  props: {
    vote: Object,
    isVote: Boolean,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  mounted() {},
  methods: {
    calculate(num) {
      return isNaN(num) ? "0.0" : num.toFixed(1);
    },
    openVote() {
      this.isOpen = !this.isOpen;
    },
  },
  watch: {
    isOpen() {
      this.$emit("open", this.isOpen);
    },
    // isVote() {
    //   this.$emit("vote", this.isVote);
    // },
  },
};
</script>

<style scoped>
li {
  margin-top: 10px;
}
#vote-box {
  border-radius: 10px;
  border: dashed;
  box-shadow: 10px 10px 5px gray;
  width: 80%;
  height: 100%;
  margin: auto;
  padding: 15px;
  background-color: #ffffbb;
}
#voteBtn {
  border-radius: 3px;
  margin-top: 30px;
}
#btn_img {
  width: 25px;
  height: 25px;
}
</style>
