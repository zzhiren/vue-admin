<template lang="pug">
  div.write-blog
    div.title
      Input(v-model="title" placeholder="Enter title...")
      Upload.upload(
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/")
            div(style="padding: 20px 0")
                Icon(type="ios-cloud-upload" size="52" style="color: #3399ff")
</template>
<script>
export default {
  data() {
    return {
      title: ""
    };
  }
};
</script>
<style lang="scss">
.write-blog {
  color: white;
  .title {
    width: 100%;
    // height: 22px;
    display: flex;
    .upload{
      flex: 70px;
      height: 40px;
    }
    // background: black;
    // input.ivu-input{
    //   height: 22px!important;
    //   padding-left: 0!important;
    //   padding-top: 0!important;
    //   padding-bottom: 0 !important;
    //   padding-right: 0 !important;
    //   border: 0 !important;
    //   background: black!important;
    // }
  }
}
</style>
