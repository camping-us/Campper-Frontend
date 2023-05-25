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
      <b-col class="text-right" v-if="userInfo.id === board.userId">
        <b-button variant="outline-info" size="sm" @click="moveModifyBoard" class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteBoard">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${board.id}.
            ${board.title} </h3>
            <div>
              <h6>${board.userName}</h6>
              <h6>${createdAt}</h6>
            </div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
          <b-card-body class="text-right">
            좋아요 수: {{ board.likeCnt }}
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20on%20Fire.png"
              alt="Heart on Fire"
              width="25"
              height="25"
              v-on:click="heart"
              style="cursor: pointer"
            />
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <div class="board-view-comment">
      <CommentList :boardId="boardId"></CommentList>
    </div>
  </b-container>
</template>

<script>
// import moment from "moment";
import { getBoard } from "@/api/board";
import { boardLike } from "@/api/board-like";
import CommentList from "@/components/comment/CommentList.vue";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardDetail",
  comments: {
    CommentList,
  },
  data() {
    return {
      board: {},
      createdAt: "",
      boardId: this.$route.params.boardno + "",
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
        this.board = data.data;
        this.createdAt = `${data.data.createdAt[0]}-${data.data.createdAt[1]}-${data.data.createdAt[2]}`;
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
        params: { boardno: this.board.id },
        query: { category: this.board.category },
      });
      //   this.$router.push({ path: `/board/modify/${this.board.boardno}` });
    },
    deleteBoard() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { boardno: this.board.id },
          query: { category: this.board.category },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist", query: { category: this.board.category } });
    },
    refreshList() {
      this.$router.go(this.$router.currentRoute);
    },
    heart() {
      boardLike(
        this.boardId,
        ({ data }) => {
          if (data.isSuccess === true) {
            this.refreshList();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  components: { CommentList },
};
</script>

<style>
.board-view-comment {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}
</style>
