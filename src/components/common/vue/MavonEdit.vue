<template lang="pug">
    div.mavon-edit(ref="mavonedit")
      //- button(@click="uploadImg") upload
      mavon-editor(ref="mavonEditor" :ishljs="false" @imgAdd="$imgAdd" @imgDel="$imgDel" @change="$change")
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import axios from "axios";
export default {
  data() {
    return {
      img_file: {},
      picDelObj: [],
      picList:[],
      value: '',
      firstPic: ''
    };
  },
  components: {
    mavonEditor
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 设置mavonedit控件高度
      this.$refs.mavonedit.style.height =
        innerHeight - 60 - 7 - 4 - 40 - 8 - 4 - 7 - 33 - 4 - 4 + - 33 +"px";
    },
    $change(value,render){
      // console.log('render',render)
      this.value = render
    },
    // 添加图片
    $imgAdd(pos, $file) {
      this.img_file[pos] = $file;
      // console.log(pos);
      this.uploadImg(pos);
      // this.value = this.$refs.mavonEdit.d_render.toString()
    },
    // 删除图片
    $imgDel(pos) {
      console.log('pos',pos);
      delete this.img_file[pos];
      this.$refs.mavonEditor.d_history = [];
      var deletPath = this.picDelObj[pos].deletePath;
      this.deleteImg(pos);
    },
    // 上传图片
    uploadImg(pos) {
      var $vm = this;
      var formdata = new FormData();
      for (var _img in this.img_file) {
        formdata.append(_img, this.img_file[_img]);
      }
      this.$axios({
        method: "post",
        url: "/uplodimg",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        for(var i in res.data.result.picDelObj){
          this.picDelObj.push(res.data.result.picDelObj[i])
        }
        this.picList = res.data.result.picList
        this.firstPic = res.data.result.picList[0][1]
        console.log( res.data.result.picList[0][1])

        //批量修改图片名称
        this.$refs.mavonEditor.$imglst2Url(res.data.result.picList)
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
          deletePath:this.picDelObj[pos].deletePath
        },
        headers:{"Content-type":"application/json; charset=utf-8"}
      }).then(res =>{
        // console.log(res.data)
        // console.log(this.picObj[pos].deletPath)
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.mavon-edit {
  height: 100%;
  border-radius: 3px;
}
</style>
