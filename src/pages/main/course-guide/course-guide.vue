<template>
  <div class="course-guide">
    <navigation-bar title="课程咨询"></navigation-bar>
    <div class="top-box">
      <div class="title">报名请加微信号，还能获得更多课程 ↓↓↓</div>
      <div class="copy-con">{{wxNum}}</div>
      <div class="copy-btn" @click="copyNumber">点击复制微信号</div>
    </div>
    <div class="guide-con">
      <div class="title">操作指引：</div>
      <img v-if="imageUrl" :src="imageUrl + '/exchange/join-guide01.gif'" alt="" class="guide-img">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'COURSE_GUIDE'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        wxNum: ''
      }
    },
    onLoad(option) {
      this.wxNum = option.wechat
    },
    onShow() {
    },
    methods: {
      copyNumber() {
        wx.setClipboardData({
          data: this.wxNum,
          success: () => {
            // wx.showToast({title: '复制成功', icon: 'none'})
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .course-guide
    box-sizing: border-box
    width: 100%
    min-height: 100vh
    background: #fff
  .top-box,.guide-con
    padding: 20px 20px 25px
    background: #fff
  .title
    line-height: 1
    color: $color-text-main
    font-bold()
    font-size: 16px
  .top-box
    border-bottom: 11.5px solid $color-background
  .copy-con
    height: 50px
    line-height: 50px
    margin: 25px 0 15px
    color: $color-text-main
    font-bold()
    font-size: 16px
    text-align: center
    background: #fff8f3
    border-1px(#ff802f, 2px)
  .copy-btn
    height: 45px
    line-height: 45px
    background: #3FBB39
    text-align: center
    color: #fff
    font-family: $font-family-regular
    font-size: 16px
    border-radius: 2px
  .guide-con
    padding-top: 25px
    .title
      margin-bottom: 15px
    .guide-img
      width: 100%
      height: px-change-vw(280)
</style>
