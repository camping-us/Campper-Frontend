<template>
  <div>
    <div class="comment-list-item">
      <div class="comment-list-item-name">
        <div>{{ name }}</div>
        <div>{{ commentObj.createdAt }}</div>
      </div>
      <div class="comment-list-item-context">{{ commentObj.content }}</div>
      <div class="comment-list-item-button">
        <b-button variant="info">수정</b-button>
        <b-button variant="info">삭제</b-button>
      </div>
    </div>
  </div>
</template>
<script>
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
  methods: {},
};
</script>
<style scoped>
.comment-list-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
}
.comment-list-item-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
}
.comment-list-item-context {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50em;
  border: 0.5px solid black;
}
.comment-list-item-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
}
.btn {
  margin-bottom: 1em;
}
</style>
