<template>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show><h3>글보기</h3></b-alert>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col class="text-left">
          <b-button variant="outline-primary" @click="moveList">목록</b-button>
        </b-col>
        <b-col class="text-right" v-if="userInfo.userid === board.userid">
          <b-button variant="outline-info" size="sm" @click="moveModifyBoard" class="mr-2">글수정</b-button>
          <b-button variant="outline-danger" size="sm" @click="deleteBoard">글삭제</b-button>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col>
          <b-card
            :header-html="`<h3>${board.boardno}.
            ${board.subject} [${board.hit}]</h3><div><h6>${board.userid}</div><div>${board.regtime}</h6></div>`"
            class="mb-2"
            border-variant="dark"
            no-body
          >
            <b-card-body class="text-left">
              <div v-html="message"></div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  // import moment from "moment";
  import { getBoard } from "@/api/board";
  import { mapState } from "vuex";
  
  const memberStore = "memberStore";
  
  export default {
    name: "BoardDetail",
    data() {
      return {
        board: {},
      };
    },
    computed: {
      ...mapState(memberStore, ["userInfo"]),
      message() {
        if (this.board.content) return this.board.content.split("\n").join("<br>");
        return "";
      },
    },
    created() {
      let param = this.$route.params.boardno;
      getBoard(
        param,
        ({ data }) => {
          this.board = data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    methods: {
      moveModifyBoard() {
        this.$router.replace({
          name: "boardmodify",
          params: { boardno: this.board.boardno },
        });
        //   this.$router.push({ path: `/board/modify/${this.board.boardno}` });
      },
      deleteBoard() {
        if (confirm("정말로 삭제?")) {
          this.$router.replace({
            name: "boarddelete",
            params: { boardno: this.board.boardno },
          });
        }
      },
      moveList() {
        this.$router.push({ name: "boardlist" });
      },
    },
    // filters: {
    //   dateFormat(regtime) {
    //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
    //   },
    // },
  };
  </script>
  
  <style></style>
  