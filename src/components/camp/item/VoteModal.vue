<template>
  <div class="black-bg" v-if="modalIsOpen">
    <div class="white-bg">
      <div class="vote">
        <button class="xbox" @click="modalIsOpen = false">❌</button>
        <div>
          <h4 class="underline-green">✔️투표창✔️</h4>
          <li display="line-block">
            전체평점:
            <b-form-radio-group
              display="inline-block"
              :options="ratingOptions"
              class="mb-3"
              value-field="item"
              text-field="name"
            ></b-form-radio-group>
          </li>
          <li>
            위치_적합도:
            <b-form-radio-group
              :options="ratingOptions"
              class="mb-3"
              value-field="item"
              text-field="name"
            ></b-form-radio-group>
          </li>
          <li>청결도:</li>
          <li>친절도:</li>
          <li>가격_적합도:</li>
          <li>부대시설_총합:</li>
          <div class="mt-3"></div>
        </div>
        <button @click="submitVote">!투표 완료!</button>
      </div>
    </div>
  </div>
</template>

<script>
import { registVote } from "@/api/vote.js";
import { checkLogin, printSaveStatus } from "@/commonGlobal/global.js";

export default {
  name: "VoteModal",
  mixins: [checkLogin, printSaveStatus],
  data() {
    return {
      modalIsOpen: false,
      ratingOptions: [
        { value: 5, name: "최고!(5)" },
        { value: 4, name: "좋아!(4)" },
        { value: 3, name: "보통..(3)" },
        { value: 2, name: "좀별루..(2)" },
        { value: 1, name: "별루.(1)" },
      ],
    };
  },
  methods: {
    submitVote() {
      this.$checkLogin();
      let vote = {
        cleanliness: 5,
        facilities: 5,
        kindness: 5,
        location: 5,
        price: 5,
        total: 5,
      };
      registVote(
        this.$route.params.campno,
        vote,
        ({ data }) => {
          this.$printSaveStatus(data.isSuccess);
          this.modalIsOpen = false;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style>
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
  width: 40%;
  border-radius: 8px;
  padding: 3px;
  background-color: #ffffbb;
}
.xbox {
  float: right;
}
.vote {
  border-radius: 10px;
  border: dashed;
  padding: 1px;
}
</style>
