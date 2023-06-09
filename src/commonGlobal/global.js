import router from "../router";
import store from "@/store";

export default {
  install(Vue) {
    (Vue.prototype.$checkLogin = function () {
      const checkUserInfo = store.getters["memberStore/checkUserInfo"];
      const checkToken = store.getters["memberStore/checkToken"];
      if (!checkToken || checkUserInfo === null) {
        alert("로그인이 필요한 페이지입니다..");
        router.push({ name: "login" });
        return false;
      }
      return true;
    }),
      (Vue.prototype.$printSaveStatus = function (isSuccess) {
        let msg = "등록 처리시 문제가 발생했습니다.";
        if (isSuccess === true) {
          msg = "등록이 완료되었습니다.";
        }
        alert(msg);
      });
  },
};
