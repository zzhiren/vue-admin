<template lang="pug">
  div.blog-list(ref="bloglistH")
    div.blog-item
      div.blog-pic
        img.pic
      div.blog-preface
        h4.title 欢喜勇猛，向死而生
        p.preface 天空在心，路在脚底，你，梦想去向哪里？去那座写了你名字的山，去那片等了你很久的海，还是去你向往的无边无际，海阔天空？天空在心，路在脚底，你，梦想去向哪里？去那座写了你名字的山，去那片等了你很久的海，还是去你向往的无边无际，海阔天空？天空在心，路在脚底，你，梦想去向哪里？去那座写了你名字的山，去那片等了你很久的海，还是去你向往的无边无际，海阔天空？
        div.meta 
          Icon.icon-font(type="ios-clock")
          span.meta-span 2017/11/11
          Icon.icon-font(type="eye")
          span.meta-span 256
          Icon.icon-font(type="chatbox")
          span.meta-span 10
          Icon.icon-font(type="heart")
          span.meta-span 121
          Icon.icon-font(type="ios-pricetags")
          span.meta-span code
        
      div.release-state

      div.edit-blog
      div.delete-blog
</template>
<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$refs.bloglistH.style.height =
        innerHeight - 60 - 7 - 4 - 40 - 8 - 4 - 7 + "px";
      console.log(this.$refs.bloglistH.styles.height);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";
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
    height: 133px;
    margin-bottom: 4px;
    // background: rgba(255,255,255,.9);
    background: rgba(0, 0, 0, 0.8);
    border-radius: 2px;
    display: flex;
    padding: 7px;
    box-sizing: border-box;
    .blog-pic {
      width: 168px;
      height: 119px;
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
      height: 119px;
      // background: black;
      margin-left: 7px;
      padding-left: 4px;
      box-sizing: border-box;
      -webkit-transition: $hover-bg;
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
      .title {
        letter-spacing: 1px;
        margin-top: 2.8px;
        margin-bottom: 7px;
        color: white;
        opacity: 0.9;
        -webkit-transition: $hover-bg;
        -webkit-transition: $hover-bg;
        transition: $hover-bg;
        &:hover {
          cursor: pointer;
        }
      }
      .preface {
        color: gray;
        font-size: 13px;
        height: 63px;
        line-height: 22px;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        display: -webkit-box;
      }
      .meta {
        height: 25px;
        font-size: $iconfont-size;
        line-height: 30px;
        color: $blog-list-meta-font-color;
        opacity: $blog-list-meta-font-opacity;
        &:hover {
          cursor: pointer;
        }
        .icon-font {
          font-size: $iconfont-size;
          margin-right: 4px;
        }
        .meta-span {
          color: white;
          letter-spacing: 1px;
          margin-right: 25px;
          font-family: DINRegular, -apple-system, BlinkMacSystemFont,
            "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI",
            "Microsoft YaHei", "\\5FAE软雅黑", sans-serif;
          font-weight: 100;
          font-size: $blog-list-meta-font-size;
        }
      }
    }
    .release-state {
      width: 119px;
      height: 119px;
      background: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>
