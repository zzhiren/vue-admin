<template lang="pug">
  div.write-blog
    div.header
        div.back
          Icon.back-icon(type="ios-arrow-back")
        span 文章标题
        input.input.title-input(v-model="title" placeholder="Enter title...")
        div.button
          div.release.btn-hover(@click="saveBlog(0)") 发布文章
          div.save.btn-hover(@click="saveBlog(1)") 存至草稿
    div.content
      div.header
        span 前言
        input.input.perface(v-model="preface" placeholder="Enter title...")
        span 标签
        input.input.tag(v-model="tag" placeholder="Enter tag...")
      div.mark-down
        mavon-edit(ref="mavonedit")
</template>
<script>
import MavonEdit from "../common/vue/MavonEdit";
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      tag: "",
      preface: "",
      loadingMsg: false
    };
  },
  mounted() {
    this.$Message.config({
        top:50
      })
  },
  methods: {
    closable() {
      
        
      this.$Message.loading({
        content: "loading...",
        duration: 0,
        closable: false,
      });
    },
    saveBlog(state) {
      this.closable()
      console.log(1)
      // if (
      //   this.title === "" ||
      //   this.$refs.mavonedit.value === "" ||
      //   this.preface === ""
      // ) {
      //   var nodesc = "标题 && 前言 && 正文 !== null (→_→)！";
      //   this.warning(nodesc);
      // } else {
      //   this.content = this.$refs.mavonedit.value;
      //   var blog = {};
      //   var date = new Date();
      //   var start = document.cookie.indexOf("userName");
      //   var end = document.cookie.indexOf(";", start);
      //   var userName = document.cookie.slice(start + 9);
      //   blog.author = userName;
      //   blog.title = this.title;
      //   blog.state = state;
      //   blog.preface = this.preface;
      //   blog.tag = this.tag.split("/");
      //   blog.content = this.$refs.mavonedit.value;
      //   blog.picDelObj = this.$refs.mavonedit.picDelObj;
      //   blog.firstPic = this.$refs.mavonedit.firstPic;
      //   blog.creationTime = date.toLocaleDateString();

      //   this.$axios({
      //     method: "post",
      //     url: "/saveblog",
      //     data: blog,
      //     headers: { "Content-type": "application/json; charset=utf-8" }
      //   }).then(res => {
      //     if (res.data.status == "0") {
      //       var nodesc = "保存成功=￣ω￣=!";
      //       this.success(nodesc);
      //     } else if (res.data.status == "1") {
      //       var nodesc = "保存失败(⊙o⊙)？!";
      //       this.error(nodesc);
      //     }
      //   });
      // }
    }
  },
  components: {
    MavonEdit
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";
$button-width: 50px;

.write-blog {
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.8);
  height: 100%;
  .input {
    height: 100%;
    padding: 0 !important;
    background-color: $main-bg;
    // background-color: hsla(0, 0%, 77%, 0.4);
    // outline-color: rgba(255, 255, 255, 0);
    border: 0 !important;
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
  .header {
    $height: 34px;
    width: 100%;
    height: $height;
    background: $main-bg;
    padding-left: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    // box-sizing: border-box;
    .back {
      float: left;
      width: 40px;
      margin-left: -10px;
      height: 100%;
      font-size: 24px;
      line-height: $height;
      text-align: center;
      color: white;
      &:hover {
        cursor: pointer;
      }
      &:hover .back-icon {
        cursor: pointer;
        transform: rotateX(360deg);
      }
      .back-icon {
        color: white;
        transition: transform 1s linear;
      }
    }
    .title-input {
      width: 50%;
      height: 100%;
      margin-left: 15px;
    }
    .button {
      width: 35%;
      height: 100%;
      display: block;
      // background: red;
      float: right;
      padding: 1px;
      text-align: right;
      line-height: 28px;
      .btn-hover {
        &:hover {
          cursor: pointer;
          background: rgba(255, 255, 255, 0.4);
        }
      }
      .release {
        border-radius: 2px;
        display: inline-block;
        width: 100px;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        margin-right: 10px;
        text-align: center;
      }
      .save {
        margin-right: 5px;
        text-align: center;
        border-radius: 2px;
        width: 100px;
        height: 100%;
        background: $vice-bg;
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
      }
    }
    .perface {
      width: 74%;
      margin-left: 15px;
      margin-right: 15px;
    }
    .tag {
      width: 20%;
      margin-left: 15px;

      &:before {
        content: "标签";
        font-size: 14px;
      }
    }
  }
  .content {
    width: 100%;
    padding: 14px;
    background: #3f4347;
  }
  .title {
    width: 100%;
    display: flex;
    margin-bottom: 7px;
    .input {
      flex: 1;
    }
    .tag-input {
      flex: 0.4;
      margin-left: 1px;
      margin-right: 1px;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }
  .mark-down {
    flex: 1;
  }
}
</style>
