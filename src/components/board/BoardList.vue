<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show
          ><h3>{{ $route.query.category }}</h3></b-alert
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right" style="text-align-last: right">
        <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          style="text-align-last: center"
          id="my-table"
          :per-page="perPage"
          :items="boards"
          striped
          hover
          :fields="fields"
          @row-clicked="viewboard"
        >
          <template #cell(subject)="data">
            <router-link
              :to="{
                name: 'boardview',
                params: { boardno: data.id },
                query: { category: $route.query.category },
              }"
            >
            </router-link>
          </template>
        </b-table>
        <b-pagination
          style="justify-content: center"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
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
      totalCnt: 0,
      perPage: 10,
      currentPage: 1,
      category: this.$route.query.category,
      boards: [],
      fields: [
        { key: "title", label: "제목", tdClass: "tdSubject" },
        { key: "userName", label: "작성자", tdClass: "tdClass" },
        { key: "likeCnt", label: "좋아요수", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    let param = {
      pg: this.currentPage,
      spp: this.perPage,
      key: null,
      word: null,
      category: this.category,
    };
    this.getBoardList(param);
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite", query: { category: this.category } });
    },
    viewboard(board) {
      this.$router.push({
        name: "boardview",
        params: { boardno: board.id },
      });
    },
    getBoardList(param) {
      listBoard(
        param,
        ({ data }) => {
          this.boards = data.data.boards;
          this.totalCnt = data.data.boardCnt;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  computed: {
    rows() {
      return this.totalCnt;
    },
  },
  watch: {
    currentPage: function () {
      let param = {
        pg: this.currentPage,
        spp: this.perPage,
        key: null,
        word: null,
        category: this.category,
      };
      this.getBoardList(param);
    },
    $route() {
      this.category = this.$route.query.category;
      let param = {
        pg: this.currentPage,
        spp: this.perPage,
        key: null,
        word: null,
        category: this.category,
      };
      this.getBoardList(param);
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
