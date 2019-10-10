<template>
  <div class="invite-info">
    <navigation-bar  title="邀请总览"></navigation-bar>
    <div :style="{top: statusBarHeight + 'px'}" class="top-tab">
      <div v-for="(item, idx) in tabList" :key="idx" :class="[type===item.type?'active':'']" class="tab-item" @click="_tabChange(item.type)">{{item.name}}</div>
      <div :style="{left: type*50+'%'}" class="tab-line"></div>
    </div>
    <div :style="{'transform': ' translateX('+ -(type * 100) +'vw)', 'transition': boxTransition}" class="content">
      <div v-for="(item, idx) in tabList" :key="idx" class="list">
        <div class="list-header list-item">
          <div class="left-box">邀请客户</div>
          <div class="right-box">时间</div>
        </div>
        <div class="list-item">
          <div class="left-box">
            <img mode="aspectFill" src="/static/images/user.png" alt="" class="item-img">
            <div class="name-box">
              客户
              <div v-if="idx===1" class="status-box">已参会</div>
            </div>
          </div>
          <div class="right-box">1232-52-23</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'INVITE_INFO'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        statusBarHeight: 64,
        tabList: [
          {name: '拉新', type: 0},
          {name: '购票', type: 1}
        ],
        type: 0,
        boxTransition: 'all 0.25s'
      }
    },
    onLoad(option) {
      let res = wx.getSystemInfoSync()
      this.statusBarHeight = res.statusBarHeight ? res.statusBarHeight + 44 : 64
    },
    methods: {
      _tabChange(type) {
        this.type = type
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  $tabHeight = 50px

  .invite-info
    width: 100%
  .top-tab
    position: fixed
    top: 64px
    z-index: 9
    width: 100vw
    height: $tabHeight
    layout(row)
    align-items: center
    justify-content: space-between
    background: #fff
    box-shadow: 0 1px 0 0 #E6E7E9
    .tab-item
      flex: 1
      text-align: center
      font-size: 15px
      font-family: $font-family-regular
      color: $color-text-main
      transition: all 0.3s
      &.active
        font-bold()
        font-size: 17px
    .tab-line
      position: absolute
      left: 0
      bottom: 0
      width: 50%
      height: 3px
      layout()
      align-items: center
      transition: all 0.3s
      &:before
        content: ''
        width: 30px
        height: 3px
        border-radius: 1.5px
        background: $color-main
  .content
    width: 200vw
    margin-top: $tabHeight
    border-top: 10px solid $color-background
    layout(row)
  .list
    box-sizing: border-box
    width: 100vw
    padding-left: 15px
    .list-item
      padding-right: 15px
      height: 55px
      layout(row)
      align-items: center
      justify-content: space-between
      border-bottom-1px()
      font-family: $font-family-regular
      .left-box
        layout(row)
        align-items: center
        font-size: 14px
        color: #3F454B
        .name-box
          layout()
          .status-box
            box-sizing: border-box
            width: auto
            height: 14px
            line-height: 1
            padding: 2px 5px
            font-family: $font-family-regular
            color: #d2d2d2
            font-size: 10px
            border-1px(#d2d2d2,7px)
      .right-box
        font-size: 12px
        color: #999999
      .item-img
        width: 36px
        height: @width
        margin-right: 10px
    .list-header
      height: 40px
      .left-box,.right-box
        font-size: 14px
        color: #d2d2d2
</style>
