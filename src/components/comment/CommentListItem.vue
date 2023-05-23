<template>
  <b-list-group-item class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ commentObj.userName }}</h5>
      <small class="text-muted" v-if="userInfo.id === commentObj.userId">
        <b-button variant="outline-info" size="sm" @click="modifyCommentFunc">수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteCommentFunc">삭제</b-button>
      </small>
      <small class="text-right">
        좋아요 수: {{ commentObj.likeCnt }}
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20on%20Fire.png"
          alt="Heart on Fire"
          width="25"
          height="25"
          v-on:click="heart"
          style="cursor: pointer"
        />
      </small>
    </div>

    <p class="mb-1">
      {{ commentObj.content }}
    </p>

    <small class="text-muted">시간: {{ commentObj.createdAt }}</small>
  </b-list-group-item>
</template>
<script>
import { modifyComment } from "@/api/comment.js";
import { commentLike } from "@/api/comment-like.js";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "CommentListItem",
  props: {
    commentObj: {},
  },
  components: {},
  data() {
    return {
      name: "test",
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    modifyCommentFunc() {
      let param = {
        commentId: this.commentObj.id,
        content: this.commentObj.content,
      };

      modifyComment(param, ({ data }) => {
        let msg = "등록 처리시 문제가 발생했습니다.";
        if (data.isSuccess === true) {
          msg = "등록이 완료되었습니다.";
        }
        alert(msg);
        this.moveList();
      });
    },
    deleteCommentFunc() {},
    moveList() {
      this.$router.go(this.$router.currentRoute);
    },
    refreshList() {
      this.$router.go(this.$router.currentRoute);
    },
    heart() {
      commentLike(
        this.commentObj.id,
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
};
</script>
<style scoped>
.comment-list-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
}
</style>
