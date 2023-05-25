<template>
  <div id="map" />
</template>

<script>
export default {
  name: "SubMap",
  props: {
    facltNm: String,
    mapY: String,
    mapX: String,
  },
  data() {
    return {
      map: null,
    };
  },
  created() {},
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

    this.loadMarker();
  },
  methods: {
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(37.541, 126.986),
        level: 3,
      };

      this.map = new kakao.maps.Map(container, options);
    },
    loadMarker() {
      console.log(this.mapY, this.mapX);
      this.map.relayout();
      var markerImage = new kakao.maps.MarkerImage(
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Down%20Light%20Skin%20Tone.png",
        new kakao.maps.Size(60, 60)
      );
      let loc = new kakao.maps.LatLng(this.mapY, this.mapX);
      const marker = new kakao.maps.Marker({
        map: this.map, // 마커를 표시할 지도
        position: loc, // 마커를 표시할 위치
        title: this.facltNm, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage,
      });
      this.map.setCenter(loc);
      marker.setMap(this.map);
    },
  },
};
</script>
<style scoped>
#map {
  margin: auto;
  width: 80%;
  height: 400px;

  border: dashed;
  border-radius: 10px;
  box-shadow: 10px 10px 5px gray;
}
</style>
