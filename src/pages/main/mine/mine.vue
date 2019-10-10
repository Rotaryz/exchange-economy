<template>
  <div class="mine">
    <navigation-bar headStyle="background: #f7f7f7" :showArrow="false" titleColor="#333333" title="我的"></navigation-bar>
    <div class="user-box">
      <img v-if="userInfo.avatar||imageUrl" :src="userInfo.avatar||imageUrl + '/yx-image/2.1/default_avatar@2x.png'" mode="aspectFill" alt="" class="user-img">
      <div class="user-info">
        <div class="user-name">{{userInfo.nickname}}</div>
        <div class="user-tag">学员</div>
      </div>
    </div>
    <div class="item-list">
      <div class="item" @click="_navigateTo('meeting')">
        <div class="item-label">我的会议</div>
        <img mode="aspectFill" src="/static/images/icon-right_arrow.png" alt="" class="item-arrow">
      </div>
      <div class="item" @click="phoneCall">
        <div class="item-label">联系我们</div>
        <div class="text-con">
          <div class="item-text">{{phoneNum}}</div>
        </div>
        <img mode="aspectFill" src="/static/images/icon-right_arrow.png" alt="" class="item-arrow">
      </div>
    </div>
    <div class="item-list">
      <div class="item" @click="_navigateTo('workbench')">
        <div class="item-label">工作台</div>
        <img mode="aspectFill" src="/static/images/icon-right_arrow.png" alt="" class="item-arrow">
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
        userInfo: {},
        phoneNum: ''
      }
    },
    onLoad() {
      this.phoneNum = wx.getStorageSync('phone') || ''
      this._getUserInfo()
    },
    methods: {
      _getUserInfo() {
        API.Customer.getUserInfo({}).then(res => {
          this.userInfo = res.data
        })
      },
      phoneCall() {
        wx.makePhoneCall({
          phoneNumber: this.phoneNum
        })
      },
      _navigateTo(type) {
        let navigateArr = {
          meeting: ``,
          workbench: `${this.$routes.work.WORKBENCH}`
        }
        wx.navigateTo({ url: navigateArr[type] })
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
  .user-box,.item-list
    box-sizing: border-box
    width: 100%
    margin-bottom: 15px
    background: #fff
    layout(row)
    align-items: center
    border-radius: 4px
  .user-box
    height: 140px
    padding: 0 15px
    .user-img
      width: 70px
      height: @width
      margin-right: 12px
      border-radius: 35px
    .user-info
      flex: 1
      layout()
      align-items: flex-start
      .user-name
        flex: 1
        margin-bottom: 14px
        font-bold()
        font-size: 20px
        color: $color-text-main
        no-wrap-plus(1)
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
  .item-list
    .item
      position: relative
      box-sizing: border-box
      width: 100%
      height: 60px
      padding: 0 30px 0 15px
      layout(row)
      align-items: center
      justify-content: space-between
      color: $color-text-main
      font-size: 14px
      font-family: $font-family-regular
      border-bottom-1px()
      &:last-child
        border-none()
      .text-con
        layout(row)
        justify-content: flex-end
      .item-arrow
        position: absolute
        right: 15px
        top: 0
        bottom: 0
        margin: auto
        width: 12px
        height: 12px
</style>
