<template lang="pug">
    div.mavon-edit(ref="mavonedit")
      mavonEditor( :ishljs="false")
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  components: {
    mavonEditor
  },
  mounted(){
    this.init()
  },
  methods:{
    init() {
      this.$refs.mavonedit.style.height =
        innerHeight - 60 - 7 - 4 - 40 - 8 - 4 - 7-33-4-4 + "px";
    }
  }
};
</script>
<style lang="scss" scoped>
.mavon-edit{
  height: 100%;
  border-radius: 3px;
}
</style>
