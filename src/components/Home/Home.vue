<template lang="pug">
  div.home
    div.top-header
    div.container
      div.slide(ref="slide")
        div.logo
          img(src="")
          span 121
        div.nav-list
          router-link.nav-item(to="/home/blog" tag="div" @click.native="checked('blog')" v-bind:class="{active: active === 'blog'}")
            div.icon
              Icon.icon(type="ios-compose")        
            div.icon-name
              span 博客
      div.content
        div.main
          router-view
</template>
<script>
export default {
  data() {
    return {
      active:'blog'
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // this.$refs.slide.style.height = window.innerHeight + "px";
      console.log(this.$refs.slide.style.height);
    },
    checked(state){
      if(state === 'blog') {
        this.active = state
        console.log(this.active)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/components/common/scss/base.scss';
$item-height: 34px;
.home{
  width:100%;
  display: flex;
  flex-direction: column;
  background: $vice-bg;
  height: 100%;;
  .top-header{
    width: 100%;
    height: $item-height;
    background: $main-bg;
    box-shadow: $box-shadow;
    z-index: 9999;
    position: fixed;
  }
  .container {
    width: 100%;
    height: 100%;
    flex: 1;
    .slide {
      width: 140px;
      // background: rgba(255,255,255, .9);
      background: $main-bg;
      text-align: center;
      display: flex;
      flex-direction: column;
      left: 0px;
      top: $item-height;
      position: fixed;
      height: 100%;
      .logo {
        width: 100%;
        height: 35px;
        background: $main-bg;
      }
      .nav-list {
        flex: 1;
        z-index: 99;
        width: 100%;
        background: $main-bg;
        // box-shadow:$box-shadow;       
        .nav-item {
          display: flex;

          width: 100%;
          height: $item-height;
          padding-left: 25px;
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          // border-right: 3px solid #b82525;
          // background: gray;
          &:hover {
            cursor: pointer;
            background: $nav-item-checked;
          }
          .icon{
            font-size: 22px;
            color: #cccdd3;
            line-height: $item-height;
            margin-right: 5px;
          }
          .icon-name{
            line-height: $item-height;
            color: #cccdd3;
            font-size: 14px;
            // margin-top: 1px;
            letter-spacing: 5px;
          }
        }
        .active{
          background:$nav-item-checked;
        }
      }
    }
    .s-slide {
      width: 70px;
      height: 500px;
      // background-color: red;
      // background: red;
    }
    .content {
      margin-left: 140px;
      // flex: 1;
      margin-top: $item-height;
      display: flex;
      flex-direction: column;
      background: $vice-bg;
      padding: 14px;
      padding-bottom: 0!important;
      .main{
        flex:1;
        width: 100%;
        // padding: 7px;
        box-sizing: border-box;
      }
    }
  }
}

</style>