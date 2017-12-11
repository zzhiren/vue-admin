<template lang="pug">
  div.blog-list(ref="bloglistH")
    div.list-header
      div.blog-state 状态
      div.blog-id ID
      div.blog-title 文章
      div.blog-tag 标签
      div.blog-date 日期
      div.blog-read 阅读
      div.blog-comment 评论
      div.blog-love 喜欢
      div.blog-operation 操作
    div.blog-item(v-for="(item,index) in blogs")
      div.blog-state.release
        Icon.large-icon-font.green(type="checkmark")
      div.blog-id ID
      div.blog-title.item-title
        div#font-family.content(v-bind:style="'background-image:url('+item.firstPic+');'")
          div.desc 
            p.title(v-html="item.title")
            p.preface(v-html="item.preface")
      div.blog-tag.center-color {{item.tag[0]}}
      div.blog-date.center-color {{item.creationTime}}
      div.blog-read.center-color {{item.eyes}}人阅读
      div.blog-comment.center-color {{item.comment.length}}人评论
      div.blog-love.center-color {{item.love}}人喜欢
      div.blog-operation 操作
      //- div.release.green
      //-   Icon.large-icon-font(type="checkmark")
      //-   //- p.p 已发布
      //- div.blog-preface
      //-   h4.title.blue(v-html="item.title")
      //- p.operation.time
      //-   //- Icon.large-icon-font(type="ios-calendar")
      //-   span.p {{item.creationTime}}
      //- p.operation
      //-   //- Icon.large-icon-font(type="eye")
      //-   span.p {{item.eyes}}人阅读
      //- p.operation
      //-   //- Icon.large-icon-font(type="chatbox-working")
      //-   span.p {{item.comment.length}}人评论
      //- p.operation
      //-   //- Icon.large-icon-font(type="heart")
      //-   span.p {{item.love}}人喜欢
      //- div.button.green
      //-   Icon.large-icon-font(type="ios-compose")
      //-   //- p.p 编辑
      //- div.button.red.delete(@click="deleteBlog(item._id)")
      //-   Icon.large-icon-font(type="android-delete")
        //- p.p 删除
      //- div.edit-blog
      //- div.delete-blog
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      blogs: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    success(nodesc) {
      this.$Notice.success({
        title: nodesc
      });
    },
    // info(nodesc) {
    //   this.$Notice.info({
    //     title: nodesc
    //   });
    // },
    // warning(nodesc) {
    //   this.$Notice.warning({
    //     title: nodesc
    //   });
    // },
    error(nodesc) {
      this.$Notice.error({
        title: nodesc
      });
    },
    init() {
      // this.$refs.bloglistH.style.height = innerHeight - 60 - 7 - 4 - 40 - 8 - 4 - 7 + "px";
      this.getBlogList();
    },
    getBlogList() {
      var date = new Date();
      var timer = date.getTime().toString();
      this.$axios({
        method: "get",
        url: "/getbloglist?t=" + timer
      }).then(res => {
        this.blogs = res.data.data;
        console.log(this.blogs);
      });
    },
    deleteBlog(id) {
      this.$axios({
        method: "post",
        url: "/deleteblog",
        data: {
          id: id
        }
      }).then(res => {
        if (res.data.status == "0") {
          var nodesc = "删除成功=￣ω￣=!";
          for (var i in this.blogs) {
            if ((this.blogs[i]._id = id)) {
              this.blogs.splice(i, 1);
              console.log(this.blogs[i]);
              break;
            } else {
              continue;
            }
          }
          this.success(nodesc);
        } else if (res.data.status == "1") {
          var nodesc = "删除失败(⊙o⊙)？!";
          this.error(nodesc);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";
$blog-item-h: 150px;
.blog-list {
  overflow: auto;
  height: 100%;
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
  .list-header {
    width: 100%;
    height: 30px;
    display: flex;
    text-align: center;
    line-height: 30px;
    color: gray;
    background: #393d41;
  }
  .blog-state {
    width: 40px;
    vertical-align: middle;
  }
  .blog-id {
    width: 60px;
    text-align: center;
  }
  .blog-title {
    width: 405px;
  }
  .blog-tag {
    flex: 1;
  }
  .blog-date {
    flex: 1;
  }
  .blog-read {
    flex: 1;
  }
  .blog-comment {
    flex: 1;
  }
  .blog-love {
    flex: 1;
  }
  .blog-operation {
    flex: 1;
  }
  .blog-item {
    width: 100%;
    height: $blog-item-h;
    line-height: $blog-item-h;
    background: #393d41;
    display: flex;
    box-sizing: border-box;
    -webkit-transition: $hover-bg;
    transition: $hover-bg;
    overflow-x: hidden;
    &:nth-child(2n) {
      background: #3f4347;
    }
    &:hover {
      background: $main-bg;
    }
    &:hover #img {
      transform: translateX(-10px);
    }
    &:hover .title {
      text-decoration: underline;
      // transform: translateX(10px);
      // opacity: 1 !important;
      // color: #42b983!important;
    }
    .center-color{
          text-align: center;
          color: white;
          opacity: .8;;
          font-size: 11px!important;
        }
    .item-title {
      padding: 14px 14px;
      // background: red;
      .content {
        width: 100%;
        height: 100%;
        border-radius: 2px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        .desc {
          width: 100%;
          height: 100%;
          padding: 8px 9px;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.65);
          .title {
            line-height: 20px;
            color: white;
            font-size: 14px;
            opacity: 0.9;
            letter-spacing: 1px;
            &:hover {
              cursor: pointer;
            }
          }
          .preface {
            text-align: justify;
            margin-top: 6px;
            height: 76%;
            line-height: 20px;
            color: white;
            opacity: 0.7;
            font-size: 12px;
            letter-spacing: 1px;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        }
        
      }
    }

    // .blog-pic {
    //   width: 100px;
    //   height: 100%;
    //   overflow: hidden;
    //   background: black;
    //   cursor: pointer;
    //   .pic {
    //     transition: transform 0.25s linear;
    //     width: 220px;
    //   }
    // }
    // .blog-preface {
    //   flex: 1;
    //   margin-left: 7px;
    //   padding-left: 4px;
    //   box-sizing: border-box;
    //   .title {
    //     letter-spacing: 1px;
    //     line-height: $blog-item-h;
    //     opacity: 0.9;
    //     -webkit-transition: $hover-bg;
    //     transition: $hover-bg;
    //     width: 100%;
    //     &:hover{
    //       cursor: pointer;
    //     }
    //   }
    // }

    // .delete {
    //   margin-right: 0 !important;
    //   &:hover{
    //     cursor: pointer;
    //   }
    // }
    // .time {
    //   width: 100px !important;
    // }
    .release {
      width: 40px;
      text-align: center;
      margin-right: 1px;
      transition: $transition;
      .large-icon-font {
        transition: transform 0.25s linear;
        line-height: $blog-item-h;
        font-size: 14px;
      }
    }
    // .button {
    //   // background: rgba(0, 0, 0, 1)!important;
    //   width: 30px;
    //   text-align: center;
    //   margin-right: 1px;
    //   transition: $transition;
    //   .large-icon-font {
    //     transition: transform 0.25s linear;
    //     line-height: $blog-item-h;
    //     font-size: 20px;
    //   }
    //   &:hover{
    //     cursor: pointer;
    //     background: rgba(0, 0, 0, .2)!important;
    //   }

    // }
    //   .operation {
    //     // width: 100px;
    //     // height: 119px;
    //     // background: $main-bg;
    //     color: #e4e5e5;
    //     text-align: center;
    //     margin-right: 40px;
    //     transition: $transition;
    //     // transition: transform 0.5s linear;
    //     // overflow: hidden;
    //     &:hover {
    //       // transform: $transform-360;
    //       cursor: pointer;
    //     }
    //     // &:hover .large-icon-font {
    //     //   // display: none;
    //     //   transform: $translateY-40;
    //     // }
    //     // &:hover .p {
    //     //   // display: block;
    //     //   transform: $translateY-40;
    //     // }

    //     .large-icon-font {
    //       transition: transform 0.25s linear;
    //       line-height: $blog-item-h;
    //       font-size: 20px;
    //     }
    //     .p {
    //       transition: transform 0.25s linear;
    //       // display: none;
    //       line-height: $blog-item-h;
    //       font-size: 12px;
    //       font-family: "Sub Head";
    //     }
    //   }
  }
}
</style>
