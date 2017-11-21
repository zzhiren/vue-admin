<template lang="pug">
  div.blog
    div.header
      div.other
      div.write-blog
        Icon.icon(type="edit")
    div.content
      router-view
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.blog {
  background: rgba(0, 0, 0, 0.3);
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
    background: rgba(0, 0, 0, 0.75);
    border-radius: 2px;
    display: flex;
    .other {
      flex: 1;
    }
    .write-blog {
      width: 40px;
      // background: red;
      text-align: center;
      transition: transform 0.5s linear;
      background-color: rgba(0, 0, 0, 0.5);
      &:hover {
        transform: rotate(360deg);
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
  .content{
    flex: 1;
    // background: rgba(0, 0, 0, 0.75);
    margin-top: 4px;
    border-radius: 2px;
    padding-top: 4px;
  }
}
</style>

