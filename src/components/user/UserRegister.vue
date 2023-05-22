<template>
  <div>
    <br />
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="아이디:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.authKey"
          placeholder="Enter Id"
          required
        ></b-form-input>
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="이메일:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <br />
      <b-form-group id="input-group-3" label="비밀번호:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          v-model="form.pwd"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>
      <br />
      <b-form-group id="input-group-4" label="닉네임:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.nickName"
          placeholder="Enter nickname"
          required
        ></b-form-input>
      </b-form-group>

      <br />
      <b-form-group>
        <b-form-datepicker
          id="input-5"
          v-model="form.birth"
          class="mb-2"
          placeholder="생년월일"
          required
        ></b-form-datepicker>
      </b-form-group>

      <br />
      <b-button type="submit" variant="primary" class="m-1">Submit</b-button>
      <b-button type="reset" variant="danger" class="m-1">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { signup } from "@/api/member";

export default {
  name: "UserRegister",
  data() {
    return {
      form: {
        authKey: "",
        email: "",
        pwd: "",
        nickName: "",
        birth: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      this.registUser();
    },
    onReset(event) {
      event.preventDefault();
      this.form.authKey = "";
      this.form.email = "";
      this.form.pwd = "";
      this.form.nickName = "";
      this.form.birth = "";
    },
    registUser() {
      let param = {
        authKey: this.form.authKey,
        birth: this.form.birth,
        email: this.form.email,
        nickName: this.form.nickName,
        pwd: this.form.pwd,
      };
      signup(
        param,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          console.log(data.isSuccess);
          if (data.isSuccess === true) {
            msg = "등록이 완료되었습니다.";
            this.moveHome();
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style></style>
