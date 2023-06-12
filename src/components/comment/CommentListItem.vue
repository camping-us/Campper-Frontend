<template>
  <b-list-group-item class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-flex-start">
      <h5 class="mb-1">{{ commentObj.userName }}</h5>
      <small class="text-muted">{{ createdAt }}</small>
      <small class="text-right" style="float: right; margin-left: auto">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20on%20Fire.png"
          alt="Heart on Fire"
          width="25"
          height="25"
          v-on:click="heart"
          style="cursor: pointer"
        />
        {{ commentObj.likeCnt }}
      </small>
    </div>

    <b-form-textarea
      v-if="isMod"
      id="content"
      v-model="content"
      placeholder="내용 입력..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <p class="mb-1" v-else>
      {{ commentObj.content }}
    </p>

    <small class="text-muted" style="float: right" v-if="userInfo.id === commentObj.userId">
      <b-button v-if="isMod" variant="outline-info" size="sm" @click="doneModifyCommentFunc"
        >완료</b-button
      >

      <b-button v-else variant="outline-info" size="sm" @click="modifyCommentFunc">수정</b-button>
      <b-button variant="outline-danger" size="sm" @click="deleteCommentFunc">삭제</b-button>
    </small>
  </b-list-group-item>
</template>
<script>
import { deleteComment, modifyComment } from "@/api/comment.js";
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
      content: this.commentObj.content,
      isMod: false,
      createdAt: `${this.commentObj.createdAt[0]}-${this.commentObj.createdAt[1]}-${this.commentObj.createdAt[2]}`,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    modifyCommentFunc() {
      this.isMod = true;
    },
    doneModifyCommentFunc() {
      this.isMod = false;
      let param = {
        content: this.content,
      };
      modifyComment(this.commentObj.id, param, ({ data }) => {
        let msg = "등록 처리시 문제가 발생했습니다.";
        if (data.isSuccess === true) {
          msg = "등록이 완료되었습니다.";
        }
        alert(msg);
        this.moveList();
      });
    },
    deleteCommentFunc() {
      let param = {
        commentId: this.commentObj.id,
      };

      deleteComment(param, ({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data.isSuccess === true) {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        this.moveList();
      });
    },
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
