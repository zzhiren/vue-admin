<template lang="pug">
  div.blog-list(ref="bloglistH")
    div.blog-item(v-for="(item,index) in blogs")
      div.operation.green
        Icon.large-icon-font(type="checkmark")
        p.p 已发布
      div.blog-preface
        h4.title.blue(v-html="item.title")
      div.operation.orange.time
        Icon.large-icon-font(type="ios-calendar")
        p.p {{item.creationTime}}
      div.operation.yellow
        Icon.large-icon-font(type="eye")
        p.p {{item.eyes}}
      div.operation.blue
        Icon.large-icon-font(type="chatbox-working")
        p.p {{item.comment.length}}
      div.operation.red
        Icon.large-icon-font(type="heart")
        p.p {{item.love}}
      div.operation.green
        Icon.large-icon-font(type="ios-compose")
        p.p 编辑
      div.operation.purple.delete
        Icon.large-icon-font(type="android-delete")
        p.p 删除
      //- div.edit-blog
      //- div.delete-blog
</template>
<script>
import axios from "axios";

export default {
  data(){
    return{
      blogs:[]
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$refs.bloglistH.style.height = innerHeight - 60 - 7 - 4 - 40 - 8 - 4 - 7 + "px";
      this.getBlogList()
    },
    getBlogList(){
      var date = new Date()
      var timer = date.getTime().toString()
      this.$axios({
        method: 'get',
        url: '/getbloglist?t=' + timer,
      }).then(res=>{
        this.blogs = res.data.data
        console.log(this.blogs)
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";
$blog-item-h: 40px;
.blog-list {
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height: 16px;
    background-color: black;
    opacity: 1;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    // background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(54, 54, 54, 0.3);
    background-color: #555;
  }
  .blog-item {
    width: 100%;
    height: $blog-item-h;
    margin-bottom: 4px;
    // background: rgba(255,255,255,.9);
    background: $bg-dark-one;
    border-radius: 2px;
    display: flex;
    // padding: 7px;
    box-sizing: border-box;
    -webkit-transition: $hover-bg;
    transition: $hover-bg;
    &:hover {
      background: rgba(28, 28, 28, 0.95);
    }
    &:hover #img {
      transform: translateX(-10px);
    }
    &:hover .title {
      text-decoration: underline;
      transform: translateX(10px);
      opacity: 1 !important;
      // color: #42b983!important;
    }
    .blog-pic {
      width: 100px;
      height: 100%;
      overflow: hidden;
      background: black;
      cursor: pointer;
      .pic {
        transition: transform 0.25s linear;
        width: 220px;
      }
    }
    .blog-preface {
      flex: 1;
      // height: 119px;
      // background: black;
      margin-left: 7px;
      padding-left: 4px;
      box-sizing: border-box;
      // -webkit-transition: $hover-bg;
      // transition: $hover-bg;
      // &:hover {
      //   background: rgba(28, 28, 28, 0.95);
      // }
      // &:hover #img {
      //   transform: translateX(-10px);
      // }
      // &:hover .title {
      //   text-decoration: underline;
      //   transform: translateX(10px);
      //   opacity: 1 !important;
      //   // color: #42b983!important;
      // }
      .title {
        letter-spacing: 1px;
        line-height: $blog-item-h;
        opacity: 0.9;
        -webkit-transition: $hover-bg;
        -webkit-transition: $hover-bg;
        transition: $hover-bg;
        &:hover {
          cursor: pointer;
        }
      }
    }

    .delete {
      margin-right: 0 !important;
    }
    .time {
      width: 70px !important;
    }
    .operation {
      width: $blog-item-h;
      // height: 119px;
      background: rgba(0, 0, 0, 0.8);
      text-align: center;
      margin-right: 1px;
      transition: $transition;
      // transition: transform 0.5s linear;
      overflow: hidden;
      &:hover {
        // transform: $transform-360;
        cursor: pointer;
      }
      &:hover .large-icon-font {
        // display: none;
        transform: $translateY-40;
      }
      &:hover .p {
        // display: block;
        transform: $translateY-40;
      }

      .large-icon-font {
        transition: transform 0.25s linear;
        line-height: $blog-item-h;
        font-size: 20px;
      }
      .p {
        transition: transform 0.25s linear;
        // display: none;
        line-height: $blog-item-h;
        font-size: 12px;
        font-family: "Sub Head";
      }
    }
  }
}
</style>
