<template>
  <div id="info-box">
    <img
      class="campPhoto"
      v-bind:src="info.firstImageUrl == '' ? defaultImg : info.firstImageUrl"
      max-width="100%"
    />
    <li>캠핑장_이름: {{ this.info.facltNm }}</li>
    <li v-if="this.info.lineIntro">
      캠핑장_한줄소개: {{ this.info.lineIntro }}
    </li>
    <li v-if="this.info.addr1">
      캠핑장_주소: {{ this.info.addr1 + this.info.addr2 }}
    </li>
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
        width="25"
        height="25"
      />
    </button>
  </div>
</template>

<script>
import { registDib } from "@/api/camp.js";
export default {
  name: "DetailInfo",
  components: {},
  props: {
    info: Object,
    modalIsOpen: Boolean,
  },
  data() {
    return {
      defaultImg:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Camping.png",
    };
  },
  methods: {
    clickDib() {
      this.$checkLogin();
      registDib(
        this.$route.params.campno,
        ({ data }) => {
          this.$printSaveStatus(data.isSuccess);
          this.$router.go(this.$route.currentRoute);
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
  margin-top: 10px;
}
#info-box {
  margin: auto;
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
#dibBtn {
  border-radius: 3px;
  margin-top: 30px;
}
</style>
