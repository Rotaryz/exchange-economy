<template>
  <div class="workbench service">
    <navigation-bar :isOpacity="true" :translucent="true" arrowColor="white" titleColor="#ffffff" title="工作台"></navigation-bar>
    <div :style="{padding: barHeight+44+14+'px 15px 25px 15px'}" class="user-box">
      <div class="img-box">
        <img v-if="userInfo.avatar||imageUrl" :src="userInfo.avatar||imageUrl + '/yx-image/2.1/default_avatar@2x.png'" mode="aspectFill" alt="" class="user-img">
      </div>
      <div class="user-info">
        <div class="user-name">{{userInfo.nickname}}</div>
        <div class="user-tag">学员</div>
      </div>
      <img mode="aspectFill" src="/static/images/icon-sign_out@2x.png" alt="" class="login-out" @click="showPopup = true">
    </div>
    <div class="content">
      <div class="wrapper">
        <div class="top-bar">
          邀请总览
          <img mode="aspectFill" src="/static/images/icon-right_arrow.png" alt="" class="item-arrow">
        </div>
        <div class="list">
          <div class="item">
            <div class="val">242</div>
            <div class="label">拉新</div>
          </div>
          <div class="item">
            <div class="val">33</div>
            <div class="label">购票</div>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div class="top-bar">凭证核销</div>
        <div class="list service">
          <div class="item">
            <img mode="aspectFill" src="./icon-write_off1@3x.png" alt="" class="item-icon">
            <div class="label">拉新</div>
          </div>
          <div class="item">
            <img mode="aspectFill" src="./icon-write_off2@2x.png" alt="" class="item-icon">
            <div class="label">购票</div>
          </div>
        </div>
      </div>
    </div>
    <exit-popup></exit-popup>
    <exit-popup confirmText="确认" popUpType="confirm" tip="确认要退出登录？" :showPopup.sync="showPopup" @confirm="loginOut"></exit-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import Popup from './popup/popup'

  const PAGE_NAME = 'WORKBENCH'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar,
      'exit-popup': Popup
    },
    data() {
      return {
        userInfo: {},
        barHeight: 20,
        showPopup: false
      }
    },
    onLoad(option) {
      let res = wx.getSystemInfoSync()
      this.barHeight = res.statusBarHeight
      this._getUserInfo()
    },
    methods: {
      _getUserInfo() {
        API.Customer.getUserInfo({}).then(res => {
          this.userInfo = res.data
        })
      },
      _navigateTo() {
        wx.navigateTo({ url: `${this.$routes.main.VERIFICATION}` })
      },
      loginOut() {
        wx.navigateTo({ url: `${this.$routes.work.WORK_LOGIN}` })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .workbench
    box-sizing: border-box
    width: 100%
    min-height: 100vh
    background: $color-background

  .service .user-box
    background: linear-gradient(126deg, #42454C 0%, #292732 100%)
  .user-box
    box-sizing: border-box
    width: 100%
    padding: 78px 15px 25px 15px
    background: linear-gradient(126deg, #4C4242 0%, #322727 100%)
    layout(row)
    align-items: center
    .img-box
      width: 68px
      height: @width
      margin-right: 12px
      border-radius: 100%
      border: 2px solid #fff
      overflow: hidden
      .user-img
        width: 68px
        height: @width
        border-radius: 100%
    .user-info
      flex: 1
      layout()
      align-items: flex-start
      .user-name
        flex: 1
        margin-bottom: 14px
        font-bold()
        line-height: 1
        font-size: 20px
        color: #fff
        no-wrap-plus(1)
      .user-tag
        box-sizing: border-box
        width: auto
        height: 18px
        line-height: 1
        padding: 2px 8.5px
        font-family: $font-family-regular
        font-size: 14px
        color: #fff
        border-1px(#fff,9px)
    .login-out
      align-items: flex-end
      width: 20px
      height: 22px

  .content
    padding: 15px
  .wrapper
    box-sizing: border-box
    width: 100%
    margin-bottom: 15px
    background: #fff
    border-radius: 4px
    .top-bar
      position: relative
      margin-left: 15px
      height: 49px
      line-height: @height
      color: $color-text-main
      font-size: 16px
      font-bold()
      border-bottom-1px()
      .item-arrow
        position: absolute
        right: 15px
        top: 0
        bottom: 0
        margin: auto
        width: 12px
        height: 12px
    .service.list .item
      flex: 0.25
    .list
      layout(row)
      .item
        flex: 1
        padding: 24px 0 22px 0
        layout()
        align-content: center
        .val
          margin-top: 10px
          margin-bottom: 15px
          line-height: 1
          font-bold()
          color: $color-text-main
          font-size: 32px
          text-align: center
        .label
          line-height: 1
          font-family: $font-family-regular
          color: #999999
          font-size: 13px
          text-align: center
        .item-icon
          width: 45px
          height: 45px
          margin-bottom: 10px
</style>
