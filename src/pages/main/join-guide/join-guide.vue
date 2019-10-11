<template>
  <div class="mine">
    <navigation-bar  title="5G新营销报名"></navigation-bar>
    <div class="top-box">
      <div class="title">报名请加微信号，还能获得更多会议 ↓↓↓</div>
      <div class="copy-list" v-for="(item, index) in linkList" :key="index">
        <div class="copy-con">
          <img :src="item.image_url" alt="" class="copy-con-img">
          <p class="copy-text">{{item.wechat}}</p>
        </div>
        <div class="copy-btn" @click="copyNumber(item.wechat)">点击复制微信号</div>
      </div>
    </div>
    <div class="guide-con">
      <div class="title">操作指引：</div>
      <img v-if="imageUrl" :src="imageUrl + '/exchange/join-guide01.gif'" alt="" class="guide-img">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import { goodsComputed } from '@state/helpers'

  const PAGE_NAME = 'MINE'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
      }
    },
    onLoad() {
      console.log(this.linkList)
    },
    onShow() {
    },
    computed: {
      ...goodsComputed
    },
    methods: {
      copyNumber(text) {
        wx.setClipboardData({
          data: text,
          success: () => {}
        })
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
    background: #fff
  .top-box,.guide-con
    padding: 20px 20px 25px
    background: $color-white
  .guide-con
    background: $color-background
  .title
    line-height: 1
    color: $color-text-main
    font-bold()
    font-size: 16px
    margin-bottom: 20px
  .top-box
    border-bottom: 11.5px solid $color-background
  .copy-con
    height: 45px
    color: $color-text-main
    font-bold()
    font-size: 16px
    background: #fff8f3
    border-1px(#ff802f, 2px)
    padding-left: 10px
    flex: 1
    layout(row)
    align-items: center
    .copy-con-img
      width: 29px
      height: 29px
      display: block
      border-radius: 50%
      margin-right: 8px
  .copy-btn
    margin-left: 5px
    width: 135px
    text-align: center
    height: 45px
    line-height: 45px
    background: #3FBB39
    text-align: center
    color: #fff
    font-family: $font-family-regular
    font-size: 16px
    border-radius: 2px
  .copy-list
    layout(row)
    align-items: center
    margin-bottom: 12px
  .copy-list:last-child
    margin-bottom: 0
  .guide-con
    padding-top: 25px
    .title
      margin-bottom: 15px
    .guide-img
      width: 100%
      height: px-change-vw(280)
</style>
