<template>
  <div id="app">
    <div display="text-align:center"><vote-modal :modalIsOpen="modalIsOpen" /></div>

    <h3 class="underline-green">캠핑장_정보</h3>
    <b-container class="bv-example-row" id="grid">
      <b-row>
        <b-col sm="6">
          <div id="subHead">📌캠핑장_상세정보</div>
          <div id="info-box" v-if="info">
            <img
              class="campPhoto"
              v-bind:src="info.firstImageUrl == '' ? defaultImg : info.firstImageUrl"
              max-width="100%"
            />
            <li>캠핑장_이름: {{ this.info.facltNm }}</li>
            <li v-if="this.info.lineIntro">캠핑장_한줄소개: {{ this.info.lineIntro }}</li>
            <li v-if="this.info.addr1">캠핑장_주소: {{ this.info.addr1 + this.info.addr2 }}</li>
            <li>캠핑장_전화번호: {{ this.info.tel }}</li>
            <li v-if="this.info.resveUrl">캠핑장_예약주소: {{ this.info.resveUrl }}</li>
            <li v-if="this.info.allar != 0">캠핑장_면적: {{ this.info.allar }}</li>
            <li>캠핑장_애완동물출입: {{ this.info.animalCmgCl }}</li>
            <li>캠핑장_화장실갯수: {{ this.info.toiletCo }}</li>
            <li>캠핑장_샤워실갯수: {{ this.info.swrmCo }}</li>
            <li v-if="this.info.glampInnerFclty">
              캠핑장_예약방식: {{ this.info.glampInnerFclty }}
            </li>
            <li v-if="this.info.caravInnerFclty">
              캠핑장_예약방식: {{ this.info.caravInnerFclty }}
            </li>
            <li>캠핑장_찜한_사람수: {{ this.info.dibCnt }}</li>
            <button id="dibBtn" @click="clickDib()">
              나도_찜하기:
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png"
                alt="Red Heart"
                width="25"
                height="25"
              />
            </button>
          </div>
        </b-col>
        <b-col sm="6">
          <div class="box" v-if="info != null">
            <div id="subHead">📌캠핑장_지도</div>
            <sub-map
              :facltNm="this.info.facltNm"
              :mapY="this.info.mapY"
              :mapX="this.info.mapX"
            ></sub-map>
          </div>
          <div class="box">
            <div id="subHead">📌투표_결과</div>
            <div id="vote-box" v-if="vote != null">
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
              <button id="dibBtn" @click="clickVote">
                나도_투표하기:
                <img
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Right%20Light%20Skin%20Tone.png"
                  alt="Red Heart"
                  width="25"
                  height="25"
                />
              </button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { viewCamp, registDib } from "@/api/camp.js";
import VoteModal from "@/components/camp/item/VoteModal";
import SubMap from "@/components/camp/item/SubMap";

export default {
  name: "CampInfo",
  components: {
    VoteModal,
    SubMap,
  },
  data() {
    return {
      modalIsOpen: false,
      info: null,
      vote: null,
      defaultImg:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Camping.png",
    };
  },
  created() {
    viewCamp(
      this.$route.params.campno,
      ({ data }) => {
        this.info = data.data.info;
        this.vote = data.data.vote;
        console.log(this.info);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    calculate(num) {
      console.log(num);
      return isNaN(num) ? "0.0" : num.toFixed(1);
    },
    clickDib() {
      this.$checkLogin();
      registDib(
        this.$route.params.campno,
        ({ data }) => {
          this.$printSaveStatus(data.isSuccess);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    clickVote() {
      this.$checkLogin();
      this.modalIsOpen = true;
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
button {
  border-radius: 3px;
}
li {
  margin-top: 10px;
}
#grid {
  margin-top: 50px;
}
.box {
  margin-bottom: 50px;
}
#info-box {
  margin: auto;
  /* border: groove 10px; */
  border-radius: 10px;
  border: dashed;
  box-shadow: 10px 10px 5px gray;
  background-color: #ffffbb;
  padding: 15px;
}
.campPhoto {
  object-fit: cover;
  width: 85%;
}
#vote-box {
  /* background-color: rgba(255, 255, 255, 0.8); */
  border-radius: 10px;
  border: dashed;
  box-shadow: 10px 10px 5px gray;
  width: 80%;
  height: 100%;
  margin: auto;
  padding: 15px;
  background-color: #ffffbb;
  /* text-align: left; */
}
#subHead {
  font-size: 20px;
  text-decoration: red dashed underline;
}
#dibBtn {
  margin-top: 30px;
}
</style>
