<template>
  <div class="mine">
    <navigation-bar headStyle="background: #f7f7f7" :showArrow="false" titleColor="#333333" title="我的"></navigation-bar>
    <div class="user-box">
      <img mode="aspectFill" src="/static/images/user.png" alt="" class="user-img">
      <div class="user-info">
        <div class="user-name">我的天</div>
        <div class="user-tag">学员</div>
      </div>
    </div>
    <div class="item" @click="goGuide">
      <div class="item-label">联系我们</div>
      <div class="text-con">
        <div class="item-text">12345678987</div>
        <img mode="aspectFill" src="/static/images/icon-tel@2x.png" alt="" class="item-icon">
      </div>
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
        userInfo: {}
      }
    },
    onShow() {
      this._getUserInfo()
    },
    methods: {
      _getUserInfo() {
        API.Customer.getUserInfo({}).then(res => {
          this.userInfo = res.data
        })
      },
      goGuide() {
        wx.navigateTo({ url: `${this.$routes.main.JOIN_GUIDE}` })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .mine
    box-sizing: border-box
    width: 100%
    min-height: 100vh
    padding: 0 15px
    background: $color-background
  .user-box,.item
    box-sizing: border-box
    width: 100%
    padding: 0 15px
    background: #fff
    layout(row)
    align-items: center
    border-radius: 4px
  .user-box
    height: 140px
    margin-bottom: 15px
    .user-img
      width: 70px
      height: @width
      margin-right: 12px
    .user-info
      flex: 1
      layout()
      align-items: flex-start
      .user-name
        margin-bottom: 14px
        font-family: $font-family-medium
        font-size: 20px
        color: $color-text-main
      .user-tag
        box-sizing: border-box
        width: auto
        height: 18px
        line-height: 1
        padding: 2px 8.5px
        font-family: $font-family-regular
        font-size: 14px
        color: #fc3e3e
        border-1px(#fc3e3e,9px)
  .item
    height: 60px
    justify-content: space-between
    color: $color-text-main
    font-size: 14px
    font-family: $font-family-regular
    .item-label
    .text-con
      layout(row)
      justify-content: flex-end
    .item-icon
      width: 20px
      height: 20px
      margin-left: 10px
</style>
