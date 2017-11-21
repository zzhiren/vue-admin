<template lang="pug">
  div.blog
    div.header
      div.earth(v-if="state === 0")
        Icon.earth-icon(type="earth")
      div.back(v-if="state === 1" @click="changeState(0)")
        Icon.back-icon(type="ios-arrow-back")
      div.other
      router-link.write-blog(tag="div"  to="/home/blog/writeblog" @click.native="changeState(1)")
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
        console.log(this.state)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";
.blog {
  background: rgba(255, 255, 255, 0.3);
  // background: rgba(255,255,255,.4);
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 4px;
  box-sizing: border-box;
  .header {
    height: 40px;
    // background: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    display: flex;
    .earth {
      width: 40px;
      background: black;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      font-size: 24px;
      line-height: 40px;
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
      background: black;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
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
      background: rgba(0, 0, 0, 0.75);
    }
    .write-blog {
      width: 40px;
      // background: red;
      text-align: center;
      transition: $transition;
      background-color: rgba(0, 0, 0, 0.5);
      &:hover {
        transform: $transform-360;
        cursor: pointer;
      }
      .icon {
        line-height: 40px;
        font-size: 24px;
        color: white;
        // transition: transform 0.5s linear;
        // &:hover {
        //   transform: rotate(360deg);
        //   cursor: pointer;
        // }
      }
    }
  }
  .content {
    flex: 1;
    // background: rgba(0, 0, 0, 0.75);
    margin-top: 4px;
    border-radius: 2px;
    padding-top: 4px;
  }
}
</style>

