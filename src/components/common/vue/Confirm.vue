<template lang="pug">
div
  div.mask(v-if="show === 'alert-show'" @click="_closeDialog('alert-close')")
  div.confirm(v-bind:class="[show]")
    div.data
      //- Icon.icon(type="alert")
      span 确认删除
      span {{title}}
      span 吗？
    div.button(@click="_confirmDel()") 确认
      //- Icon.icon(type="checkmark")
</template>
<script>
export default {
  props: {
    show: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    _closeDialog(value) {
      this.$emit("_confirmDialog", value);
    },
    _confirmDel(){
      this.$emit("_confirmDel")
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";

.confirm {
  min-width: 280px;
  max-width: 400px;
  height: 80px;
  background: rgba(35, 40, 46, 0.95);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: -158px auto;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  z-index: 99;
    user-select: none;
  
  .icon {
    // color: red;
    margin-right: 20px;
    font-size: 20px;
  }
  .data {
    flex: 1;
    // padding-left: 20px;
    // padding-right: 20px;
    text-align: center;
    line-height: 100%;
    font-size: 17px;
    letter-spacing: 2px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button {
    // width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: $vice-bg;
    font-size: 18px;
    color: red;
    font-weight: bold;
    letter-spacing: 4px;
    opacity: .6;
    transition: opacity .5s linear;
    &:hover{
      cursor: pointer;
      opacity: 1;
    }
    &:active{
      opacity: .5;
    }
  }
}
.alert-show {
  animation: show 0.5s;
  animation-fill-mode: forwards;
}
.alert-close {
  animation: close 0.5s;
  animation-fill-mode: forwards;
}
@keyframes show {
  from {
    margin: -158px auto;
    // opacity: 0;
  }
  to {
    margin: 0 auto;
    // opacity: 1;
  }
}
@keyframes close {
  from {
    margin: 0 auto;
    // opacity: 1;
  }
  to {
    margin: -158px auto;
    // opacity: 0;
  }
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}
</style>
