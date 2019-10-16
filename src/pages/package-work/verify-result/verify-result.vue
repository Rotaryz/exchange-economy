<template>
  <div class="verify-result">
    <navigation-bar  :title="verifyObj[verifyStatus].title"></navigation-bar>
    <div class="content">
      <img mode="aspectFill" :src="verifyObj[verifyStatus].img" alt="" class="status-img">
      <div class="title">{{verifyObj[verifyStatus].title}}</div>
      <div class="text">{{verifyObj[verifyStatus].text}}</div>
      <div class="button" @click="_goBack">返回</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'VERIFY_RESULT'
  const IMG_SUCCESS = require('./pic-payok.png')
  const IMG_FAILED = require('./pic-payno@2x.png')

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        verifyStatus: 0,
        verifyObj: [
          {
            img: IMG_FAILED,
            title: '核销失败',
            text: '该凭证不存在'
          },
          {
            img: IMG_SUCCESS,
            title: '核销成功'
          }
        ]
      }
    },
    onLoad(option) {
      if (option) {
        this.verifyStatus = option.status * 1 || 0
        this.verifyObj[0].text = option.errorMsg || '该凭证不存在'
      }
    },
    methods: {
      _goBack() {
        wx.navigateBack({ delta: 1 })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .verify-result
    width: 100%
  .content
    padding-top: 67px
    layout()
    align-items: center
  .status-img
    width: 90px
    height: @width
    margin-bottom: 7px
  .title
    font-bold()
    font-size: 20px
    color: #3f454b
    text-align: center
  .text
    margin: 10px 0 25px
    font-family: $font-family-regular
    font-size: 13px
    color: #84909B
    text-align: center
  .button
    width: px2vw(180)
    height: 40px
    line-height: 40px
    font-family: $font-family-regular
    font-size: 14px
    color: $color-text-main
    text-align: center
    border-1px(#d2d2d2, 20px)

</style>
