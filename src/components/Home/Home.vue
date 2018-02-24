<template lang="pug">
  div.home
    div.top-header
      div.website Zzhiren.xyz
      div.search
      div.notice
        Badge.badge(dot count="1")
          Icon.chat(type="chatbox")
        Badge.badge(dot count="1")
          Icon.heart(type="android-favorite")
        div.user
          img(src="../../assets/me960x960.jpg")
    div.container
      div.slide(ref="slide")
        router-link.user(tag="div" to="/home/user" @click.native="_checked('user')" v-bind:class="{active: active === 'user'}")
          div.me-pic
            img(src="../../assets/me960x960.jpg")
          p.name Zzhiren
          p.motto
            marquee(scrollamount="4") To improve is to change; to be perfect is to change often！
        div.nav-list
          router-link.nav-item(to="/home/blog" tag="div" @click.native="_checked('blog')" v-bind:class="{active: active === 'blog'}")
            div.icon
              Icon.icon(type="ios-compose")        
            div.icon-name
              span 博客管理
          router-link.nav-item(to="/home/tags" tag="div" @click.native="_checked('tags')" v-bind:class="{active: active === 'tags'}")
            div.icon
              Icon.icon(type="ios-pricetags")        
            div.icon-name
              span 标签管理
          router-link.nav-item(to="/home/project" tag="div" @click.native="_checked('project')" v-bind:class="{active: active === 'project'}")
            div.icon
              Icon.icon(type="folder")         
            div.icon-name
              span 项目管理
      div.content
        div.bar
          span {{title}}
          span
            router-link.nav(:to="item.route_link" tag="span" @click.native="_checked('blog')" v-for="(item,index) in routeList" v-bind:key="index") {{item.name}} 
            router-link.nav(to="/home" tag="span" @click.native="_checked('blog')" ) / 首页
        div.main.scroll
          router-view
</template>
<script>
export default {
  data() {
    return {
      active: "blog",
      routeList: [],
      title: ""
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.routeList = to.meta.routeList;
    next();
    this.title = this.$route.meta.name;
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.routeList = to.meta.routeList;
    });
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.title = this.$route.meta.name;
    },
    _checked(state) {
      this.active = state;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";
$item-height: 34px;
.home {
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: $vice-bg;
  height: 100%;
  .top-header {
    width: 100%;
    height: $item-height;
    line-height: $item-height;
    background: $main-bg;
    box-shadow: $box-bottom-shadow;
    z-index: 9999;
    position: fixed;
    display: flex;
    .website {
      width: 140px;
      text-align: center;
      font-size: 16px;
      color: white;
      font-family: 'Aldrich', sans-serif;
    }
    .search {
      flex: 1;
    }
    .notice {
      // width: 150px;
      .badge {
        margin-right: 25px;
        font-size: 15px;
        color: $font-color;
        cursor: pointer;
        .heart {
          color: $color-green;
        }
        .chat {
          color: $blue;
        }
      }
      .user {
        float: right;
        cursor: pointer;
        margin-right: 25px;
        width: 34px;
        height: 34px;
        padding: 3px;
        img {
          width: 28px;
          height: 28px;
          border-radius: 14px;
        }
      }
    }
  }
  .container {
    width: 100%;
    height: 100%;
    flex: 1;
    .active {
      background: $nav-item-checked !important;
    }
    .slide {
      width: 140px;
      background: $main-bg;
      text-align: center;
      display: flex;
      flex-direction: column;
      left: 0px;
      top: $item-height;
      position: fixed;
      height: 100%;
      .user {
        width: 100%;
        background: $main-bg;
        padding-top: 14px;
        user-select: none;
        font-family: "Kite One";
        border-bottom: 1px solid #e64c3c;
        transition: background 0.25s linear;
        &:active {
          background: $vice-bg;
        }
        &:hover {
          cursor: pointer;
          background: $nav-item-checked;
          cursor: pointer;
        }
        .me-pic {
          width: 78px;
          height: 78px;
          border-radius: 42px;
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.2);
          margin: 0 auto;
          &:hover img {
            opacity: 0.8;
          }
          img {
            width: 74px;
            width: 74px;
            transition: opacity 0.5s linear;
          }
        }
        .name {
          margin-top: 12px;
          font-size: 16px;
          font-weight: bold;
          color: white;
          font-family: 'Aldrich', sans-serif;
        }
        .motto {
          color: white;
          opacity: 0.4;
          margin-top: 8px;
          padding-left: 5px;
          padding-right: 5px;
          font-family: 'Aldrich', sans-serif;
        }
      }
      .nav-list {
        flex: 1;
        z-index: 99;
        width: 100%;
        background: $main-bg;
        .nav-item {
          display: flex;
          width: 100%;
          height: $item-height;
          padding-left: 16px;
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          transition: background 0.25s linear;
          &:hover {
            cursor: pointer;
            background: rgba(100, 100, 100, 0.2);
          }
          .icon {
            font-size: 14px !important;
            color: #cccdd3;
            line-height: $item-height;
            margin-right: 8px;
          }
          .icon-name {
            line-height: $item-height;
            color: #cccdd3;
            font-size: 12px;
            letter-spacing: 5px;
          }
        }
      }
    }
    .s-slide {
      width: 70px;
      height: 500px;
    }
    .content {
      margin-left: 140px;
      margin-top: $item-height;
      display: flex;
      flex-direction: column;
      background: $vice-bg;
      padding-top: 14px;
      padding-left: 25px;
      padding-right: 25px;
      padding-bottom: 0 !important;
      .bar {
        line-height: 40px;
        width: 1005;
        height: 40px;
        margin-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        font-size: 20px;
        color: $font-color;
        text-align: right;
        display: flex;
        span {
          flex: 1;
          letter-spacing: 2px;
          cursor: pointer;
          &:nth-child(1) {
            text-align: left;
          }
        }
        .nav {
          height: 40px;
          text-align: left;
          &:nth-child(1) {
            color: $blue;
          }
        }
      }
      .main {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        overflow-x: auto;
        overflow-y: hidden;
      }
    }
  }
}
</style>