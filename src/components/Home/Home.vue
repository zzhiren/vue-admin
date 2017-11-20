<template lang="pug">
  div.home
    div.slide(ref="slide")
      div.logo
        img(src="")
        span 121
    div.content
</template>
<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$refs.slide.style.height=window.innerHeight+'px';
      console.log(this.$refs.slide.style.height)
    }
  }
}
</script>
<style lang="scss" scoped>
  .home{
    width: 100%;
    // height: 100%;
    display: flex;
    .slide{
      width: 200px;
      background: rgba(0, 0, 0, .8);
      .logo{
        width: 100%;
        height: 60px;
        background: rgba(255,255,255,.8);
      }
    }
    .s-slide{
      width: 70px;
      height: 500px;
      background-color: #2c3942;
      // background: red;
    }
    .content {
      flex: 1;
      // height: 500px;
      // background: blue;
    }
  }
</style>