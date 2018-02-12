<template lang="pug">
  div.blog
    div.header.fadeInLeft 
      //- div.earth(v-if="state === 0")
      //-   Icon.earth-icon(type="android-home")
      //- div.back(v-if="state === 1" @click="changeState(0)")
      //-   Icon.back-icon(type="ios-arrow-back")
      //- div.other
      span 博客列表
      router-link.write-blog(tag="div"  to="/home/writeblog/create" @click.native="changeState(1)")
        Icon.icon(type="edit")
    div.content
      router-view
</template>
<script>
export default {
  data() {
    return {
      state: 0
    };
  },
  methods: {
    changeState(state) {
      if (state === 1) {
        this.state = state;
      } else {
        this.$router.go(-1);
        this.state = state;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";
.blog {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  .header {
    height: 30px;
    // display: flex;
    width: 100%;
    background: $main-bg;
    font-size: 14px;
    color: $font-color;
    line-height: 30px;
    padding-left: 10px;
    .write-blog {
      width: 30px;
      float: right;
      text-align: center;
      transition: $transition;
      background-color: rgba(0, 0, 0, 0.9);
      z-index: 999;
      &:hover {
        cursor: pointer;
      }
      .icon {
        line-height: 30px;
        font-size: 18px;
        color: white;
        transition: $transition;
        &:hover {
          transform: $transform-360;
          cursor: pointer;
        }
      }
    }
  }
  .content {
    flex: 1;
    overflow: hidden;
  }
}
</style>

