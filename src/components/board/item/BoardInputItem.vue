<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-select v-model="category" :options="options" size="sm" class="mt-3"></b-form-select>

        <b-form-group id="userid-group" label="작성자:" label-for="userid">
          <b-form-input
            id="userid"
            :disabled="true"
            v-model="board.userName"
            type="text"
            required
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="title-group"
          label="제목:"
          label-for="title"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="title"
            v-model="board.title"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <board-editor
          v-model="board.content"
          :pContent="board.content"
          style="height: 500px"
          id="content"
          @change="change"
        ></board-editor>

        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { writeBoard, modifyBoard, getBoard } from "@/api/board.js";
import BoardEditor from "./BoardEditor.vue";
import { convertFileData } from "../s3/convert";

export default {
  name: "BoardInputItem",
  components: {
    BoardEditor,
  },
  data() {
    return {
      category: this.$route.query.category == "FREE_BOARD" ? "자유게시판" : "캠핑게시판",
      board: {
        boardno: 0,
        userName: localStorage.getItem("nickName"),
        category: "",
        title: "",
        content: "",
      },
      options: [
        { value: "", text: "선택하세욧!" },
        { value: "자유게시판", text: "🎪자유게시판🎪" },
        { value: "캠핑게시판", text: "⛺캠핑게시판⛺" },
      ],
      isUserid: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {},
  mounted() {
    if (this.type === "modify") {
      let param = this.$route.params.boardno;
      getBoard(
        param,
        ({ data }) => {
          this.board.boardno = data.data.id;
          this.board.userName = data.data.userName;
          this.board.title = data.data.title;
          this.board.content = data.data.content;
          this.board.category = data.data.category;
          this.board = data.data;
        },
        (error) => {
          console.log(error);
        }
      );

      this.isUserid = true;
    }
  },
  methods: {
    change(value) {
      this.board.content = value;
    },
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.board.userid &&
        err &&
        !this.board.title &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err &&
        !this.board.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registBoard() : this.modifyBoard();
    },
    onReset(event) {
      event.preventDefault();
      this.board.boardno = 0;
      this.board.title = "";
      this.board.content = "";
    },
    registBoard() {
      var param = {
        title: this.board.title,
        content: "",
        category: this.category,
        images: [],
      };

      convertFileData(this.board.content)
        .then(function (n) {
          param.content = n;
          writeBoard(
            param,
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
        })
        .then(this.moveList())
        .catch((n) => console.log("error:" + n));
    },
    modifyBoard() {
      let param = {
        title: this.board.title,
        content: this.board.content,
      };
      modifyBoard(
        this.$route.params.boardno,
        param,
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data.isSuccess === true) {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "boardlist", query: { category: this.$route.query.category } });
    },
  },
};
</script>

<style>
.mt-3 {
  margin-bottom: 10px;
}
</style>
