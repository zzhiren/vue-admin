<template lang="pug">
  div.page
    Page(:total="1000" size="small")
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.page {
  min-width: 360px;
  position: fixed;
  z-index: 40;
  bottom: 10px;
  right: -330px;
  height: 28px;
  background: rgba(0,0,0,.3);
  margin: auto;
  // opacity: .1;
  text-align: left;
  transition: right 0.5s linear;
  border-radius: 3px;
  &:hover {
    right: 0 !important;
  }
}
</style>
