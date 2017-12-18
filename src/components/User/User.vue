<template lang="pug">
  div.user
    div.bar
      p 全局设置
    div.main(ref="content")
      div.base-set
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
          p.item.item-email
            span.title 黑名单-邮箱
            textarea.textarea.scroll
        div.footer
          button.button 编辑
          button.button 保存
      div.personal-set
        div.bar
          p 个人设置
        div.settings
          p.item
            span.title 上传头像
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
          p.item.item-email
            span.title 黑名单-邮箱
            textarea.textarea.scroll
        div.footer
          button.button 编辑
          button.button 保存

        
</template>
<script scoped>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$refs.content.style.height = innerHeight - 68 - 24 + "px";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";

.user {
  // background: red;
  height: 100%;
  .input {
    border-radius: 2px;
    // height: 34px;
    // padding: 0 !important;
    background-color: hsla(0, 0%, 57%, 0.2);
    outline-color: rgba(255, 255, 255, 0);
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid hsla(0, 0%, 57%, 0.2) !important;
    transition: background-color 0.25s linear;
    caret-color: red;
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    width: 700px;
    &:hover {
      background-color: hsla(0, 0%, 57%, 0.2);
    }
    // &:focus {
    //   background-color: hsla(0, 0%, 57%, 0.1);
    // }
  }
  .bar {
    width: 100%;
    height: 40px;
    background: $main-bg;
    line-height: 40px;
    font-size: 17px;
    padding-left: 15px;
    color: rgba(255, 255, 255, 0.5);
  }
  .main {
    background: $three-bg;
    padding: 14px;
    display: flex;
    // box-sizing: border-box;
    .bar {
      height: 34px;
      font-size: 14px;
      line-height: 34px;
      margin-bottom: 18px;
    }
    .base-set {
      flex: 1;
      // height: 300px;
      background: $vice-bg;
      margin-right: 14px;
      display: flex;
      flex-direction: column;
    }
    .settings {
      flex: 1;
      .item-email {
        margin-top: 188px !important;
      }
      .item {
        margin-bottom: 20px;
        height: 34px;
        color: white;
        display: flex;
        .title {
          // width: 100px;
          flex: .15;
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
          // height: 34px;
          // padding: 0 !important;
          resize: none;
          background-color: hsla(0, 0%, 57%, 0.2);
          outline-color: rgba(255, 255, 255, 0);
          padding: 10px;
          margin-right: 30px;
          transition: background-color 0.25s linear;
          caret-color: red;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          &:hover {
            background-color: hsla(0, 0%, 57%, 0.2);
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
        color: white;
        outline-color: $main-bg;
        &:hover {
          cursor: pointer;
        }
        &:active {
          background: #0088f5;
        }
        &:nth-child(1) {
          margin-right: 20px;
        }
      }
    }
    .personal-set {
      flex: 1;
      // height: 300px;
      display: flex;
      flex-direction: column;
      background: $vice-bg;
    }
  }
}
</style>
