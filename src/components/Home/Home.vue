<template lang="pug">
  div.home
    div.l-slide
    div.content
</template>
<script>

</script>
<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100%;
    display: flex;
    .l-slide{
      width: 200px;
      height: 500px;
      background: red;
    }
    .s-slide{
      width: 70px;
      height: 500px;
      background: red;
    }
    .content {
      flex: 1;
      height: 500px;
      background: blue;
    }
  }
</style>