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
    div.mark-down
      mavon-edit
</template>
<script>
import MavonEdit from "../../common/vue/MavonEdit";
export default {
  data() {
    return {
      title: ""
    };
  },
  components: {
    MavonEdit
  }
};
</script>
<style lang="scss">
.write-blog {
  display: flex;
  flex-direction: column;
  color: white;
  height: 100%;
  // padding-bottom: 4px;

  .title {
    width: 100%;
    // height: 22px;
    display: flex;
        margin-bottom: 7px;

    .upload {
      flex: 80px;
      height: 40px;
    }
  }
  .mark-down {
    flex: 1;
  }
}
</style>
