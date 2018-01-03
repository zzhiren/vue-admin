<template lang="pug">
  div.write-blog
    div.header.new
        //- div.back
        //-   Icon.back-icon(type="ios-arrow-back")
        span 撰写新文章
        //- input.input.title-input(v-model="title" v-bind:disabled="disabled" placeholder="Enter title...")
        //- div.button
        //-   div.release.btn-hover(@click="_editBlog()") 编辑文章
        //-   div.release.btn-hover(@click="_saveBlog(0)") 发布文章
        //-   div.save.btn-hover(@click="_saveBlog(1)") 存至草稿
    div.content
      div.header.blog-title
        span 文章标题
        input.input.title-input(v-model="title" v-bind:disabled="disabled" placeholder="输入标题...")
        div.button
          div.release.btn-hover.green(@click="_editBlog()") 编辑文章
          div.release.btn-hover.blue(@click="_saveBlog(0)") 发布文章
          div.save.btn-hover.red(@click="_saveBlog(1)") 存至草稿
      div.header
        span 文章前言
        input.input.perface(v-model="preface" v-bind:disabled="disabled" placeholder="输入前言...")
        //- input.input.tag(v-model="tag" v-bind:disabled="disabled" placeholder="Enter tag...")
      div.tags
        span 文章标签  
        div.tag(v-bind:class="{tag_active: checkedId.indexOf(index) >= 0}" v-for="(item,index) in tags" @click="_checked(item,index)" v-bind:key="index") {{item}}
    

      div.mark-down
        mavon-edit(ref="mavonedit" :editable="editable")
</template>
<script>
import MavonEdit from "../common/vue/MavonEdit";
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      // tag: "",
      preface: "",
      disabled: false,
      editable: true,
      tags: [
        "计算机",
        "网络",
        "互联网",
        "算法",
        "工作",
        "生活",
        "思考",
        "计算机",
        "Web开发",
        "Vue",
        "Nodejs",
        "JavaScript",
        "Git",
        "GitHub",
        "Chrome",
        "Http",
        "HTML",
        "CSS",
        "Linux",
        "Python",
        "ES6"
      ],
      checkedList: [],
      checkedId: []
    };
  },
  mounted() {
    this.$Message.config({
      top: 50,
      duration: 3
    });
  },
  methods: {
    _checked(value, id) {
      var index = this.checkedList.indexOf(value);
      if (index >= 0) {
        this.checkedList.splice(index, 1);
        this.checkedId.splice(index, 1);
      } else {
        this.checkedList.push(value);
        this.checkedId.push(id);
      }
    },
    _destroy(state, value) {
      this.$Message.destroy();
      if (state == 0) {
        this.$Notice._success(value, this);
      } else if (state == 1) {
        this.$Notice._warning(value, this);
      } else if (state == 2) {
        this.$Notice._error(value, this);
      }
    },
    _editBlog() {
      this.disabled = false;
      this.editable = true;
    },
    _saveBlog(state) {
      if (
        this.title === "" ||
        this.$refs.mavonedit.value === "" ||
        this.preface === "" ||
        this.checkedList.length === 0
      ) {
        var nodesc = "标题 && 前言 && 正文 && 标签 !== ' ' 😆！";
        this.$Notice._info(nodesc, this);
      } else {
        this.disabled = true;
        this.editable = false;
        this.$Notice._loading("Saveing...", this);
        this.content = this.$refs.mavonedit.value;
        var blog = {};
        var date = new Date();
        var start = document.cookie.indexOf("userName");
        var end = document.cookie.indexOf(";", start);
        var userName = document.cookie.slice(start + 9);
        blog.author = userName;
        blog.title = this.title;
        blog.state = state;
        blog.preface = this.preface;
        blog.tag = this.checkedList;
        blog.content = this.$refs.mavonedit.value;
        blog.picDelObj = this.$refs.mavonedit.picDelObj;
        blog.firstPic = this.$refs.mavonedit.firstPic;
        blog.creationTime = date.toLocaleDateString();

        this.$axios({
          method: "post",
          url: "/saveblog",
          timeout: 3500,
          data: blog,
          headers: { "Content-type": "application/json; charset=utf-8" }
        })
          .then(res => {
            if (res.data.status == "0") {
              this._destroy(0, "Save Success 😊");
            } else if (res.data.status == "1") {
              this._destroy(1, "Save Fail 🙁");
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // 请求超时
              console.log(error.request);
              this.$Notice._destroy(2, "超时...", this);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      }
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
    border-radius: 2px;
    height: 100%;
    // padding: 0 !important;
    background-color: $main-bg;
    outline-color: rgba(255, 255, 255, 0);
    padding-left: 5px;
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
  .blog-title {
    padding-right: 5px;
    margin-bottom: 7px;
  }
  .new {
    height: 40px !important;
    line-height: 40px !important;
    font-size: 17px;
    padding-top: 0 !important;
    padding-left: 15px;
    color: rgba(255, 255, 255, 0.5);
  }
  .header {
    $height: 34px;
    width: 100%;
    height: $height;
    background: $main-bg;
    padding-left: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    display: flex;
    line-height: 30px;
    // margin-bottom: 7px;
    // box-sizing: border-box;
    .back {
      float: left;
      width: 40px;
      margin-left: -10px;
      height: 100%;
      font-size: 24px;
      line-height: 30px;
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
      flex: 1;
      height: 100%;
      margin-left: 10px;
    }
    .button {
      width: 300px;
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
        width: 80px;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        margin-right: 10px;
        text-align: center;
      }
      .save {
        margin-right: 0px;
        text-align: center;
        border-radius: 2px;
        width: 80px;
        height: 100%;
        background: $vice-bg;
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
      }
    }
    .perface {
      flex: 3.5;
      margin-left: 10px;
      margin-right: 5px;
    }
  }
  .tags {
    $height: 34px;
    overflow: hidden;
    width: 100%;
    height: $height;
    background: $main-bg;
    padding-left: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    display: flex;
    line-height: 26px;
    margin-top: 7px;

    .tag {
      margin-right: 0px;
      text-align: center;
      border-radius: 2px;
      // width: 80px;
      padding-left: 10px;
      padding-right: 10px;
      height: 100%;
      margin-left: 10px;
      background: $vice-bg;
      display: inline-block;
      background: rgba(80, 80, 80, 0.8);
      &:hover {
        cursor: pointer;
        background: rgba(255, 255, 255, 0.2);
      }
    }
    .tag_active {
      background: #0088f5 !important;
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
    margin-top: 7px;
  }
}
</style>
