<template lang="pug">
  div.alert(v-bind:class="[show]")
    div.original
      vue-cropper(
        ref='cropper'
        :guides='true'
        :view-mode='2'
        drag-mode="crop"
        :auto-crop-area='0.5'
        :min-container-width='250'
        :min-container-height='180'
        :background='true'
        :rotatable='true'
        :src='src'
        alt="Source Image"
        :imgStyle="imgStyle"
        :cropmove='cropImage')
    div.shear.border-radius
      img.img.border-radius(:src='this.cropImg' alt="Cropped Image")
    div.shear
      img.img(:src='this.cropImg' alt="Cropped Image")
    div.opertion
      input.set-pic(type="file" name="image" accept="image/*" @change="setImage($event)")
      p
        Icon.icon(type="ios-cloud-upload")
    p.close(@click="_closeAlert()")
      Icon.close-icon(type="chevron-up")
</template>
<script>
import VueCropper from "vue-cropperjs";
import img from "../../../assets/logo.png";

export default {
  data() {
    return {
      imgSrc: img,
      cropImg: "",
      show: "",
      imgStyle: {
        width: "500px",
        height: "300px"
      }
    };
  },
  computed: {
    src() {
      return this.imgSrc;
    }
  },
  components: {
    VueCropper
  },
  mounted() {
    setTimeout(() => {
      this.cropImage();
    }, 2000);
  },
  methods: {
    setImage(e) {
      const file = e.target.files[0];
      console.log(file);

      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };

        reader.readAsDataURL(file);
        // this.$refs.cropper.getCroppedCanvas().toDataURL();
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    _closeAlert() {
      this.show = "alert-close";
    },
    _showAlert() {
      this.show = "alert-show";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/common/scss/base.scss";
.alert {
  width: 700px;
  height: 400px;
  background: $main-bg;
  display: fixed;
  position: absolute;
  top: -436px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0 auto;
  z-index: 100;
  // animation: show 0.5s;
  // animation: close 0.5s;
  // animation-direction:alternate;
  // -webkit-animation-direction:alternate;
  padding: 14px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
  .original {
    float: left;
    position: relative;
  }
  .shear {
    $size: 136px;
    width: $size;
    height: $size;
    background: rgba(0, 0, 0, 0.5) !important;
    border: 4px solid rgba(0, 0, 0, 0.3);
    float: left;
    margin-left: 20px;
    box-sizing: content-box;
    &:nth-child(1n) {
      margin-bottom: 18px;
    }
    img {
      width: $size;
      height: $size;
    }
  }
  .border-radius {
    border-radius: 80px;
  }
  .opertion {
    border-radius: 3px;
    text-align: center;
    font-size: 24px;
    width: 100%;
    height: 30px;
    background: $vice-bg;
    margin-top: 320px;
    line-height: 30px;
    color: white;
    position: relative;
    opacity: 0.8;
    top: 0;
    .set-pic {
      width: 672px;
      height: 30px;
      opacity: 0;
      left: 0;
      position: absolute;
    }
  }
  .close {
    // background: rgba(0, 0, 0, 0.8);
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    margin-top: 18px;
    text-align: center;
    line-height: 20px;
    font-size: 24px;
    height: 20px;
    transition: margin-top 0.25s linear;
    &:hover {
      margin-top: 12px;
      cursor: pointer;
    }
    .close-icon {
      &:hover {
        cursor: pointer;
      }
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
    top: -436px;
    opacity: 0;
  }
  to {
    top: 36px;
    opacity: 1;
  }
}
@keyframes close {
  from {
    top: 36px;
    opacity: 1;
  }
  to {
    top: -436px;
    opacity: 0;
  }
}
</style>
