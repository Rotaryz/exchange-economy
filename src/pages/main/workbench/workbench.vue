<template>
  <div class="workbench">
    <navigation-bar :isOpacity="true" :translucent="true" arrowColor="white" titleColor="#ffffff" title="工作台asd" ></navigation-bar>
    <div :style="{padding: barHeight+44+14+'px 15px 25px 15px'}" class="user-box">
      <div class="img-box">
        <img v-if="userInfo.avatar||imageUrl" :src="userInfo.avatar||imageUrl + '/yx-image/2.1/default_avatar@2x.png'" mode="aspectFill" alt="" class="user-img">
      </div>
      <div class="user-info">
        <div class="user-name">{{userInfo.nickname}}</div>
        <div class="user-tag">学员</div>
      </div>
      <img mode="aspectFill" src="/static/images/icon-sign_out@2x.png" alt="" class="login-out">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'MINE'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        userInfo: {},
        barHeight: 20
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
      _navigateTo(type) {
        let navigateArr = {
          meeting: `${this.$routes.main.VERIFICATION}`,
          workbench: `${this.$routes.main.WORKBENCH}`
        }
        wx.navigateTo({ url: navigateArr[type] })
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
  .user-box
    box-sizing: border-box
    width: 100%
    padding: 78px 15px 25px 15px
    margin-bottom: 15px
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

</style>
