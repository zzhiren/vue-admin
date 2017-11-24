<template lang="pug">
    div.mavon-edit(ref="mavonedit")
      button(@click="uploadimg") upload
      img(src="http://localhost:3000/blog/me.jpg")
      mavon-editor(ref="xxx" :ishljs="false" @imgAdd="$imgAdd" )
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import axios from "axios";
export default {
  data() {
    return {
      img_file: {}
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
      
      console.log( this.img_file)
    },
    uploadimg($e) {
      // this.$refs.xxx.style.background = "red"
      console.log(this.img_file);      
      var vm = this
      var formdata = new FormData();
      for (var _img in this.img_file) {
        formdata.append(_img, this.img_file[_img]);
      }
      this.$axios({
        method: "post",
        url: "/img",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        console.log(res.data.result.formdata);
        // vm.$refs.xxx.$imgAddByUrl(res.data.result.formdata[0],'xxxx')
      });
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
