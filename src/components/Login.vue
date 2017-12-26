<template lang="pug">
  div.login
    div.container
      input.input(v-model="userName")
    div.container
      input.input(v-model="userPwd" type="password" autocomplete="off" @keyup.enter="login($event)")
</template>

<script>
import { Button, Table } from "iview";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      userName: "",
      userPwd: ""
    };
  },
  components: {},
  computed:{

  },
  methods: {
    ...mapMutations([
      'SET_TOKEN',
      'SET_USERNAME',
    ]),
    login(ev) {
      if (ev.keyCode == 13) {
        this.$axios
          .post("/login", {
            userName: this.userName,
            userPwd: this.userPwd
          })
          .then(response => {
            console.log(response);
            let res = response.data;
            // document.cookie = response.data.result.token;
            this.SET_TOKEN(response.data.result.token);
            this.SET_USERNAME(response.data.result.userName);
            // console.log(document.cookie.split(";")[2]);
            if (res.status == "0") {
              this.$router.push({ name: "Home" });
            }
          });
      }
    },
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 300px;
  height: 94px;
  .container {
    margin-bottom: 14px;
    width: 300px;
    height: 30px;
    // border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 5px;
    .input {
      width: 99%;
      border: 0;
      background-color: transparent;
      width: 250px;
      height: 30px;
      font-size: 16px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      &:webkit-autofill,
      textarea:-webkit-autofill,
      select:-webkit-autofill {
        background-color: red;
      }
    }
  }
}
</style>
