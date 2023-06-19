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
    /*global kakao */
    if (window.kakao && window.kakao.maps) {
      this.initMap();
      this.loadMarker();
    } else {
      const script = document.createElement("script");
      script.onload = () =>
        kakao.maps.load(() => {
          this.initMap();
          this.loadMarker();
        });
      script.src = process.env.VUE_APP_API_KAKAO_URL;
      document.head.appendChild(script);
    }
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
      var markerImage = new kakao.maps.MarkerImage(
        process.env.VUE_APP_API_KAKAO_SUBMAP_MARKER,
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
