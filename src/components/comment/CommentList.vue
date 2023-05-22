<template>
  <div>
    <div :key="item.comment_id" v-for="item in comments">
      <CommentListItem :commentObj="item" />
    </div>
    <!-- <CommentCreate :contentId="contentId" :reloadComments="reloadComments" /> -->
  </div>
</template>

<script>
import { listComment } from "@/api/comment";
import CommentListItem from "./CommentListItem.vue";

export default {
  name: "CommentList",
  props: {
    board: Object,
  },
  components: {
    CommentListItem,
    // CommentCreate,
  },
  data() {
    return {
      comments: [],
      boardId: this.board.id,
      //comments: data.Comment.filter(item => item.content_id === this.contentId),
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
    };
    listComment(
      this.boardId,
      param,
      ({ data }) => {
        this.comments = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {},
};
</script>
