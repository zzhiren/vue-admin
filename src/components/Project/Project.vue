<template lang="pug">
  div.project
    div.header
    div.content
      div.create-project
        div.title 添加项目
        div.main
          p.project-name 项目名称
          input.input(v-model="projectName")
          //- p.project-name 地址
          //- input.input(v-model="projectUrl")
          p.project-name 描述
          textarea.textarea.scroll(v-model="projectDsc")
        div.footer
          button.button 编辑
          button.button(v-on:click="_addGitHubProject()") 保存
      div.project-list
        div.title 项目列表
</template>
<script>
export default {
  data() {
    return {
      projectName: "",
      projectUrl: "",
      // projectDsc: ""
    };
  },
  methods: {
    _addGitHubProject() {
      if (this.projectName == "" || this.projectUrl == "" || this.projectDsc == "") {
        let nodesc = "项目名称 && 地址 && 描述 !== ''🙂";
        this.$Notice._info(nodesc, this);
      } else {
        this.$axios({
          method: "post",
          url: "/addgithubproject",
          data: {
            projectName: this.projectName,
            projectUrl: this.projectUrl,
            // projectDsc: this.projectDsc
          }
        }).then(res => {
          console.log(res);
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";

.project {
  width: 100%;
  height: 1000px;
  background: $three-bg;
  .header {
    width: 100%;
    height: 30px;
    background: $main-bg;
  }
  .content {
    display: flex;
    padding-top: 14px;
    padding-left: 14px;
    padding-right: 14px;
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
      color: white;
      background: $main-bg;
      line-height: 30px;
      padding-left: 14px;
    }
    .create-project {
      width: 600px;
      background: $vice-bg;

      .main {
        width: 100%;
        padding: 14px;
        .project-name {
          font-size: 16px;
          margin-left: 8px;
          margin-bottom: 4px;
          color: white;
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
      margin-left: 14px;
    }
  }
}
</style>

