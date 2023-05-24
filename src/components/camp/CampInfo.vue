<template>
  <div id="app">
    <div class="black-bg" v-if="modalIsOpen">
      <div class="white-bg">
        <div class="vote">
          <button class="xbox" @click="modalIsOpen = false">❌</button>
          <div>
            <h4 class="underline-green">✔️투표창✔️</h4>
            <li>전체평점:</li>
            <li>위치_적합도:</li>
            <li>청결도:</li>
            <li>친절도:</li>
            <li>가격_적합도:</li>
            <li>부대시설_총합:</li>
          </div>
          <button @click="submitVote">!투표 완료!</button>
        </div>
      </div>
    </div>
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
          <div class="box">
            <div id="subHead">📌캠핑장_지도</div>
            <div id="subMap"></div>
          </div>
          <div class="box">
            <div id="subHead">📌투표_결과</div>
            <div id="vote-box" v-if="vote">
              <li>전체평점: {{ this.calculate(vote.total / vote.voteCount) }}</li>
              <li>
                위치_적합도:
                {{ this.calculate(vote.location / vote.voteCount) }}
              </li>
              <li>청결도: {{ this.calculate(vote.cleanliness / vote.voteCount) }}</li>
              <li>친절도: {{ this.calculate(vote.kindness / vote.voteCount) }}</li>
              <li>가격_적합도: {{ this.calculate(vote.price / vote.voteCount) }}</li>
              <li>
                부대시설_총합:
                {{ this.calculate(vote.facilities / vote.voteCount) }}
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
import { registVote } from "@/api/vote.js";
import router from "../../router";
import store from "@/store";

export default {
  name: "CampInfo",
  data() {
    return {
      modalIsOpen: false,
      map: null,
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
        console.log(this.info.firstImageUrl);
        this.vote = data.data.vote;
        this.loadMarker();
      },
      (error) => {
        console.log(error);
      }
    );
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=16cd299925f3e1a7ff0b522249306cfd&libraries=clusterer";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      var container = document.getElementById("subMap");
      var options = {
        center: new kakao.maps.LatLng(37.541, 126.986),
        level: 3,
      };

      this.map = new kakao.maps.Map(container, options);
      this.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
    },
    loadMarker() {
      var markerImage = new kakao.maps.MarkerImage(
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Down%20Light%20Skin%20Tone.png",
        new kakao.maps.Size(60, 60)
      );
      let position = {
        title: this.info.facltNm,
        latlng: new kakao.maps.LatLng(this.info.mapY, this.info.mapX),
      };
      const marker = new kakao.maps.Marker({
        map: this.map, // 마커를 표시할 지도
        position: position.latlng, // 마커를 표시할 위치
        title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage,
      });
      this.map.setCenter(position.latlng);
      marker.setMap(this.map);
    },
    calculate(num) {
      return isNaN(num) ? "0.0" : num.toFix(1);
    },
    checkLogin() {
      const checkUserInfo = store.getters["memberStore/checkUserInfo"];
      const checkToken = store.getters["memberStore/checkToken"];
      let token = localStorage.getItem("accessToken");
      console.log("로그인 처리 전", checkUserInfo, token);

      if (!checkToken || checkUserInfo === null) {
        alert("로그인이 필요한 페이지입니다..");
        // next({ name: "login" });
        router.push({ name: "login" });
      }
    },
    clickDib() {
      this.checkLogin();
      registDib(
        this.$route.params.campno,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data.isSuccess === true) {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    clickVote() {
      // this.checkLogin();
      this.modalIsOpen = true;
    },
    submitVote() {
      this.checkLogin();
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
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data.isSuccess === true) {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
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
  /* background: white; */
  border-radius: 8px;
  padding: 3px;
  background-color: #ffffbb;
}
.xbox {
  /* left: 0px; */
  float: right;
}
.vote {
  border-radius: 10px;
  border: dashed;
  padding: 1px;
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
  /* text-shadow: 1px 0 0 gray; */
  font-size: 20px;
  text-decoration: red dashed underline;
}
#subMap {
  margin: auto;
  width: 80%;
  height: 400px;

  border: dashed;
  border-radius: 10px;
  box-shadow: 10px 10px 5px gray;
}
#dibBtn {
  margin-top: 30px;
}
</style>
