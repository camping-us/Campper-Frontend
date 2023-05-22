<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped hover :items="boards" :fields="fields" @row-clicked="viewboard">
          <template #cell(subject)="data">
            <router-link
              :to="{
                name: 'boardview',
                params: { boardno: data.id },
              }"
            >
              {{ data.item.title }}
            </router-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { listBoard } from "@/api/board";

export default {
  name: "BoardList",
  data() {
    return {
      boards: [],
      fields: [
        { key: "id", label: "글번호", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdSubject" },
        { key: "userName", label: "작성자", tdClass: "tdClass" },
        // { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "likeCnt", label: "좋아요수", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listBoard(
      param,
      ({ data }) => {
        this.boards = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewboard(board) {
      this.$router.push({
        name: "boardview",
        params: { boardno: board.id },
      });
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
