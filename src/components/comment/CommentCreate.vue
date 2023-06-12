<template>
  <div class="comment-create">
    <b-input-group class="mt-3">
      <b-form-textarea
        id="content"
        v-model="content"
        placeholder="내용 입력..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-input-group-append>
        <b-button class="m-1" variant="primary" @click="registComment()"
          >댓글 작성하기</b-button
        >
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import { writeComment } from "@/api/comment.js";

export default {
  name: "CommentCreate",
  props: {
    boardId: String,
  },
  data() {
    return {
      content: "",
    };
  },
  created() {},
  methods: {
    registComment() {
      let param = {
        boardId: this.boardId,
        content: this.content,
      };

      writeComment(
        param,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data.isSuccess === true) {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      console.log(this.boardId);
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>
<style scoped>
.comment-create {
  display: flex;
  margin-bottom: 1em;
}
</style>
