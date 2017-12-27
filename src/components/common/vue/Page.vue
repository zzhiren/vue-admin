<template lang="pug">
  div.page
    Page(ref="page" :current="page" :total="total" :page-size="10" size="small" @on-change="_pageOnChange")
</template>
<script>
export default {
  props:{
    total:{
      type: Number,
      default: 0
    },
    page:{
      type: Number,
      default: 1
    }
  },
  data(){
    return {

    }
  },
  methods:{
    _pageOnChange(current){
      this.$emit('_pageOnChange',current)
      console.log(current)
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  min-width: 360px;
  position: fixed;
  z-index: 40;
  bottom: 10px;
  right: -332px;
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
