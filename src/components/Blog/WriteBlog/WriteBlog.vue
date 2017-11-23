<template lang="pug">
  div.write-blog
    div.title
      Input.title-input(v-model="title" placeholder="Enter title...")
      div.options
        div.upload
          Upload(
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/")
                div(style="padding: 20px 0")
                    Icon(type="ios-cloud-upload" size="52" style="color: #3399ff")
        div.save.transition-Y
          Icon.icon(type="android-globe")
          p.p 发布
        div.release.transition-Y
          Icon.icon(type="android-radio-button-on")
          p.p 保存
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
$button-width: 50px;
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
    .options {
      display: flex;
      text-align: center;
      .title-input {
        flex: 1;
      }
      .upload {
        width: 100px;
        height: 33px;
        margin-left: 1px;
        margin-right: 1px;
        &:hover{
          background: rgba(0,0,0,0.5);
        }
        
      }
      .save {
        width: $button-width;
        background: black;
        margin-right: 1px;
        font-size: 18px;
        line-height: 33px;
        height: 33px;
        &:hover{
          background: rgba(0,0,0,0.5);
        }
      }
      .release {
        height: 33px;
        width: $button-width;
        background: black;
        line-height: 34px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        &:hover{
          background: rgba(0,0,0,0.5);
        }
      }
      .transition-Y {
        overflow: hidden;
        .icon {
          transition: transform 0.5s linear;
          font-size: 19px;
        }
        .p {
          transition: transform 0.5s linear;
          font-size: 14px;
        }
        &:hover .icon {
          transform: translateY(-33px);
        }
        &:hover .p {
          transform: translateY(-33px);
        }
      }
    }
  }
  .mark-down {
    flex: 1;
  }
}
</style>
