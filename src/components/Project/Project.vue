<template lang="pug">
  div.project
    //- div.header
    div.content
      div.create-project.zoomIn
        div.title 添加项目
        div.main
          p.project-name 项目名称
          input.input(v-model="projectName")
          p.project-name Icon图标
          input.input(v-model="projectIcon")
          //- p.project-name Svg图标
          //- input.input(v-model="projectIcon")
          //- p.project-name 地址
          //- input.input(v-model="projectUrl")
          //- p.project-name 描述
          //- textarea.textarea.scroll(v-model="projectDsc")
        div.footer
          button.button 编辑
          button.button(v-on:click="_addGitHubProject()") 保存
      div.project-list.zoomIn
        div.title 项目列表
        div.bar
          div.two.one
            div.common(@click="_refreshList(state)" v-model="state")
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
            div.search-btn 搜索
        div.items
          confirm(:show="show" :title="confirm_title" @_confirmDialog="_confirmDialog" @_deleteTag="_deleteTag")
          div.items-header
            div.id ID
            div.column-name 名称
            div.dsc 描述
            div.count Star
            div.count Fork
            div.count Issue
            div.operation 操作
          div.main.scroll
            div.item(v-for="(item,index) in projects" v-bind:key="index")
              div.id ID
              div.column-name {{item.name}}
              div.dsc {{item.description}}
              div.count {{item.stargazers_count}}
              div.count {{item.forks_count}}
              div.count {{item.open_issues}}
              div.operation
                div.box.bg-green(@click="") 编辑标签
                div.box.bg-red(@click="_confirmDialog('alert-show', item._id)") 删除标签
</template>
<script>
import Confirm from "../common/vue/Confirm";

export default {
  data() {
    return {
      projectName: "",
      projectUrl: "",
      projectDsc: "",
      projectIcon: "",
      projects: [],
      show: "",
      confirm_title:""
    };
  },
  components: {
    Confirm
  },
  mounted() {
    this._getGitHubProject();
  },
  methods: {
    // 获取GitHub项目数据
    _getGitHubProject() {
      this.$axios({
        method: "get",
        url: "/getgithubproject"
      }).then(res => {
        this.projects = res.data.data;
      });
    },
    // 添加GitHub项目
    _addGitHubProject() {
      if (this.projectName == "") {
        let nodesc = "项目名称 !== ''🙂";
        this.$Notice._info(nodesc, this);
      } else {
        this.$axios({
          method: "post",
          url: "/addgithubproject",
          data: {
            projectName: this.projectName,
            projectUrl: this.projectUrl,
            projectDsc: this.projectDsc,
            projectIcon: this.projectIcon
          }
        }).then(res => {
          if (res.data.status == "0") {
            this.$Notice._success("保存成功🙂!", this);
            this.projectName = "";
            this.projectUrl = "";
            this.projectDsc = "";
            this.projectIcon = "";
          }
        });
      }
    },
    // 显示确认窗口
    _confirmDialog(value, id) {
      this.show = value;
      if (value === "alert-close") {
        this.id = "";
      } else if (value === "alert-show") {
        this.id = id;
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";
$font-color: rgba(255, 255, 255, 0.8);
.project {
  width: 100%;
  // height: 1000px;
  // background: $three-bg;
  .header {
    width: 100%;
    height: 30px;
    background: $main-bg;
  }
  .content {
    display: flex;
    height: calc(100vh - 115px);
    .input {
      border-radius: 2px;
      background-color: hsla(0, 0%, 57%, 0.2);
      outline-color: rgba(255, 255, 255, 0);
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid hsla(0, 0%, 57%, 0.2) !important;
      transition: background-color 0.25s linear;
      caret-color: red;
      color: rgba(255, 255, 255, 0.5);
      font-size: 14px;
      width: 100%;
      height: 30px;
      margin-bottom: 40px;
      &:hover {
        background-color: hsla(0, 0%, 57%, 0.2);
      }
      &:focus {
        background-color: hsla(0, 0%, 57%, 0.1);
      }
    }
    .textarea {
      border: 1px solid hsla(0, 0%, 57%, 0.2) !important;
      flex: 1;
      height: 200px !important;
      border-radius: 2px;
      resize: none;
      background-color: hsla(0, 0%, 57%, 0.2);
      outline-color: rgba(255, 255, 255, 0);
      padding: 10px;
      margin-right: 30px;
      transition: background-color 0.25s linear;
      caret-color: red;
      color: rgba(255, 255, 255, 0.5);
      font-size: 14px;
      width: 100%;
      &:hover {
        background-color: hsla(0, 0%, 57%, 0.2);
      }
      &:focus {
        background-color: hsla(0, 0%, 57%, 0.1);
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
    .create-project {
      width: 350px;
      background: $three-bg;
      height: 309px;
      .main {
        width: 100%;
        padding: 20px;

        .project-name {
          margin-bottom: 7px;
          font-size: 12px;
          color: $font-color;
          margin-left: 4px;
        }
      }
      .footer {
        height: 34px;
        display: flex;
        margin-bottom: 15px;
        padding-left: 30px;
        padding-right: 30px;
        .button {
          flex: 1;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 3px;
          font-size: 16px;
          line-height: 34px;
          text-align: center;
          border: 0;
          color: white;
          outline-color: $main-bg;
          &:hover {
            cursor: pointer;
          }
          &:active {
            background: #0088f5;
          }
          &:nth-child(1) {
            margin-right: 20px;
          }
        }
      }
    }
    .project-list {
      flex: 1;
      margin-left: 20px;
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
        margin-right: 14px;
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
              background: #0088f5;
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
        position: relative;
        .items-header {
          width: 100%;
          height: 30px;
          line-height: 30px;
          background: #393d41;
          display: flex;
          padding-right: 6px;
        }
        .main {
          overflow: hidder !important;
          height: calc(100vh - 235px);
        }
        .item {
          display: flex;
          background: #3f4347;
          height: 60px;
          line-height: 60px;
          &:nth-child(1n) {
            backface-visibility: visible !important;
            animation-duration: 1s;
            animation-name: fadeInLeft;
          }
          &:nth-child(2n) {
            background: #393d41;
            backface-visibility: visible !important;
            animation-duration: 1s;
            animation-name: fadeInRight;
          }
        }
        .column-name {
          // flex: 1;
          width: 200px;
          text-align: left;
          color: $font-color;
        }
        .count {
          // width: 150px;
          flex: 1;
          text-align: center;
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
          width: 350px;
          // flex: 1;
          // margin-right: 15px;
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
            height: 26px;
            line-height: 26px;
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
  }
}
</style>

