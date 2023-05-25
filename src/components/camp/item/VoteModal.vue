<template>
  <div class="black-bg" v-if="this.modalIsOpen">
    <div class="white-bg">
      <div class="vote">
        <div class="xbox"><button>❌</button></div>
        <div display="margin:10px,auto,0px">
          <h4 class="underline-green" display="text-align:center">✔️투표창✔️</h4>
          <div display="margin-top:10px">
            <li>
              전체평점:
              <rating-radio :selected="selected[0]" @input="selected[0] = $event"></rating-radio>
            </li>
            <li>
              위치_적합도:
              <rating-radio :selected="selected[1]" @input="selected[1] = $event"></rating-radio>
            </li>
            <li>
              청결도:
              <rating-radio :selected="selected[2]" @input="selected[2] = $event"></rating-radio>
            </li>
            <li>
              친절도:
              <rating-radio :selected="selected[3]" @input="selected[3] = $event"></rating-radio>
            </li>
            <li>
              가격_적합도:
              <rating-radio :selected="selected[4]" @input="selected[4] = $event"></rating-radio>
            </li>
            <li>
              부대시설_총합:
              <rating-radio :selected="selected[5]" @input="selected[5] = $event"></rating-radio>
            </li>
          </div>
        </div>
        <button @click="submitVote">!투표 완료!</button>
      </div>
    </div>
  </div>
</template>

<script>
import { registVote } from "@/api/vote.js";
import RatingRadio from "@/components/camp/item/RatingRadio";

export default {
  name: "VoteModal",
  components: {
    RatingRadio,
  },
  props: {
    modalIsOpen: Boolean,
  },
  data() {
    return {
      selected: [0, 0, 0, 0, 0, 0],
      options: [
        { item: 5, name: "최고!(5)" },
        { item: 4, name: "좋아!(4)" },
        { item: 3, name: "보통..(3)" },
        { item: 2, name: "좀별루..(2)" },
        { item: 1, name: "별루.(1)" },
      ],
    };
  },
  methods: {
    submitVote() {
      this.$checkLogin();
      let vote = {
        cleanliness: this.selected[2],
        facilities: this.selected[5],
        kindness: this.selected[3],
        location: this.selected[1],
        price: this.selected[4],
        total: this.selected[0],
      };
      console.log(this.selected);
      registVote(
        this.$route.params.campno,
        vote,
        ({ data }) => {
          this.$printSaveStatus(data.isSuccess);
          console.log(data);
          this.$router.go(this.$route.currentRoute);
          // this.modalIsOpen = false;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
li {
  margin-bottom: 7px;
  display: inline-block;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
  z-index: 9999;
  top: 0px;
  left: 0px;
  display: flex;
}
.white-bg {
  margin: auto;
  width: 450px;
  border-radius: 8px;
  padding: 3px;
  background-color: #ffffbb;
}
.xbox {
  display: flex;
  justify-content: flex-end;
}
.vote {
  border-radius: 10px;
  border: dashed;
  padding: 1px;
}
</style>
