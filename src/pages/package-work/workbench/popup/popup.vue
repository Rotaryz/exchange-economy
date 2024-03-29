<template>
  <div class="popup " :class="showPopup ? 'fade-modal-enter-active' : 'hide-popup'" @click="close">
    <div v-if="popUpType === 'confirm'" class="popup-content">
      <div class="popup-title">{{text}}</div>
      <div class="popup-tip">{{tip}}</div>
      <div class="popup-btn">
        <div class="btn-item btn-cancel" @click="hidePopup">{{cancelText}}</div>
        <div class="btn-item btn-confirm" :style="confirmStyle" @click="confirm">{{confirmText}}</div>
      </div>
    </div>
    <div v-if="popUpType === 'copy'" class="popup-content">
      <div class="popup-title">{{text}}</div>
      <div :class="[shareNum.length>6?'num-2':'']" class="share-num">{{shareNum}}</div>
      <div class="popup-btn">
        <div class="copy-btn" @click="copyShareNum">复制</div>
      </div>
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
      tip: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: '温馨提示'
      },
      // 取消按钮的文案
      cancelText: {
        type: String,
        default: '取消'
      },
      // 确定按钮的文案
      confirmText: {
        type: String,
        default: '确定'
      },
      // 是否展示弹窗，可使用.sync
      showPopup: {
        type: Boolean,
        default: false
      },
      // 确定按钮的样式配置
      confirmStyle: {
        type: String,
        default: ''
      },
      // 弹窗类型
      popUpType: {
        type: String,
        default: 'confirm' // confirm (确定取消类型); copy复制类型
      },
      shareNum: {
        type: [String, Number],
        default: ''
      },
      // 点击阴影是否可以关闭弹窗
      isSituationClose: {
        type: Boolean,
        default: false
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
      },
      // 取消
      hidePopup() {
        this.$emit('update:showPopup', false)
        this.$emit('hidePopup')
      },
      // 确定
      confirm() {
        this.$emit('update:showPopup', false)
        this.$emit('confirm')
      },
      copyShareNum() {
        wx.setClipboardData({
          data: this.shareNum,
          success: () => {
            this.$emit('update:showPopup', false)
          }
        })
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

  .default-modal-wrap
    position: fixed
    background: rgba(36, 41, 59, 0.5)
    bottom: 0
    left: 0
    top:0
    width: 100vw
    height: 100vh
    z-index: 1500
    layout()
    justify-content: center
    align-items: center
    transition: opacity 0.3s
    &.hide-modal
      opacity 0
      transform scale(0)
    .content-wrap
      background-color $color-white
      width: px-change-vw(280)
      border-radius 2px
      transition: all 0.3s
      &.hide-wrap
        transform scale(0)
      .content-head
        height:55px
        line-height:55px
        font-size: $font-size-16
        font-bold()
        color: #3F454B
        &.center
          text-align center
      .content-body
        padding:0 40px 14px

      .content-footer
          display flex
          .footer-button
            flex:1
            height:40px
            line-height 40px
            text-align center
            &.default-button
              border-top-1px(#EFEEF5)
            &.default-yellow
              background-image: linear-gradient(114deg, #F5E5C1 1%, #F2D699 98%)
            &:last-child
              border-radius: 0 0 2px 0
            &:frist-child
              border-radius: 0 0 0 2px

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
    height: 150px
    width: 280px
    margin: 0 auto
    border-radius: 2px
    text-align: center
    background: $color-white
  .popup-title
    color: $color-text-sub
    font-size: $font-size-16
    font-family: $font-family-medium
    padding: 20px 0 0
  .popup-tip
    margin-top: 25px
    font-family: $font-family-medium
    color: $color-text-main
    font-size: $font-size-15
  .popup-btn
    width: 100%
    height: 40px
    display: flex
    position: absolute
    bottom: 0
    left: 0
    .btn-item
      font-size: $font-size-14
      font-family: $font-family-regular
      text-align: center
      line-height: 40px
      flex: 1
    .btn-cancel
      color: $color-text-sub
      border-top-1px($color-line)
    .btn-confirm
      color: $color-white
      background: $color-main

  .hide-popup
    opacity: 0
    z-index: -1
    transition: all 0.2s

  .share-num
    letter-spacing: 13.44px
    margin-top: 20px
    color: $color-text-main
    font-family: $font-family-bold
    font-size: 28px
    &.num-2
      letter-spacing: 1px

  .copy-btn
    color: $color-main
    font-size: $font-size-14
    font-family: $font-family-regular
    line-height: 40px
    text-align: center
    flex: 1
    border-top-1px($color-line)
</style>
