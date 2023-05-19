<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png"
          alt="Fire"
          width="100"
          height="100"
        />
        <div id="logo">Campper</div>
      </b-navbar-brand>

      <b-navbar-toggle
        target="nav-collapse"
        style="justify-content: end; margin-right: 20px"
      ></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav style="justify-content: end; margin-right: 100px">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right style="margin-right: 20px">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>캠퍼</em>
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: '회원가입' }" class="link"
                >회원가입</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: '로그인' }" class="link"
                >로그인</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right style="margin-right: 20px">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>캠핑</em>
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'camp검색' }" class="link"
                >캠핑장 검색</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'camp투표' }" class="link"
                >캠핑장 투표</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right style="margin-right: 20px">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>캠시판</em>
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: '자유게시판' }" class="link"
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
export default {
  name: "HeaderNaviBar",
};
</script>

<style scoped>
#logo {
  line-height: 100px;
  display: inline;
  font-family: "bitbit";
  font-size: 40px;
}
</style>
