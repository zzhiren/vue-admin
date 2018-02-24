<template lang="pug">
  div.write-blog
    //- div.header.new
    //-     span 撰写新文章
    div.content
      div.header.blog-title
        span.fadeInLeft 文章标题
        input.input.title-input(v-model="title" v-bind:disabled="disabled" placeholder="输入标题...")
        div.button.fadeInRight
          div.release.btn-hover.green(@click="_editBlog()") 编辑文章
            //- Icon.iview-icon(type="ios-compose")
          div.release.btn-hover.blue(@click="_saveBlog(0)") 发布文章
            //- Icon.iview-icon(type="ios-paperplane")
          div.save.btn-hover.red(@click="_saveBlog(1)") 移至草稿
            //- Icon.iview-icon(type="ios-box")
      div.header.fadeInLeft
        span 文章前言
        input.input.perface(v-model="preface" v-bind:disabled="disabled" placeholder="输入前言...")
      div.tags
        span.fadeInLeft 文章标签  
        div.tag.fadeInRight(v-bind:class="{tag_active: checkedList.indexOf(item.name) >= 0}" v-for="(item,index) in tags" @click="_checked(item.name)" v-bind:key="index") {{item.name}}
      div.mark-down.fadeInUp
        //- mavon-edit(ref="mavonedit" :editable="editable" :content="details.content" v-if="details.content")
        mavon-editor(ref="mavonEditor" :editable="editable" :ishljs="false" @imgAdd="$imgAdd" @imgDel="$imgDel" @change="$change")
</template>
<script>
import axios from "axios";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  data() {
    return {
      id:'',
      type: '',
      title: "",
      preface: "",
      disabled: false,
      editable: true,
      tags: [],
      checkedList: [],
      details: {},
      img_file: {},
      picDelObj: [],
      picList: [],
      value: "",
      firstPic: ""
    };
  },
  mounted() {
    this.$Message.config({
      top: 50,
      duration: 3
    });
    this._initTagData();
    this._initEditData();
    this._initContent();
  },
  
  methods: {
    // 如果是编辑状态，就初始化文章内容
    _initContent() {
      if (this.$route.params.type === "edit") {
        this.$refs.mavonEditor.d_value = this.details.content;
      }
    },
    $change(value, render) {
      this.value = value;
    },
    // 添加图片
    $imgAdd(pos, $file) {
      this.img_file[pos] = $file;
      this.uploadImg(pos);
    },
    // 删除图片
    $imgDel(pos) {
      console.log("pos", pos);
      delete this.img_file[pos];
      this.$refs.mavonEditor.d_history = [];
      var deletPath = this.picDelObj[pos].deletePath;
      this.deleteImg(pos);
    },
    // 上传图片
    uploadImg(pos) {
      var $vm = this;
      var formdata = new FormData();
      // this.img_file = []
      for (var _img in this.img_file) {
        formdata.append(_img, this.img_file[_img]);
      }
      this.$axios({
        method: "post",
        url: "/uplodimg",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        for (var i in res.data.result.picDelObj) {
          this.picDelObj.push(res.data.result.picDelObj[i]);
        }
        this.picList = res.data.result.picList;
        this.firstPic = res.data.result.picList[0][1];
        console.log(res.data.result.picList[0][1]);

        //批量修改图片名称
        this.$refs.mavonEditor.$imglst2Url(res.data.result.picList);
        this.img_file = [];
        //单个修改图片名称
        // this.$refs.mavonEdit.$img2Url(pos, res.data.result.picList[0][1]);
      });
    },
    // 删除上传的图片
    deleteImg(pos) {
      this.$axios({
        method: "post",
        url: "/deleteimg",
        data: {
          deletePath: this.picDelObj[pos].deletePath
        },
        headers: { "Content-type": "application/json; charset=utf-8" }
      }).then(res => {
        // console.log(res.data)
        // console.log(this.picObj[pos].deletPath)
      });
    },
    // 如果时编辑博客，则根据_id获取博客信息
    _initEditData() {
      this.type = this.$route.params.type;
      this.id = this.$route.params.id;
      if (this.type === "edit") {
        this.$axios({
          method: "post",
          url: "/getblogdetils",
          data: {
            id: this.id
          }
        }).then(res => {
          this.details = res.data.data;
          this.title = this.details.title;
          this.preface = this.details.preface;
          this.checkedList = this.details.tag;
          this.picList = this.details.picList;
          this.firstPic = this.details.firstPic;
          this.$refs.mavonEditor.d_value = this.details.content;
        });
      }
    },
    // 初始化标签信息
    _initTagData() {
      this.$axios({
        method: "get",
        url: "/gettag",
        params: {
          name: "all"
        }
      }).then(res => {
        this.tags = res.data.data;
      });
    },
    _checked(value) {
      var index = this.checkedList.indexOf(value);
      if (index >= 0) {
        this.checkedList.splice(index, 1);
      } else {
        this.checkedList.push(value);
      }
    },
    _destroy(state, value) {
      this.$Message.destroy();
      if (state == 0) {
        this.$Notice._success(value, this);
      } else if (state == 1) {
        this.$Notice._warning(value, this);
      } else if (state == 2) {
        this.$Notice._error(value, this);
      }
    },
    _editBlog() {
      this.disabled = false;
      this.editable = true;
    },
    // 发布博客
    _saveBlog(state) {
      if (
        this.title === "" ||
        this.value === "" ||
        this.preface === "" ||
        this.checkedList.length === 0
      ) {
        let nodesc = "标题 && 前言 && 正文 && 标签 !== ' ' 😆！";
        this.$Notice._info(nodesc, this);
      } else {
        this.disabled = true;
        this.editable = false;
        this.$Notice._loading("保存中...", this);
        this.content = this.value;
        let blog = {};
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let day = myDate.getDate();
        let hours = myDate.getHours();
        let creationTime = "";
        if (hours <= 12) {
          creationTime = year + "/" + month + "/" + day + " " + "上午";
        } else if (hours > 12) {
          creationTime = year + "/" + month + "/" + day + " " + "下午";
        }
        let start = document.cookie.indexOf("userName");
        let end = document.cookie.indexOf(";", start);
        let userName = document.cookie.slice(start + 9);
        blog.id = this.id;
        blog.type = this.type;
        blog.author = userName;
        blog.title = this.title;
        blog.state = state;
        blog.preface = this.preface;
        blog.tag = this.checkedList;
        blog.content = this.value;
        blog.picDelObj = this.picDelObj;
        blog.firstPic = this.firstPic;
        blog.creationTime = creationTime;

        this.$axios({
          method: "post",
          url: "/saveblog",
          timeout: 3500,
          data: blog,
          headers: { "Content-type": "application/json; charset=utf-8" }
        })
          .then(res => {
            if (res.data.status == "0") {
              this._destroy(0, res.data.msg + "😊");
            } else if (res.data.status == "1") {
              this._destroy(1, "保存失败 🙁");
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // 请求超时
              console.log(error.request);
              this.$Notice._destroy(2, "超时...", this);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      }
    }
  },
  components: {
    mavonEditor
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";
$button-width: 50px;

.write-blog {
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.8);
  height: 100%;
  .input {
    border-radius: 2px;
    height: 100%;
    // padding: 0 !important;
    background-color: $main-bg;
    outline-color: rgba(255, 255, 255, 0);
    padding-left: 5px;
    border: 0 !important;
    transition: background-color 0.25s linear;
    caret-color: red;
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    &:hover {
      background-color: hsla(0, 0%, 57%, 0.2);
    }
    &:focus {
      background-color: hsla(0, 0%, 57%, 0.1);
    }
  }
  .blog-title {
    padding-right: 5px;
    margin-bottom: 7px;
  }
  .new {
    height: 40px !important;
    line-height: 40px !important;
    font-size: 17px;
    padding-top: 0 !important;
    padding-left: 15px;
    color: rgba(255, 255, 255, 0.5);
  }
  .header {
    $height: 34px;
    width: 100%;
    height: $height;
    background: $main-bg;
    padding-left: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    display: flex;
    line-height: 30px;
    // margin-bottom: 7px;
    // box-sizing: border-box;
    .back {
      float: left;
      width: 40px;
      margin-left: -10px;
      height: 100%;
      font-size: 24px;
      line-height: 30px;
      text-align: center;
      color: white;
      &:hover {
        cursor: pointer;
      }
      &:hover .back-icon {
        cursor: pointer;
        transform: rotateX(360deg);
      }
      .back-icon {
        color: white;
        transition: transform 1s linear;
      }
    }
    .title-input {
      flex: 1;
      height: 100%;
      margin-left: 10px;
    }
    .button {
      width: 300px;
      height: 100%;
      display: block;
      // background: red;
      float: right;
      padding: 1px;
      text-align: right;
      line-height: 28px;
      .iview-icon {
        font-size: 18px;
        line-height: 28px;
      }
      .btn-hover {
        &:hover {
          cursor: pointer;
          background: rgba(255, 255, 255, 0.4);
        }
      }
      .release {
        border-radius: 2px;
        display: inline-block;
        width: 80px;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        margin-right: 10px;
        text-align: center;
      }
      .save {
        margin-right: 0px;
        text-align: center;
        border-radius: 2px;
        width: 80px;
        height: 100%;
        background: $vice-bg;
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
      }
    }
    .perface {
      flex: 3.5;
      margin-left: 10px;
      margin-right: 5px;
    }
  }
  .tags {
    $height: 34px;
    overflow: hidden;
    width: 100%;
    height: $height;
    background: $main-bg;
    padding-left: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    display: flex;
    line-height: 26px;
    margin-top: 7px;

    .tag {
      margin-right: 0px;
      text-align: center;
      border-radius: 2px;
      // width: 80px;
      padding-left: 10px;
      padding-right: 10px;
      height: 100%;
      margin-left: 10px;
      background: $vice-bg;
      display: inline-block;
      background: rgba(80, 80, 80, 0.8);
      &:hover {
        cursor: pointer;
        background: rgba(255, 255, 255, 0.2);
      }
    }
    .tag_active {
      background: #0088f5 !important;
    }
  }
  .content {
    width: 100%;
    // padding: 14px;
    background: #3f4347;
  }
  .title {
    width: 100%;
    display: flex;
    // margin-bottom: 7px;
    .input {
      flex: 1;
    }
    .tag-input {
      flex: 0.4;
      margin-left: 1px;
      margin-right: 1px;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }
  .mark-down {
    flex: 1;
    // margin-top: 7px;
  }
}
</style>
