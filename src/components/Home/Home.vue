<template lang="pug">
  div.home
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
      div.top-header
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
      this.$refs.slide.style.height = window.innerHeight + "px";
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
.home {
  width: 100%;
  // height: 100%;
  display: flex;
  .slide {
    width: 150px;
    // background: rgba(255,255,255, .9);
    background: #191b1f;
    display: flex;
    flex-direction: column;
    .logo {
      width: 100%;
      height: 60px;
      background: $bg-white;
    }
    .nav-list {
      flex: 1;
      width: 100%;
      .nav-item {
        display: flex;

        width: 100%;
        height: 38px;
        padding-left: 25px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border-right: 3px solid #b82525;
        // background: gray;
        &:hover {
          cursor: pointer;
          background: #26282c;
        }
        .icon{
          font-size: 22px;
          color: #cccdd3;
          line-height: 38px;
          margin-right: 10px;
        }
        .icon-name{
          line-height: 40px;
          color: #cccdd3;
          font-size: 14px;
          // margin-top: 1px;
          letter-spacing: 5px;
        }
      }
      .active{
        background:#26282c;
      }
    }
  }
  .s-slide {
    width: 70px;
    height: 500px;
    background-color: #2c3942;
    // background: red;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .top-header{
      height: 60px;
      background: $bg-white;
    }
    .main{
      flex:1;
      width: 100%;
      padding: 7px;
      box-sizing: border-box;
    }
  }
}
</style>