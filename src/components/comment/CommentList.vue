<template>
  <div>
    <b-list-group :key="item.comment_id" v-for="item in comments">
      <CommentListItem :commentObj="item" />
    </b-list-group>

    <CommentCreate :boardId="boardId" />
  </div>
</template>

<script>
import { listComment } from "@/api/comment";
import CommentListItem from "./CommentListItem.vue";
import CommentCreate from "./CommentCreate.vue";

export default {
  name: "CommentList",
  props: {
    boardId: String,
  },
  components: {
    CommentListItem,
    CommentCreate,
  },
  data() {
    return {
      comments: [],
      //comments: data.Comment.filter(item => item.content_id === this.contentId),
    };
  },
  created() {
    let param = {
      boardId: this.boardId,
      pg: 1,
      spp: 20,
    };
    listComment(
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
