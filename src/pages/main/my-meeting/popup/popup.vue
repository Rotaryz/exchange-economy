<template>
  <div class="popup " :class="showPopup ? 'fade-modal-enter-active' : 'hide-popup'" @click="close">
    <div class="popup-content">
      <img src="./pic-voucher_bg@2x.png" alt="" class="code-bg" mode="widthFix">
      <p class="number">12345678</p>
      <img src="" alt="" class="code-image">
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
      // 点击阴影是否可以关闭弹窗
      isSituationClose: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    onUnload() {
      this.isShow = false
    },
    methods: {
      // 点击阴影是否可以关闭弹窗
      close() {
        if (!this.isSituationClose) return
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

  .popup
    padding-top: 32.5vh
    box-sizing: border-box
    background: rgba(39, 39, 62, .7)
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
  .popup-content
    position: relative
    width: 280px
    margin: 0 auto
    border-radius: 2px
    font-size: 0
    text-align: center
    .code-bg
      width: 280px
    .number
      font-size: 26px
      font-family: $font-family-medium
      color: $color-text-main
      font-bold()
      position: absolute
      left: 96px
      top: 15px
    .code-image
      width: 174px
      height: @width
      position: absolute
      top: 108px
      left: 50%
      transform: translateX(-50%)
      background: #ccc

</style>
