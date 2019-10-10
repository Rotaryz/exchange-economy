<template>
  <div class="verification">
    <navigation-bar  title="登录"></navigation-bar>
    <div class="title">员工可输入账号登录</div>
    <div class="from-item">
      <input v-model="phone" type="text" placeholder-style="color: #999999; font-size:15px;font-family: PingFangSC-Regular;" maxlength="11" placeholder="请输入手机号" class="from-input">
      <div :class="[phone.length===11?'active':'']" class="from-btn" @click="_getVerifyCode">{{verifyText}}</div>
    </div>
    <div class="from-item">
      <input v-model="code" type="text" placeholder-style="color: #999999; font-size:15px;font-family: PingFangSC-Regular;" maxlength="11" placeholder="请输入短信验证码" class="from-input">
    </div>
    <div :class="[phone&&code?'active':'']" class="sub-btn" @click="_loginFun">登录</div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'WORK_LOGIN'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        verifyText: '获取验证码',
        phone: '',
        code: ''
      }
    },
    onLoad(option) {
    },
    methods: {
      _getVerifyCode() {
        if (!this.phone) return
        this.verifyText = 60
        let self = this
        this.codeTimer = setInterval(() => {
          if (self.verifyText > 0) {
            self.verifyText--
          } else {
            clearInterval(this.codeTimer)
            self.verifyText = '重新获取验证码'
          }
        }, 1000)
      },
      _loginFun() {
        if (!this.phone) {
          wx.showToast('请输入手机号')
          return
        }
        if (!this.code) {
          wx.showToast('请输入短信验证码')
          return
        }
        console.log('1111')
        wx.navigateTo({ url: `${this.$routes.work.WORKBENCH}` })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .verification
    box-sizing: border-box
    width: 100%
    padding: 0 40px
    .title
      padding: 42px 0 30px
      font-bold()
      font-size: 16px
      color: $color-text-main
    .from-item
      height: 45px
      margin-bottom: 15px
      layout(row)
      align-content: center
      justify-content: space-between
      border-bottom-1px()
      &:last-child
        margin-bottom: 0
      .from-input
        font-family: $font-family-regular
        font-size: 15px
        color: $color-text-main
      .from-btn
        padding: 0 10px
        min-width: 80px
        height: 28px
        line-height: 28px
        font-family: $font-family-regular
        font-size: 12px
        color: #999999
        text-align: center
        border-radius: 14px
        border: 1px solid #E8EAEE
        transition: all 0.3s
        &.active
          color: $color-text-sub
          border: 1px solid #d2d2d2
    .sub-btn
      margin-top: 40px
      height: 40px
      line-height: 40px
      font-bold()
      font-size: 16px
      color: rgba(255,255,255,0.5)
      text-align: center
      background: $color-main
      border-radius: 20px
      opacity: 0.5
      transition: all 0.3s
      &.active
        opacity: 1
        color: #fff
</style>
