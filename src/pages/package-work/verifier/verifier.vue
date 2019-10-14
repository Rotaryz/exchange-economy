<template>
  <div class="verifier">
    <navigation-bar  title="凭证核销"></navigation-bar>
    <div class="title">输码核销</div>
    <input v-model="code" type="number" placeholder-style="color: #999999;font-size: 16px;font-family: PingFangSC-Regular;font-weight: 200;letter-spacing: 1px;" maxlength="8" placeholder="输入8位凭证号" class="input-box">
    <div :class="[code?'active':'']" class="sub-btn" @click="_verifyFun">核销</div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'VERIFIER'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        code: ''
      }
    },
    onShow() {
      this.code = ''
    },
    methods: {
      // 核销
      _verifyFun() {
        API.BusinessManager.verify({data: {code: this.code}}).then(res => {
          wx.navigateTo({ url: `${this.$routes.work.VERIFY_RESULT}?status=1` })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .verifier
    box-sizing: border-box
    width: 100%
    padding: 0 15px
  .title
    margin: 30px 0 5px 0
    color: $color-text-main
    font-family: $font-family-regular
    font-size: 16px
  .input-box
    height: 60px
    line-height: 60px
    font-bold()
    font-size: 35px
    letter-spacing: 6px
    border-bottom-1px()
  .sub-btn
    margin-top: 30px
    height: 40px
    line-height: 40px
    font-bold()
    font-size: 16px
    color: #fff
    text-align: center
    background: $color-main
    border-radius: 20px
    opacity: 0.5
    transition: all 0.3s
    &.active
      opacity: 1
</style>
