<template lang="pug">
  div.tags
    //- div.header 标签管理
    div.content
      div.create-tag
        div.title 添加标签
        div.main
          p.name 标签名称
          input.input(v-model="name" placeholder="标签的名称，英文，用来在url中显示使用")
          p.name 别名
          input.input(v-model="aliasName" placeholder="标签的别名，中文、英文都可，用来展示")
          p.name Icon图标
          input.input(v-model="icon" placeholder="标签的图标，icon为iview中的图标")
          p.name Svg图标
          input.input(v-model="svg" placeholder="标签的图标，svg为上传的svg图标")
          p.name 描述
          textarea.textarea.scroll(v-model="dsc" placeholder="描述标签")
        div.footer
          button.button(@click="_resetData()") 重置
          button.button(v-on:click="_saveTag()") 保存
      div.tags-list
        div.title
        div.bar
          div.two.one
            div.common.click(@click="_refreshList(state)" v-model="state")
              Icon.icon(type="android-refresh")
              span 刷新
            div.common.click 
              Icon.icon(type="trash-b")
              span 清空搜索条件
            div.common.click 
              Icon.icon(type="ios-list")
              span 批量操作
          div.other
          div.three.one
            input.search-input(v-model="condition" placeholder="文章标题、描述...")
            button.search-btn 搜索
        div.items
          div.items-header
            div.id ID
            div.column-name 名称
            div.column-name 别名
            div.dsc 描述
            div.item-icon ICON
            div.item-icon SVG
            div.operation 操作
          div.main.scroll
            div.item(v-for="(item,index) in tags" v-bind:key="index")
              div.id ID
              div.column-name {{item.name}}
              div.column-name {{item.aliasName}}
              div.dsc {{item.dsc}}
              div.item-icon 
                span(v-if="item.icon !== ''") {{item.icon}}
                span(v-if="item.icon === ''") --
              div.item-icon 
                span(v-if="item.svg !== ''") {{item.svg}}
                span(v-if="item.svg === ''") --
              div.operation
                div.box.bg-green(@click="_editTag(item)") 编辑标签
                div.box.bg-red(@click="_deleteTag()") 删除标签
</template>
<script>
export default {
  data() {
    return {
      id: "",
      name: "",
      aliasName: "",
      icon: "",
      dsc: "",
      svg: "",
      tags: []
    };
  },
  mounted() {
    this._getTagsData();
  },
  methods: {
    // 获取标签数据
    _getTagsData() {
      let date = new Date();
      let timer = date.getTime().toString();
      this.$axios({
        method: "get",
        url: "/gettag",
        params: {
          name: "all",
          t: timer
        }
      }).then(res => {
        this.tags = res.data.data;
      });
    },
    // 清空编辑区域内容
    _resetData() {
      this.id = "";
      this.name = "";
      this.aliasName = "";
      this.icon = "";
      this.svg = "";
      this.dsc = "";
    },
    // 保存标签
    _saveTag() {
      if (this.name === " " || this.aliasName === " " || this.dsc === " ") {
        let nodesc = "标签名称 && 别名 && 描述 !== ' '";
        this.$Notice._warning(nodesc, this);
      } else {
        if (this.icon === "" && this.svg === "") {
          let nodesc = "Icon图标 || Svg图标 !== ' '";
          this.$Notice._warning(nodesc, this);
        } else {
          this.$axios({
            method: "post",
            url: "/savetag",
            data: {
              id: this.id,
              name: this.name,
              aliasName: this.aliasName,
              icon: this.icon,
              svg: this.svg,
              dsc: this.dsc
            }
          }).then(res => {
            if (res.data.status === "1") {
              let nodesc = "保存失败😭！";
              this.$Notice._warning(nodesc, this);
            }else if(res.data.status === '0'){
              let nodesc = "保存成功😁！";
              this.$Notice._success(nodesc, this);
              this._resetData()
            }
          });
        }
      }
    },
    // 编辑标签
    _editTag(value) {
      this.id = value._id;
      this.name = value.name;
      this.aliasName = value.aliasName;
      this.icon = value.icon;
      this.svg = value.svg;
      this.dsc = value.dsc;
    },
    // 删除标签
    _deleteTag() {}
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";

.tags {
  $height: 30px;
  $font-color: rgba(255, 255, 255, 0.8);
  $input-bg: hsla(0, 0%, 57%, 0.2);
  .input {
    width: 100%;
    border-radius: 2px;
    margin-top: 8px;
    margin-bottom: 40px;
    height: 30px;
    background-color: $input-bg;
    outline-color: rgba(255, 255, 255, 0);
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid hsla(0, 0%, 57%, 0.2) !important;
    transition: background-color 0.25s linear;
    caret-color: red;
    color: $font-color;
    font-size: 14px;
    &:hover {
      background-color: hsla(0, 0%, 57%, 0.2);
    }
    &:focus {
      background-color: hsla(0, 0%, 57%, 0.1);
    }
    &::placeholder {
      font-size: 10px;
    }
  }
  .textarea {
    margin-top: 8px;
    border: 1px solid hsla(0, 0%, 57%, 0.2) !important;
    height: 100px !important;
    width: 100% !important;
    border-radius: 2px;
    resize: none;
    background-color: $input-bg;
    outline-color: rgba(255, 255, 255, 0);
    padding: 10px;
    // margin-right: 30px;
    transition: background-color 0.25s linear;
    caret-color: red;
    color: $font-color;
    font-size: 14px;
    &:hover {
      background-color: hsla(0, 0%, 57%, 0.2);
    }
    &:focus {
      background-color: hsla(0, 0%, 57%, 0.1);
    }
    &::placeholder {
      font-size: 10px;
    }
  }
  .content {
    height: calc(100vh - 115px);
    min-height: 634px;
    display: flex;
    .create-tag {
      width: 350px;
      height: 634px;
      background: $three-bg;
      margin-right: 20px;
      .main {
        padding: 20px;
      }
      .name {
        font-size: 12px;
        color: $font-color;
        margin-left: 4px;
      }
      .footer {
        height: 34px;
        display: flex;
        margin-bottom: 15px;
        padding-left: 30px;
        padding-right: 30px;
        .button {
          flex: 1;
          background: black;
          // background: rgba(0, 0, 0, 0.4);
          border-radius: 3px;
          font-size: 16px;
          line-height: 34px;
          text-align: center;
          border: 0;
          color: white;
          outline-color: $main-bg;
          opacity: 0.7;
          transition: all 0.1s linear;
          &:hover {
            cursor: pointer;
            // opacity: 1;
          }
          &:active {
            // background: black;
            opacity: 1;
          }
          &:nth-child(1) {
            margin-right: 20px;
          }
        }
      }
    }
    .tags-list {
      flex: 1;
      background: $three-bg;
      .bar {
        color: $font-color;
        $height: 30px;
        $padding-l: 3px 0 0 3px;
        $padding-r: 0 3px 3px 0;
        $border: 1px solid rgba(0, 0, 0, 0.65);
        $padding: 2px 14px;
        margin-top: 14px;
        height: $height;
        margin-bottom: 14px;
        padding-right: 20px;
        display: flex;

        .icon {
          font-size: 13px;
          margin-right: 10px;
        }
        .one {
          user-select: none;
          border: $border;
          border-radius: 3px;
          display: flex;
          line-height: 24px;
          font-size: 10px;
          opacity: 0.9;
          .one_active {
            background: #393d41 !important;
          }
          .click {
            &:active {
              background: black;
            }
          }
          div {
            &:hover {
              cursor: pointer;
            }
          }
          .common {
            padding: $padding;
            box-sizing: border-box;
            background: $main-bg;
            height: 28px;
            float: left;
            vertical-align: middle;
            &:nth-child(1) {
              z-index: 9;
            }
            &:nth-child(2) {
              border-left: $border !important;
              border-right: $border;
            }
          }
        }
        .two {
          margin-left: 20px;
        }
        .other {
          flex: 1;
          height: 10px;
        }

        .three {
          float: right;
          border: 0 !important;
          z-index: 2;

          .search-input {
            width: 300px;
            height: 100%;
            background-color: hsla(0, 0%, 57%, 0.1);
            outline-color: rgba(255, 255, 255, 0);
            padding-left: 10px;
            border: $border;
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
            border-right: 0 !important;
            transition: background-color 0.25s linear;
            caret-color: red;
            color: rgba(255, 255, 255, 0.5);
            font-size: 10px;
            &:hover {
              background-color: hsla(0, 0%, 57%, 0.2);
            }
            &:focus {
              background-color: hsla(0, 0%, 57%, 0.1);
            }
          }
          .search-btn {
            width: 80px;
            border: $border;
            border-left: 0 !important;
            padding-left: 10px;
            padding-right: 10px;
            font-size: 12px;
            background: $main-bg;
            color: white;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
            outline-color: $main-bg;
            &:hover {
              cursor: pointer;
            }
            &:active {
              background: black;
            }
          }

          .all-types {
            height: 30px !important;
            padding-left: 13px;
            padding-right: 6px;
            margin-right: 10px;
            border: $border;
            border-radius: 3px;
            &:hover .item {
              height: 100px;
            }
            .span {
              &:after {
                content: url(../../assets/down_up.svg);
                vertical-align: middle;
                display: inline-block;
                margin-top: -1px;
                line-height: 12px;
                color: white;
              }
            }
            .item {
              width: 88px;
              margin-left: -14px;
              border-radius: 0 0 4px 4px;
              position: fixed;
              background: $main-bg;
              transition: height 0.25s linear;
            }
          }
        }
      }
      .items {
        width: 100%;
        padding-right: 20px;
        padding-left: 20px;
        overflow: hidden;
        .items-header {
          width: 100%;
          height: 30px;
          line-height: 30px;
          background: #393d41;
          display: flex;
          padding-right: 6px;
        }
        .main {
          overflow: auto;
          height: calc(100vh - 235px);
        }
        .item {
          display: flex;
          background: #3f4347;
          height: 60px;
          line-height: 60px;
          &:nth-child(2n) {
            background: #393d41;
          }
        }
        .column-name {
          flex: 1;
          text-align: left;
          color: $font-color;
        }
        .id {
          text-align: left;
          color: $font-color;
          width: 100px;
          padding-left: 20px;
        }
        .item-icon {
          text-align: left;
          color: $font-color;
          width: 200px;
        }
        .dsc {
          text-align: left;
          color: $font-color;
          width: 300px;
          margin-right: 15px;
        }
        .operation {
          text-align: center;
          color: $font-color;
          width: 180px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .box {
            height: 30px;
            line-height: 30px;
            width: 70px;
            opacity: 0.8;
            transition: opacity 0.5s linear;
            user-select: none;
            &:nth-child(1) {
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
            }
            &:nth-child(2) {
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
            &:hover {
              cursor: pointer;
              opacity: 1;
            }
            &:active {
              opacity: 0.7 !important;
            }
          }
        }
      }
    }
    .title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: $main-bg;
      padding-left: 10px;
      color: $font-color;
      font-size: 14px;
    }
  }
}
</style>
