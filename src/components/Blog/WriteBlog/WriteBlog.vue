<template lang="pug">
  div.write-blog
    div.title
      Input.title-input(v-model="title" placeholder="Enter title...")
      Input.tag-input(v-model="tag" placeholder="Enter tag...")
      div.options
        div.save.transition-Y
          Icon.icon(type="android-globe")
          p.p 发布
        div.release.transition-Y(@click="saveBlog()")
          Icon.icon(type="android-radio-button-on")
          p.p 保存
    div.mark-down
      mavon-edit(ref="mavonedit")
</template>
<script>
import MavonEdit from "../../common/vue/MavonEdit";
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      tag: ""
    };
  },
  mounted() {},
  methods: {
    success(nodesc) {
      this.$Notice.success({
        title: nodesc
      });
    },
    info(nodesc) {
      this.$Notice.info({
        title: nodesc
      });
    },
    warning(nodesc) {
      this.$Notice.warning({
        title: nodesc
      });
    },
    error(nodesc) {
      this.$Notice.error({
        title: nodesc
      });
    },
    saveBlog() {
      if (this.title === "" || this.$refs.mavonedit.value === "") {
        var nodesc = '请输入博客标题和内容(→_→)！'
        this.warning(nodesc)
      } else {
        this.content = this.$refs.mavonedit.value;
        var blog = {};
        var date = new Date();
        var start = document.cookie.indexOf("userName");
        var end = document.cookie.indexOf(";", start);
        var userName = document.cookie.slice(start + 9);
        blog.author = userName;
        blog.title = this.title;
        blog.tag = this.tag.split("/");
        blog.content = this.$refs.mavonedit.value;
        blog.picDelObj = this.$refs.mavonedit.picDelObj;
        blog.firstPic = this.$refs.mavonedit.firstPic;
        blog.creationTime = date.toLocaleDateString();

        this.$axios({
          method: "post",
          url: "/saveblog",
          data: blog,
          headers: { "Content-type": "application/json; charset=utf-8" }
        }).then(res => {
          if (res.data.status == "0") {
            var nodesc = "保存成功=￣ω￣=!";
            this.success(nodesc);
          } else if (res.data.status == "1") {
            var nodesc = "保存失败(⊙o⊙)？!";
            this.error(nodesc);
          }
        });
      }
    }
  },
  components: {
    MavonEdit
  }
};
</script>
<style lang="scss">
$button-width: 50px;
.write-blog {
  display: flex;
  flex-direction: column;
  color: white;
  height: 100%;
  .title {
    width: 100%;
    display: flex;
    margin-bottom: 7px;
    .title-input {
      flex: 1;
      input {
        border-top-left-radius: 4px !important;
        border-bottom-left-radius: 4px !important;
      }
    }
    .tag-input {
      flex: 0.4;
      margin-left: 1px;
      margin-right: 1px;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
    .options {
      display: flex;
      text-align: center;
      .save {
        width: $button-width;
        background: black;
        margin-right: 1px;
        font-size: 18px;
        line-height: 33px;
        height: 33px;
        &:hover {
          cursor: pointer;
        }
        &:active {
          background: rgba(0, 0, 0, 0.5);
        }
      }
      .release {
        height: 33px;
        width: $button-width;
        background: black;
        line-height: 33px;
        font-size: 18px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        &:hover {
          cursor: pointer;
        }
        &:active {
          background: rgba(0, 0, 0, 0.5);
        }
      }
      .transition-Y {
        overflow: hidden;
        .icon {
          transition: transform 0.5s linear;
          font-size: 19px;
        }
        .p {
          transition: transform 0.5s linear;
          font-size: 14px;
        }
        &:hover .icon {
          transform: translateY(-33px);
        }
        &:hover .p {
          transform: translateY(-33px);
        }
      }
    }
  }
  .mark-down {
    flex: 1;
  }
}
</style>
