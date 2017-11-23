<template lang="pug">
  div.app(ref="app")
    vue-particles(
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="6"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="false"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push")
    router-view

</template>

<script >
export default {
  name: "app",
  mounted(){
    this.init()
  },
  methods:{
    init() {
      document.getElementById('particles-js').style.height = innerHeight-0.2+'px';
      console.log(innerHeight-0.2)
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
#particles-js {
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #555555;
}
.v-note-op {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.v-note-panel {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.v-note-wrapper {
  height: 100% !important;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
html {
  height: 100%;
  z-index: -1;
  background: rgba(255, 255, 255, 1);
  font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
  // background: rgba(0,0,0,.5);
}
body {
  // background: white;

  opacity: 1;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  // filter: blur(0.8px);
  // margin: -30px;
  background-size: cover;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
  overflow-x: hidden;
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
}
.ivu-input {
  height: 33px !important;
  padding-left: 7px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-right: 0 !important;
  border: 0 !important;
  background: black !important;
  border-top-left-radius: 4px !important;
  border-bottom-left-radius: 4px !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.ivu-upload {
  height: 33px !important;
  padding-left: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-right: 0 !important;
  border-left: 0 solid gray !important;
  border-right: 0 solid gray !important;
  border-top: 0 !important;
  border-bottom: 0 !important;
  background: black !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  div {
    padding: 0 0 0 0 !important;
  }
  .ivu-icon-ios-cloud-upload {
    font-size: 20px !important;
    line-height: 33px !important;
  }
}
body,
h1,
h2,
h3,
h4,
p {
  padding: 0;
  margin: 0;
}
h4 {
  font-size: 14px;
}
</style>
