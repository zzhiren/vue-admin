<template lang="pug">
    div.mavon-edit(ref="mavonedit")
      //- button(@click="uploadImg") upload
      mavon-editor(ref="mavonEdit" :ishljs="false" @imgAdd="$imgAdd" @imgDel="$imgDel")
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import axios from "axios";
export default {
  data() {
    return {
      img_file: {},
      picObj: {}
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
      this.$refs.mavonedit.style.height =
        innerHeight - 60 - 7 - 4 - 40 - 8 - 4 - 7 - 33 - 4 - 4 + "px";
    },
    $imgAdd(pos, $file) {
      this.img_file[pos] = $file;
      console.log(pos);
      this.uploadImg(pos);
    },
    $imgDel(pos) {
      console.log(pos)
      // delete this.img_file[this.picObj[pos].mdName]
      var deletPath = this.picObj[pos].deletePath
      this.deleteImg(pos)
      console.log('111',this.picObj[pos].deletePath)
    },
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
        this.picObj = res.data.result.picObj
        //批量修改图片名称
        this.$refs.mavonEdit.$imglst2Url(res.data.result.picList)
        //单个修改图片名称
        // this.$refs.mavonEdit.$img2Url(pos, res.data.result.picList[0][1]);
        console.log(this);
      });
    },
    deleteImg(pos) {
      this.$axios({
        method: "post",
        url: "/deleteimg",
        data: {
          deletePath:this.picObj[pos].deletePath
        }
      }).then(res =>{
        console.log(res.data)
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
