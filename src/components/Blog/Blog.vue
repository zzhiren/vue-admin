<template lang="pug">
  div.blog
    div.header.fadeInLeft
      div.earth(v-if="state === 0")
        Icon.earth-icon(type="earth")
      div.back(v-if="state === 1" @click="changeState(0)")
        Icon.back-icon(type="ios-arrow-back")
      div.other
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
  .header {
    height: 35px;
    display: flex;
    // background: $main-bg;
    width: 100%;
    .earth {
      width: 35px;
      background: $main-bg;
      font-size: 24px;
      line-height: 35px;
      text-align: center;
      color: white;
      &:hover {
        cursor: pointer;
      }
      .earth-icon {
        transition: transform 1s linear;
      }
      &:hover .earth-icon {
        cursor: pointer;
        transform: rotateY(360deg);
      }
    }
    .back {
      width: 40px;
      border-right: 1px solid black;
      width: 40px;
      // background: black;
      font-size: 24px;
      line-height: 40px;
      text-align: center;
      color: white;
      &:hover {
        cursor: pointer;
      }
      &:hover .back-icon {
        cursor: pointer;
        transform: rotateX(360deg);
      }
      .back-icon {
        color: white;
        transition: transform 1s linear;
      }
    }
    .other {
      flex: 1;
      background: $main-bg;
    }
    .write-blog {
      width: 35px;
      // background: red;
      text-align: center;
      transition: $transition;
      background-color: rgba(0, 0, 0, 0.9);
      &:hover {
        transform: $transform-360;
        cursor: pointer;
      }
      .icon {
        line-height: 35px;
        font-size: 20px;
        color: white;
      }
    }
  }
  .content {
    flex: 1;
    overflow: hidden;
  }
}
</style>

