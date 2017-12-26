<template lang="pug">
  div.blog-list(ref="bloglistH")
    div.main
      div.bar
        div.one
          div.common(@click="_screening('all')" v-bind:class="{one_active: state == 'all'}") 全部[{{allBlogs.length}}]
          div.common(@click="_screening('0')" v-bind:class="{one_active: state == '0'}") 已发布[{{postedBlogs.length}}]
          div.common(@click="_screening('1')" v-bind:class="{one_active: state == '1'}") 草稿[{{draftBlogs.length}}]
          
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
          div.common.all-types
            span.span 所有分类
              //- img(src="../../../assets/down_up.svg" height="22")
            div.item
          div.common.all-types
            span.span 所有标签
            div.item
          //- div.common 
          input.search-input(v-model="condition" placeholder="文章标题、描述...")
          button.search-btn 搜索
      div.list-header
        div.blog-id ID
        div.blog-title 文章
        div.blog-tag 标签
        div.blog-date 日期
        div.blog-read 阅读
        div.blog-comment 评论
        div.blog-love 喜欢
        div.blog-love 状态
        //- div.blog-state 状态
        div.blog-operation 操作
      div.blogs.scroll(ref="blogs")
        div.blog-item(v-for="(item,index) in blogs")
          //- div.blog-state.release
          //-   Icon.large-icon-font.green(type="checkmark")
          div.blog-id 
            span.span ID
          div.blog-title.item-title
            div#font-family.content(v-bind:style="'background-image:url('+item.firstPic+');'")
              div.desc 
                p.title
                  span(v-html="item.title")
                  Icon.icon-font.green(type="checkmark")
                p.preface(v-html="item.preface")
          div.blog-tag.center-color
            div.tag
              ul
                li(v-for="(tag,index) in item.tag")
                  Icon.tag-icon(type="ios-pricetag")
                  span {{tag}}
          div.blog-date.center-color 
            span.span {{item.creationTime}}
          div.blog-read.center-color 
            span.span {{item.eyes}}人阅读
          div.blog-comment.center-color 
            span.span {{item.comment.length}}人评论
          div.blog-love.center-color 
            span.span {{item.love}}人喜欢
          div.blog-love.center-color 
            span.span(v-if="item.state == 0") 已发布
            span.span(v-if="item.state == 1") 未发布
          //- div.blog-state.release
          //-   span.span {{itme.state}}
          div.blog-operation.operation-div 
            div.operation(@click="changeReleaseState()")
              span 发布文章
            div.operation
              span 移到草稿
            div.operation
              span 编辑文章
            div.operation(@click="_deleteBlog(item._id)")
              span 删除文章
        page
</template>
<script>
import axios from 'axios'
import Page from '../common/vue/Page'

export default {
  data() {
    return {
      allBlogs: [],
      postedBlogs: [],
      draftBlogs: [],
      blogs: [],
      state: "all",
      condition: ""
    };
  },
  components:{
    Page
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$refs.blogs.style.height =
        innerHeight - 34 - 40 - 30 - 28 - 14 - 14 - 23 + "px";
      // this._getAllBlogs();
      this._getAllBlogs();
      this._getPostedBlogs();
      this._getDraftBlogs();
    },
    _refreshList(state) {
      if (state == "all") {
        this._getAllBlogs();
      } else if (state == "0") {
        this._getPostedBlogs();
      } else if (state == "1") {
        this._getDraftBlogs();
      }
    },
    _getAllBlogs() {
      let date = new Date();
      let timer = date.getTime().toString();
      let token = document.cookie.split(';')[2]
      this.$axios({
        method: "get",
        url: "/getallblogs?t=" + timer,
        // headers:{
        //   'access-token': token
        // }
      }).then(res => {
        this.allBlogs = res.data.data;
        this.blogs = res.data.data;
      });
    },
    _getPostedBlogs() {
      var date = new Date();
      var timer = date.getTime().toString();
      // console.log(value)
      this.$axios({
        method: "get",
        url: "/getpostedblogs?t=" + timer
      }).then(res => {
        this.postedBlogs = res.data.data;
      });
    },
    _getDraftBlogs() {
      var date = new Date();
      var timer = date.getTime().toString();
      // console.log(value)
      this.$axios({
        method: "get",
        url: "/getdraftblogs?t=" + timer
      }).then(res => {
        this.draftBlogs = res.data.data;
      });
    },
    _screening(value) {
      this.state = value;
      if (value == "all") {
        this._getAllBlogs();
        this.blogs = this.allBlogs;
      } else if (value == "0") {
        this._getPostedBlogs();
        this.blogs = this.postedBlogs;
      } else if (value == "1") {
        this._getDraftBlogs();
        this.blogs = this.draftBlogs;
      }
    },
    _deleteBlog(id) {
      this.$axios({
        method: "post",
        url: "/deleteblog",
        data: {
          id: id
        }
      }).then(res => {
        if (res.data.status == "0") {
          var nodesc = "删除成功=￣ω￣=!";
          this._init();
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

  .main {
    padding: 14px 20px 0 20px;
    background: #474b51;
    box-sizing: border-box;
    .bar {
      // width: 202px;
      // background: blue;
      height: 30px;
      margin-bottom: 14px;
      display: flex;
      $padding-l: 3px 0 0 3px;
      $padding-r: 0 3px 3px 0;
      $border: 1px solid rgba(0, 0, 0, 0.65);
      $padding: 2px 14px;
      .icon {
        font-size: 13px;
        margin-right: 10px;
        // transition: transform 0.5s linear;
      }
      .one {
        user-select: none;
        border: $border;
        border-radius: 3px;
        display: flex;
        line-height: 24px;
        font-size: 12px;
        color: white;
        opacity: 0.9;
        .one_active {
          background: #393d41 !important;
          // border-left: $border!important;
          // border-right: $border!important;
        }
        .click {
          &:active {
            background: #0088f5;
          }
          // &:hover .icon{
          //   transform: rotate(360deg);
          // }
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
          height: 28px;
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
          // border-radius: 2px;
          width: 300px;
          height: 100%;
          // padding: 0 !important;
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
          font-size: 14px;
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
          font-size: 14px;
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
          height: 30px!important;
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
              // margin-top: -10px;
              vertical-align: middle;
              display: inline-block;
              margin-top: -1px;
              line-height: 12px;
              color: white;
              // margin-right: 23px;
            }
          }
          .item {
            height: 0;
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

  .list-header {
    width: 100%;
    height: 30px;
    display: flex;
    text-align: center;
    line-height: 30px;
    color: white;
    background: #393d41;
    // position: fixed;
    padding-right: 4px;
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
    // text-align: left;
    .tag {
      display: table;
      height: 100%;
      width: 100%;
      padding-left: 30%;
      ul {
        vertical-align: middle;
        display: table-cell;
        text-align: left;
        width: 100%;
        .tag-icon {
          margin-right: 5px;
        }
      }
    }
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
    text-align: center;
  }
  .operation-div {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    .operation {
      flex: 1;
      margin: 0 auto;
      border-radius: 2px;
      margin-bottom: 6px;
      line-height: 28.5px;
      color: white;
      opacity: 0.95;
      width: 65px;
      font-size: 12px;
      &:hover {
        opacity: 1 !important;
        cursor: pointer;
      }
      &:active {
        // background: black!important;
        opacity: 0.7 !important;
      }
      &:nth-child(1) {
        background: #42b983;
      }
      &:nth-child(2) {
        background: orange;
      }
      &:nth-child(3) {
        background: #0088f5;
      }
      &:nth-child(4) {
        background: #e64c3c;
      }
    }
  }
  .blogs {
    overflow-y: auto;
    overflow-x: hidden;
    height: 1000px;
    // &::-webkit-scrollbar {
    //   width: 5px;
    //   height: 16px;
    //   background-color: black;
    //   opacity: 1;
    // }
    // &::-webkit-scrollbar-track {
    //   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    //   border-radius: 10px;
    //   // background-color: #f5f5f5;
    // }
    // &::-webkit-scrollbar-thumb {
    //   border-radius: 10px;
    //   -webkit-box-shadow: inset 0 0 6px rgba(54, 54, 54, 0.3);
    //   background-color: rgba(255, 255, 255, 0.5);
    // }
    .blog-item {
      width: 100%;
      height: $blog-item-h;
      background: #3f4347;
      display: flex;
      box-sizing: border-box;
      -webkit-transition: $hover-bg;
      transition: $hover-bg;
      overflow-x: hidden;
      &:nth-child(2n) {
        background: #393d41;
      }
      &:hover #img {
        transform: translateX(-10px);
      }
      &:hover .title {
        text-decoration: underline;
      }
      .span {
        line-height: $blog-item-h;
      }
      .center-color {
        text-align: center;
        color: white;
        opacity: 0.8;
        font-size: 11px !important;
      }
      .item-title {
        padding: 14px 14px;
        // background: red;
        .content {
          width: 100%;
          height: 100%;
          border-radius: 3px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: inherit;
          .desc {
            width: 100%;
            height: 100%;
            padding: 8px 9px;
            box-sizing: border-box;
            background: rgba(0, 0, 0, 0.65);
            border-radius: inherit;
            .title {
              line-height: 20px;
              color: white;
              font-size: 14px;
              opacity: 0.9;
              letter-spacing: 1px;
              &:hover {
                cursor: pointer;
              }
              .icon-font {
                margin-left: 3px;
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
    }
    .release {
      width: 40px;
      text-align: center;
      margin-right: 1px;
      transition: $transition;
    }
  }
}
</style>
