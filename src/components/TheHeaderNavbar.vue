<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/" id="navbar">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png"
          alt="Fire"
          width="100"
          height="100"
        />
        <a id="logo"> <div margin-top:50px>CAMPPER</div></a>
      </b-navbar-brand>

      <b-navbar-toggle
        target="nav-collapse"
        style="justify-content: end; margin-right: 20px"
      ></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav style="justify-content: end; margin-right: 100px">
        <!-- after login -->
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center"> {{ userInfo.nickName }}님 환영합니다. </b-nav-item>
          <b-nav-item class="align-self-center">
            <router-link :to="{ name: 'mypage' }" class="link align-self-center"
              >내정보보기</router-link
            >
          </b-nav-item>
          <b-nav-item class="align-self-center link" @click="onClickLogout">로그아웃</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right style="margin-right: 20px">
            <!-- before login -->
            <template #button-content>
              <em>캠퍼</em>
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'join' }" class="link"
                >회원가입</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'login' }" class="link"
                >로그인</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right style="margin-right: 20px">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>캠핑</em>
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'camp' }" class="link"
                >캠핑장들</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right style="margin-right: 20px">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>캠시판</em>
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'board' }" class="link"
                >자유게시판</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: '캠핑게시판' }" class="link"
                >캠핑게시판</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  name: "HeaderNaviBar",
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      // if (this.$route.path != "/") this.$router.push({ name: "main" });

      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout();
      localStorage.removeItem("accessToken"); //저장된 토큰 없애기
      localStorage.removeItem("refreshToken"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
  },
};
</script>

<style scoped>
#logo {
  /* line-height: 100px; */
  display: inline-block;
  font-family: "bitbit";
  font-size: 50px;
}

#navbar {
  padding: 0px;
  display: flex;
  align-items: center;
}
</style>
