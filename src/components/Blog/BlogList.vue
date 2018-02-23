<template lang="pug">
  div.blog-list(ref="bloglistH")
    div.main
      div.bar
        div.one.fadeInLeft
          div.common(@click="_screening('all')" v-bind:class="{one_active: state == 'all'}") 全部[{{allTotal}}]
          div.common(@click="_screening('0')" v-bind:class="{one_active: state == '0'}") 已发布[{{postTotal}}]
          div.common(@click="_screening('1')" v-bind:class="{one_active: state == '1'}") 草稿[{{draftTotal}}]
        div.two.one.fadeInLeft
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
        div.three.one.fadeInRight
          div.common.all-types
            span.span 所有分类
            div.item
          div.common.all-types
            span.span 所有标签
            div.item
          input.search-input(v-model="condition" placeholder="文章标题、描述...")
          div.search-btn 搜索
      div.list-header
        div.blog-id ID
        div.blog-title 文章
        div.blog-tag 标签
        div.blog-date 日期
        div.blog-read 阅读
        div.blog-comment 评论
        div.blog-love 喜欢
        div.blog-love 状态
        div.blog-operation 操作
      div.blogs.scroll(ref='scroll')
        div.blog-item(v-for="(item,index) in blogs" v-bind:key="index")
          div.blog-id 
            span.span ID
          div.blog-title.item-title
            div#font-family.content(v-bind:style="'background-image:url('+item.firstPic+');'")
              div.desc 
                p.title
                  span(v-html="item.title")
                  Icon.icon-font.green(v-if="item.state == 0" type="checkmark-round")
                  Icon.icon-font.yellow(v-if="item.state == 1" type="android-close")
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
            span.span {{item.comment}}人评论
          div.blog-love.center-color 
            span.span {{item.love}}人喜欢
          div.blog-love.center-color 
            span.span(v-if="item.state == 0") 已发布
            span.span(v-if="item.state == 1") 未发布
          div.blog-operation.operation-div 
            div.operation(@click="_changeBlogState(item._id,'0')")
              span 发布文章
            div.operation(@click="_changeBlogState(item._id,'1')")
              span 移到草稿
            div.operation(@click="_toWriteBlog('edit',item._id)")
              span 编辑文章
            div.operation(@click="_deleteBlog(item._id)" v-if="deleting !== item._id")
              span 删除文章
            div.operation(v-if="deleting === item._id")
              span 删除中...
      page(ref="page" @_pageOnChange="_pageOnChange" :total="total" :page="page")
</template>
<script>
import axios from "axios";
import Page from "../common/vue/Page";

export default {
  data() {
    return {
      allBlogs: [],
      postedBlogs: [],
      draftBlogs: [],
      blogs: [],
      state: "all",
      condition: "",
      page: 1,
      total: 1,
      allTotal: 0,
      postTotal: 0,
      draftTotal: 0,
      deleting: ""
    };
  },
  components: {
    Page
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this._getAllBlogs();
      this._getPostedBlogs();
      this._getDraftBlogs();
      this._refreshList(this.state);
    },
    // 点击编辑按钮，跳转到编辑博客窗口
    _toWriteBlog(type, value) {
      this.$router.push({
        name: "writeblog",
        params: { type: type, id: value }
      });
    },
    // 翻页
    _pageOnChange(page) {
      this.page = page;
      if (this.state == "all") {
        this._getAllBlogs();
      } else if (this.state == "0") {
        this._getPostedBlogs();
      } else if (this.state == "1") {
        this._getDraftBlogs();
      }
      this.$refs.scroll.scrollTop = 0;
    },
    // 刷新列表
    _refreshList(state) {
      this.blogs = [];
      this.page = 1;
      if (state == "all") {
        // this._getAllBlogs();
        this._screening("all");
      } else if (state == "0") {
        // this._getPostedBlogs();
        this._screening("0");
      } else if (state == "1") {
        // this._getDraftBlogs();
        this._screening("1");
      }
    },
    // 切换全部、发布、草稿
    _screening(value) {
      this.state = value;
      this.page = 1;
      if (value == "all") {
        this._getAllBlogs();
        this.blogs = [];
        setTimeout(() => {
          this.blogs = this.allBlogs;
        }, 1);
        this.total = this.allTotal;
      } else if (value == "0") {
        this._getPostedBlogs();
        this.blogs = [];
        setTimeout(() => {
          this.blogs = this.postedBlogs;
        }, 1);
        this.total = this.postTotal;
      } else if (value == "1") {
        this._getDraftBlogs();
        this.blogs = [];
        setTimeout(() => {
          this.blogs = this.draftBlogs;
        }, 1);
        this.total = this.draftTotal;
      }
    },
    // 获取所有博客
    _getAllBlogs() {
      let date = new Date();
      let timer = date.getTime().toString();
      let token = document.cookie.split(";")[2];
      this.$axios({
        method: "get",
        url: "/getallblogs",
        params: {
          t: timer,
          page: this.page
        }
      }).then(res => {
        this.allBlogs = res.data.data;
        if (this.state == "all") {
          this.blogs = res.data.data;
          this.total = res.data.total;
        }
        this.allTotal = res.data.total;
      });
    },
    // 获取发布博客
    _getPostedBlogs() {
      let date = new Date();
      let timer = date.getTime().toString();
      this.$axios({
        method: "get",
        url: "/getpostedblogs",
        params: {
          t: timer,
          page: this.page
        }
      }).then(res => {
        this.postedBlogs = res.data.data;
        if (this.state == "0") {
          this.blogs = this.postedBlogs;
          // this.postTotal = res.data.total;
        }
        this.postTotal = res.data.total;
      });
    },
    // 获取草稿博客
    _getDraftBlogs() {
      let date = new Date();
      let timer = date.getTime().toString();
      this.$axios({
        method: "get",
        url: "/getdraftblogs",
        params: {
          t: timer,
          page: this.page
        }
      }).then(res => {
        this.draftBlogs = res.data.data;
        if (this.state == "1") {
          this.blogs = this.draftBlogs;
        }
        this.draftTotal = res.data.total;
      });
    },
    // 修改博客发布状态
    _changeBlogState(id, state) {
      this.$axios({
        method: "post",
        url: "/changeblogstate",
        data: {
          id: id,
          state: state
        }
      }).then(res => {
        if (res.data.status == "0") {
          this.init();
        }
      });
    },
    // 删除博客
    _deleteBlog(id) {
      this.deleting = id;
      this.$axios({
        method: "post",
        url: "/deleteblog",
        data: {
          id: id
        }
      }).then(res => {
        if (res.data.status == "0") {
          let nodesc = "删除成功=￣ω￣=!";
          this.init();
          this.success(nodesc);
        } else if (res.data.status == "1") {
          let nodesc = "删除失败(⊙o⊙)？!";
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-move {
  transition: transform 1s;
}
.blog-list {
  overflow-x: hidden;
  height: 100%;
  .main {
    padding: 14px 20px 0 20px;
    background: #474b51;
    box-sizing: border-box;
    min-width: 1180px;
    .bar {
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
          font-size: 14px;
          &:hover {
            background-color: hsla(0, 0%, 57%, 0.2);
          }
          &:focus {
            background-color: hsla(0, 0%, 57%, 0.1);
          }
        }
        // .search-btn {
        //   width: 80px;
        //   border: $border;
        //   border-left: 0 !important;
        //   padding-left: 10px;
        //   padding-right: 10px;
        //   font-size: 14px;
        //   background: $main-bg;
        //   color: white;
        //   border-top-right-radius: 2px;
        //   border-bottom-right-radius: 2px;
        //   outline-color: $main-bg;
        //   &:hover {
        //     cursor: pointer;
        //   }
        //   &:active {
        //     background: #0088f5;
        //   }
        // }

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
      overflow: hidden;
      flex: 1;
      margin: 0 auto;
      border-radius: 2px;
      margin-bottom: 6px;
      line-height: 28.5px;
      color: white;
      opacity: 0.8;
      width: 65px;
      font-size: 12px;
      transition: opacity 0.5s linear;
      &:hover {
        opacity: 1;
        cursor: pointer;
      }
      &:active {
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
    
    height: calc(100vh - 233px);
    .blog-item {
      height: $blog-item-h;
      background: #3f4347;
      display: flex;
      box-sizing: border-box;
      overflow-x: hidden;
      &:nth-child(1n) {
        backface-visibility: visible !important;
        animation-duration: 1s;
        animation-name: fadeInLeft;
      }
      &:nth-child(2n) {
        background: #393d41;
        backface-visibility: visible !important;
        animation-duration: 1s;
        animation-name: fadeInRight;
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
