<template>
  <div class="popup " :class="showPopup ? 'fade-modal-enter-active' : 'hide-popup'" @click="close">
    <div class="popup-content">
      <video :src="video" id="video" autoplay :show-mute-btn="true" object-fit="contain" class="video" @click.stop></video>
    </div>
  </div>
</template>

<script>
  import AnimationModal from '@mixins/animation-modal'

  const PAGE_NAME = 'popup'

  export default {
    mixins: [AnimationModal],
    name: PAGE_NAME,
    props: {
      // 是否展示弹窗，可使用.sync
      showPopup: {
        type: Boolean,
        default: false
      },
      video: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
      }
    },
    watch: {
    },
    onShow() {
    },
    onUnload() {
    },
    methods: {
      play() {
        wx.createVideoContext('video').play()
      },
      // 点击阴影是否可以关闭弹窗
      close() {
        let video = wx.createVideoContext('video')
        setTimeout(() => {
          video.seek(0)
          video.pause()
        }, 300)
        this.$emit('update:showPopup', false)
        this.$emit('hidePopup')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .fade-modal-enter-active
    opacity: 1
    z-index: 1000
    transition: all 0.5s
  .fade-modal-enter, .fade-modal-leave-to
    opacity: 0
    transition: all 0.5s
  .scale-modal-enter-active
    transform: scale(1)
    transition: all 0.5s

  .scale-modal-enter, .scale-modal-leave-to
    transform: scale(.5)
    transition: all 0.5s

  .hide-popup
    opacity: 0
    z-index: -1
    transition: all 0.2s
  .popup
    padding-top: 32.5vh
    box-sizing: border-box
    background: rgba(39, 39, 62, .9)
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
  .popup-content
    position: relative
    width: 100%
    margin: 0 auto
    border-radius: 2px
    font-size: 0
    text-align: center
  .video
    width: 100%


</style>
