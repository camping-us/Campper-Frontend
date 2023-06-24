<template>
  <div id="app">
    <div style="text-align: center" v-if="isVote!=null">
      <vote-modal
        @close="closeVote"
        :modalIsOpen="this.modalIsOpen"
        :isVote="this.isVote"
      />
    </div>
    <h3 class="underline-green">캠핑장_정보</h3>
    <b-container class="bv-example-row" id="grid">
      <b-row>
        <b-col sm="6">
          <div id="subHead">📌캠핑장_상세정보</div>
          <div v-if="info">
            <detail-info :info="this.info" />
          </div>
        </b-col>
        <b-col sm="6">
          <div class="box">
            <div id="subHead">📌캠핑장_지도</div>
            <div v-if="info != null">
              <sub-map :info="this.info" />
            </div>
          </div>
          <div class="box">
            <div id="subHead">📌투표_결과</div>
            <div v-if="vote != null">
              <detail-vote-info
                @open="openVote"
                :vote="this.vote"
                :isVote="this.isVote"
              />
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { checkVote } from "@/api/vote.js";
import { viewCamp } from "@/api/camp.js";
import VoteModal from "@/components/camp/item/VoteModal";
import SubMap from "@/components/camp/item/SubMap";
import DetailInfo from "@/components/camp/item/DetailInfo";
import DetailVoteInfo from "@/components/camp/item/DetailVoteInfo";

export default {
  name: "CampInfo",
  components: {
    VoteModal,
    SubMap,
    DetailInfo,
    DetailVoteInfo,
  },
  data() {
    return {
      modalIsOpen: false,
      isVote: null,
      info: null,
      vote: null,
    };
  },
  mounted() {
    viewCamp(
      this.$route.params.campno,
      ({ data }) => {
        this.info = data.data.info;
        this.vote = data.data.vote;
        console.log(this.vote)
      },
      (error) => {
        console.log(error);
      }
    );
    if (localStorage.getItem("accessToken") != null) {
      checkVote(
        this.$route.params.campno,
        ({ data }) => {
          this.isVote = data.data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  },
  methods: {
    closeVote(isClose) {
      this.modalIsOpen = isClose;
    },
    calculate(num) {
      return isNaN(num) ? "0.0" : num.toFixed(1);
    },
    openVote(isOpen) {
      this.$checkLogin();
      this.modalIsOpen = isOpen;
    },
  },
};
</script>

<style scoped>
div {
  box-sizing: border-box;
}
.box {
  margin-bottom: 50px;
}
#subHead {
  font-size: 20px;
  text-decoration: red dashed underline;
}
</style>
