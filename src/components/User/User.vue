<template lang="pug">
  div.user
    alert(ref="alert" @closeAlert="_showUploadDiv" @_setHeadPortrait="_setHeadPortrait")
    div.main(ref="content")
      div.base-set.zoomIn
        div.bar
          p 基础设置
        div.settings
          p.item
            span.title 站点名称
            input.input
          p.item
            span.title 站点地址
            input.input
          p.item
            span.title 电子邮件地址
            input.input
          p.item
            span.title IPC备案号
            input.input
          p.item
            span.title 黑名单-IP
            textarea.textarea.scroll
          p.item
            span.title 黑名单-邮箱
            textarea.textarea.scroll
        div.footer
          button.button 编辑
          button.button 保存
      div.personal-set.zoomIn
        div.bar
          p 个人设置
        div.settings(spellcheck="false")
          //- p.item
          div.me
            div.me-span 我的头像
            div.upload(@click="_showUploadDiv()")
              img.me-pic(ref="headPortrait" style="width: 74px, height: 74px" v-bind:src="personalSet.headPortrait")
          p.item
            span.title 姓名
            input.input(v-model="personalSet.userName")
          p.item
            span.title 个人签名
            input.input(v-model="personalSet.motto")
          p.item
            span.title 个人描述
            input.input(v-model="personalSet.dsc")
          p.item
            span.title 生日
            input.input(v-model="personalSet.birthday")
          p.item
            span.title 喜欢的音乐
            input.input(v-model="personalSet.music")
          p.item
            span.title 爱好
            input.input(v-model="personalSet.love")
          p.item
            span.title 定位
            input.input(v-model="personalSet.location")
          p.line
          p.item
            span.title 旧密码
            input.input
          p.item
            span.title 新密码
            input.input
          p.item.item-email
            span.title 确认密码
            input.input
          p.line
        div.footer
          button.button 编辑
          button.button(v-on:click="_setUserInformation()") 保存
</template>
<script scoped>
import Alert from "../common/vue/Alert";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      baseSet: {
        siteName: "",
        siteUrl: "",
        email: "",
        ipc: "",
        blackList: "",
        blackEmail: ""
      },
      personalSet: {
        userName: '',
        userPwd: '',
        motto: '',
        headPortrait: '',
        dsc: '',
        music: '',
        love: '',
        email: '',
        birthday: '',
        location: ''
      }
    };
  },
  components: {
    Alert
  },
  computed:{
    ...mapGetters({
      userName:'userName'
    })
  },
  mounted() {
    this._getUserInformation();
    this._initWidth()
  },
  methods: {
    _initWidth(){
      this.$refs.headPortrait.style.width=98 + 'px'
    },
    _showUploadDiv() {
      this.$refs.alert._showAlert();
    },
    _setHeadPortrait(value){
      this.personalSet.headPortrait = value
      this.$refs.headPortrait.style.width=98 + 'px'
      // this.$refs.headPortrait.style.height=98 + 'px'
    },
    _getUserInformation() {
      // var start = document.cookie.indexOf("userName");
      // var end = document.cookie.indexOf(";", start);
      let userName = this.userName;
      this.$axios({
        method: "post",
        url: "/getuserinformation",
        data: {
          userName: userName
        }
      }).then(res => {
        this.personalSet = res.data.data[0];
      });
    },
    _setUserInformation() {
      this.$Notice._loading('Saving...',this)
      this.$axios({
        method: "post",
        url: "/setuserinformation",
        data: {
          personalSet: this.personalSet
        }
      }).then(res => {
        console.log(res.data);
        if(res.data.status == '0'){
          this.$Message.destroy();
          this.$Notice._success('Save Success 😊',this)
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";

.user {
  height: 100%;
  .input {
    border-radius: 2px;
    background-color: hsla(0, 0%, 57%, 0.2);
    outline-color: rgba(255, 255, 255, 0);
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid hsla(0, 0%, 57%, 0.2) !important;
    transition: background-color 0.25s linear;
    caret-color: red;
    color: $font-color;
    font-size: 14px;
    &:hover {
      background-color: hsla(0, 0%, 57%, 0.2);
    }
    &:focus {
      background-color: hsla(0, 0%, 57%, 0.1);
    }
  }
  .bar {
    width: 100%;
    height: 30px;
    background: $main-bg;
    line-height: 30px;
    font-size: 14px;
    padding-left: 15px;
    color: $font-color;
    margin-bottom: 18px;
  }
  .main {
    background: $vice-bg;
    // padding: 14px;
    display: flex;
    height: 100%;
    // .bar {
    //   height: 30px;
    //   font-size: 14px;
    //   line-height: 30px;
    //   margin-bottom: 18px;
    // }
    .base-set {
      flex: 1;
      background: $three-bg;
      margin-right: 14px;
      display: flex;
      flex-direction: column;
    }
    .settings {
      flex: 1;
      .line {
        height: 1px;
        margin-left: 40px;
        margin-right: 40px;
        margin-bottom: 20px;
        border: 0.5px dashed $main-bg;
      }
      .item {
        margin-bottom: 20px;
        color: $font-color;
        display: flex;
        position: relative;
        .title {
          flex: 0.15;
          font-size: 14px;
          margin-right: 10px;
          margin-left: 30px;
          line-height: 34px;
        }
        .input {
          flex: 1;
          margin-right: 30px;
        }
        .textarea {
          border: 1px solid hsla(0, 0%, 57%, 0.2) !important;
          flex: 1;
          height: 200px !important;
          border-radius: 2px;
          resize: none;
          background-color: hsla(0, 0%, 57%, 0.2);
          outline-color: rgba(255, 255, 255, 0);
          padding: 10px;
          margin-right: 30px;
          transition: background-color 0.25s linear;
          caret-color: red;
          color: $font-color;
          font-size: 14px;
          &:hover {
            background-color: hsla(0, 0%, 57%, 0.2);
          }
          &:focus {
            background-color: hsla(0, 0%, 57%, 0.1);
          }
        }
      }
    }
    .footer {
      height: 34px;
      display: flex;
      margin-bottom: 15px;
      padding-left: 30px;
      padding-right: 30px;
      .button {
        flex: 1;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 3px;
        font-size: 16px;
        line-height: 34px;
        text-align: center;
        border: 0;
        color: $font-color;
        outline-color: $main-bg;
        letter-spacing: 10px;
        &:hover {
          cursor: pointer;
        }
        &:active {
          background: black;
        }
        &:nth-child(1) {
          margin-right: 20px;
        }
      }
    }
    .personal-set {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: $three-bg;
      .me {
        display: flex;
        height: 74px;
        margin-left: 30px;
        font-size: 14px;
        color:  $font-color;
        margin-bottom: 45px;
        .me-span {
          flex: 0.15;
          height: 100%;
          line-height: 100px;
        }
        .upload {
          width: 100px;
          height: 100px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
          .upload-input {
            width: 74px;
            height: 74px;
            opacity: 0;
          }
          .upload-btn {
            width: 74px;
            // height: 100%;
            background: yellow;
            margin-top: -74px;
            .me-pic {
              width: 74px;
              // height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
