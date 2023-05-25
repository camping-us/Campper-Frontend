<template>
  <div display="margin-right:0px">
    <b-form-radio-group
      v-model="localParam"
      :options="options"
      value-field="item"
      text-field="name"
      plain
    ></b-form-radio-group>
  </div>
</template>

<script>
export default {
  name: "RatingRadio",
  props: {
    selected: Number,
  },
  computed: {
    localParam: {
      get: function () {
        return this.selected;
      },
      set: function (selected) {
        this.$emit("input", selected); // 부모에서는 @input에 쓴 메소드가 호출된다. 인수에value
      },
    },
  },
  data() {
    return {
      aa: 0,
      // modalIsOpen: false,
      options: [
        { item: 5, name: "최고!(5)" },
        { item: 4, name: "좋아!(4)" },
        { item: 3, name: "보통..(3)" },
        { item: 2, name: "좀별루..(2)" },
        { item: 1, name: "별루.(1)" },
      ],
    };
  },
};
</script>
