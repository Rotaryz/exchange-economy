<template>
  <div class="meeting-error">
    <navigation-bar :showArrow="false" title="5G新营销"></navigation-bar>
    <img src="./pic-zanwu@2x.png" alt="" class="meeting-img">
    <p class="meeting-text">会议排期中，敬请期待</p>
    <div class="btn" @click="_refresh">返回首页</div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import app from '@src/app.json'

  const PAGE_NAME = 'MEETING_ERROR'
  const TAB_BAR = app.tabBar.list

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
      }
    },
    computed: {
      // ...Helpers.computed,
    },
    methods: {
      _refresh() {
        wx.switchTab({ url: '/' + TAB_BAR[0].pagePath })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .meeting-error
    width: 100%
  .meeting-img
    width: 109px
    height: @width
    display: block
    margin: 100px auto 12px
  .meeting-text
    font-family: $font-family-regular
    color: #888
    font-size: $font-size-14
    text-align: center
    margin-bottom: 30px
  .btn
    border-radius: 20.5px
    width: 140px
    height: 41px
    line-height: 41px
    text-align: center
    color: $color-white
    background: $color-main
    font-size: $font-size-14
    margin: 23.5px auto
</style>
