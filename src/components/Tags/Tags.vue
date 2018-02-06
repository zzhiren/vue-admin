<template lang="pug">
  div.tags
    div.header 标签管理
    div.content
      div.create-tag
        div.title 添加标签
        div.main
          p.name 标签名称
          input.input(placeholder="标签的名称，英文，用来在url中显示使用")
          p.name 别名
          input.input(placeholder="标签的别名，中文、英文都可，用来展示")
          p.name Icon
          input.input(placeholder="标签的图标，icon为iview中的图标")
          p.name Svg
          input.input(placeholder="标签的图标，svg为上传的svg图标")
          p.name 描述
          textarea.textarea.scroll(placeholder="描述标签")
        div.footer
          button.button 编辑
          button.button(v-on:click="_addGitHubProject()") 保存
      div.tags-list
        div.title
        div.bar
          div.two.one
            div.common.click(@click="_refreshList(state)" v-model="state")
              Icon.icon(type="android-refresh")
              span 刷新
            div.common.click 
              Icon.icon(type="trash-b")
              span 清空搜索条件
            div.common.click 
              Icon.icon(type="ios-list")
              span 批量操作
          div.other
          div.three.one
            input.search-input(v-model="condition" placeholder="文章标题、描述...")
            button.search-btn 搜索
        div.tags

</template>
<script>
export default {
  data() {
    return {
      name: "",
      aliasName: "",
      icon: "",
      dsc: "",
      svg: ""
    };
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";

.tags {
  $height: 30px;
  $font-color: rgba(255, 255, 255, 0.8);
  .header {
    height: $height;
    display: flex;
    background: $main-bg;
    width: 100%;
    font-size: 15px;
    line-height: $height;
    padding-left: 10px;
    color: $font-color;
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
    color: $font-color;
    font-size: 14px;
    &:hover {
      background-color: hsla(0, 0%, 57%, 0.2);
    }
    &:focus {
      background-color: hsla(0, 0%, 57%, 0.1);
    }
    &::placeholder {
      font-size: 10px;
    }
  }
  .textarea {
    margin-top: 8px;
    border: 1px solid hsla(0, 0%, 57%, 0.2) !important;
    height: 100px !important;
    width: 100% !important;
    border-radius: 2px;
    resize: none;
    background-color: hsla(0, 0%, 57%, 0.2);
    outline-color: rgba(255, 255, 255, 0);
    padding: 10px;
    // margin-right: 30px;
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
    &::placeholder {
      font-size: 10px;
    }
  }
  .content {
    height: calc(100vh - 80px);
    min-height: 650px;
    background: $three-bg;
    padding-top: 14px;
    padding-bottom: 14px;
    padding-right: 14px;
    padding-left: 14px;
    display: flex;
    .create-tag {
      width: 350px;
      height: 650px;
      background: $vice-bg;
      margin-right: 14px;
      .main {
        padding: 20px;
      }
      .name {
        font-size: 14px;
        color: $font-color;
        margin-left: 4px;
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
    }
    .tags-list {
      flex: 1;
      background: $vice-bg;
      .bar {
        color: $font-color;
        $height: 24px;
        $padding-l: 3px 0 0 3px;
        $padding-r: 0 3px 3px 0;
        $border: 1px solid rgba(0, 0, 0, 0.65);
        $padding: 2px 14px;
        margin-top: 14px;
        height: $height;
        margin-bottom: 14px;
        margin-right: 14px;
        display: flex;

        .icon {
          font-size: 13px;
          margin-right: 10px;
        }
        .one {
          user-select: none;
          border: $border;
          border-radius: 3px;
          display: flex;
          line-height: 18px;
          font-size: 10px;
          opacity: 0.9;
          .one_active {
            background: #393d41 !important;
          }
          .click {
            &:active {
              background: #0088f5;
            }
          }
          div {
            &:hover {
              cursor: pointer;
            }
          }
          .common {
            padding: $padding;
            box-sizing: border-box;
            background: $main-bg;
            height: 22px;
            float: left;
            vertical-align: middle;
            &:nth-child(1) {
              z-index: 9;
            }
            &:nth-child(2) {
              border-left: $border !important;
              border-right: $border;
            }
          }
        }
        .two {
          margin-left: 20px;
        }
        .other {
          flex: 1;
          height: 10px;
        }

        .three {
          float: right;
          border: 0 !important;
          z-index: 2;

          .search-input {
            width: 300px;
            height: 100%;
            background-color: hsla(0, 0%, 57%, 0.1);
            outline-color: rgba(255, 255, 255, 0);
            padding-left: 10px;
            border: $border;
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
            border-right: 0 !important;
            transition: background-color 0.25s linear;
            caret-color: red;
            color: rgba(255, 255, 255, 0.5);
            font-size: 10px;
            &:hover {
              background-color: hsla(0, 0%, 57%, 0.2);
            }
            &:focus {
              background-color: hsla(0, 0%, 57%, 0.1);
            }
          }
          .search-btn {
            width: 80px;
            border: $border;
            border-left: 0 !important;
            padding-left: 10px;
            padding-right: 10px;
            font-size: 12px;
            background: $main-bg;
            color: white;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
            outline-color: $main-bg;
            &:hover {
              cursor: pointer;
            }
            &:active {
              background: #0088f5;
            }
          }

          .all-types {
            height: 30px !important;
            padding-left: 13px;
            padding-right: 6px;
            margin-right: 10px;
            border: $border;
            border-radius: 3px;
            &:hover .item {
              height: 100px;
            }
            .span {
              &:after {
                content: url(../../assets/down_up.svg);
                vertical-align: middle;
                display: inline-block;
                margin-top: -1px;
                line-height: 12px;
                color: white;
              }
            }
            .item {
              width: 88px;
              margin-left: -14px;
              border-radius: 0 0 4px 4px;
              position: fixed;
              background: $main-bg;
              transition: height 0.25s linear;
            }
          }
        }
      }
    }
    .title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: $main-bg;
      padding-left: 10px;
      color: $font-color;
    }
  }
}
</style>
