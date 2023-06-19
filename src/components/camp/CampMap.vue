<template>
  <div id="app">
    <h3 class="underline-green">캠핑장들</h3>
    <div>!나무를 눌러주세요!</div>
    <div id="map"></div>
  </div>
</template>

<script>
import { listCamp } from "@/api/camp.js";
import router from "../../router";
export default {
  name: "CampMap",
  data() {
    return {
      map: null,
      datas: [],
      markers: [],
      positions: [],
      test: 133,
    };
  },
  created() {
    listCamp(
      ({ data }) => {
        this.datas = data.data;
        for (var i = 0; i < this.datas.length; i++) {
          let position = {
            id: this.datas[i].id,
            title:
              this.datas[i].facltNm +
              "\n" +
              this.datas[i].lineIntro +
              "\n평점: " +
              this.retNum(this.datas[i].total / this.datas[i].voteCnt),
            latlng: new kakao.maps.LatLng(
              this.datas[i].mapY,
              this.datas[i].mapX
            ),
          };
          this.positions.push(position);
        }
        this.loadMarker();
      },
      (error) => {
        console.log(error);
      }
    );
  },
  mounted() {
    /*global kakao */
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");

      script.onload = () => kakao.maps.load(this.initMap);
      script.src = process.env.VUE_APP_API_KAKAO_URL;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(37.541, 126.986),
        level: 8,
      };

      this.map = new kakao.maps.Map(container, options);
      this.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
    },
    loadMarker() {
      var markerImage = new kakao.maps.MarkerImage(
        process.env.VUE_APP_API_KAKAO_MAP_MARKER,
        new kakao.maps.Size(38, 38)
      );
      this.markers = [];
      for (var i = 0; i < this.positions.length; i++) {
        const marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: this.positions[i].latlng, // 마커를 표시할 위치
          title: this.positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage,
        });
        this.markers.push(marker);
        let cid = this.positions[i].id;
        kakao.maps.event.addListener(marker, "click", this.markerClick(cid));
        // kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
        // kakao.maps.event.addListener(marker, "click", function () {
        //   console.log(cid);
        // });
      }
    },
    markerClick(id) {
      return function () {
        router.push({ name: "campInfo", params: { campno: id } });
      };
    },
    retNum(rating) {
      if (isNaN(rating)) return 0;
      return rating;
    },
  },
};
</script>

<style scoped>
#map {
  margin-top: 30px;
  width: 100%;
  height: 600px;
  border-radius: 10px;
}
</style>
