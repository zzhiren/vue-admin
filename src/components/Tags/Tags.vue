<template lang="pug">
  div.tags
    div.header 标签管理
    div.content
      div.create-tag
        div.title 添加标签
        div.main
          p.name 标签名称
          input.input
          p.name 别名
          input.input
          p.name 描述
          textarea.textarea.scroll
      div.tags-list
        div.title
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";

.tags {
  .header {
    height: 40px;
    display: flex;
    background: $main-bg;
    width: 100%;
    font-size: 17px;
    line-height: 40px;
    padding-left: 10px;
    color: rgba(255, 255, 255, 0.5);
  }
  .input {
    width: 100%;
    border-radius: 2px;
    margin-top: 8px;
    margin-bottom: 40px;
    height: 28px;
    background-color: hsla(0, 0%, 57%, 0.2);
    outline-color: rgba(255, 255, 255, 0);
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid hsla(0, 0%, 57%, 0.2) !important;
    transition: background-color 0.25s linear;
    caret-color: red;
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    &:hover {
      background-color: hsla(0, 0%, 57%, 0.2);
    }
    &:focus {
      background-color: hsla(0, 0%, 57%, 0.1);
    }
  }
  .textarea {
    border: 1px solid hsla(0, 0%, 57%, 0.2) !important;
    height: 100px !important;
    width: 100%!important;
    border-radius: 2px;
    resize: none;
    background-color: hsla(0, 0%, 57%, 0.2);
    outline-color: rgba(255, 255, 255, 0);
    padding: 10px;
    // margin-right: 30px;
    transition: background-color 0.25s linear;
    caret-color: red;
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    &:hover {
      background-color: hsla(0, 0%, 57%, 0.2);
    }
    &:focus {
      background-color: hsla(0, 0%, 57%, 0.1);
    }
  }
  .content {
    background: $three-bg;
    height: 1000px;
    padding-top: 14px;
    padding-bottom: 14px;
    padding-right: 14px;
    padding-left: 14px;
    display: flex;
    .create-tag {
      width: 450px;
      background: $vice-bg;
      margin-right: 14px;
      .main {
        padding: 20px;
      }
      .name {
        font-size: 14px;
        color: white;
        margin-left: 4px;
      }
    }
    .tags-list {
      flex: 1;
      background: $vice-bg;
    }
    .title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: $main-bg;
      padding-left: 10px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
