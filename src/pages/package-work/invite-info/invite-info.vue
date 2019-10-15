<template>
  <div class="invite-info">
    <navigation-bar  title="邀请总览"></navigation-bar>
    <div :style="{top: statusBarHeight + 'px'}" class="top-tab">
      <div v-for="(item, idx) in tabList" :key="idx" :class="[type===item.type?'active':'']" class="tab-item" @click="_tabChange(item.type)">{{item.name}}</div>
      <div :style="{left: type*50+'%'}" class="tab-line"></div>
    </div>
    <div class="content">
      <div :style="{'transform': ' translateX('+ -(type * 100) +'vw)'}" class="container">
        <div v-for="(tab, idx) in tabList" :key="idx" class="list">
          <div class="list-header list-item">
            <div class="left-box">{{idx===1?'购票':'邀请'}}客户</div>
            <div class="right-box">时间</div>
          </div>
          <div v-if="listData.length" v-for="(item, index) in listData" :key="index" class="list-item">
            <div class="left-box">
              <img v-if="item.avatar||imageUrl" :src="item.avatar||imageUrl + '/yx-image/2.1/default_avatar@2x.png'" alt="" class="item-img" mode="aspectFill">
              <div class="name-box">
                <div class="name">{{item.nickname}}</div>
                <div v-if="idx===1&&item.participants_status_text" :class="[item.participants_status===1?'ed':'']" class="status-box">{{item.participants_status_text}}</div>
              </div>
            </div>
            <div class="right-box">{{item.created_at}}</div>
          </div>
          <empty v-if="!hasMore&&!listData.length" :imgWidth="72" :paddingTop="38" tipSub="暂无数据"></empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import Empty from '@components/empty/empty'

  const PAGE_NAME = 'INVITE_INFO'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar,
      Empty
    },
    data() {
      return {
        statusBarHeight: 64,
        tabList: [
          {name: '拉新', type: 0},
          {name: '购票', type: 1}
        ],
        type: 0,
        listData: {},
        listParams: {page: 1, limit: 20},
        hasMore: false
      }
    },
    onReachBottom() {
      if (this.hasMore) {
        this.listParams.page++
        this._getListData()
      }
    },
    onLoad(options) {
      this.type = options.type || 0
      let res = wx.getSystemInfoSync()
      this.statusBarHeight = res.statusBarHeight ? res.statusBarHeight + 44 : 64
      this._getListData()
    },
    methods: {
      _tabChange(type) {
        this.type = type
        this.listParams.page = 1
        this._getListData()
      },
      _getListData() {
        let apiArr = ['getCustomerList', 'getBuyTicketList']
        API.BusinessManager[apiArr[this.type]]({data: this.listParams}).then(res => {
          if (this.listParams.page === 1) {
            this.listData = res.data
          } else {
            this.listData = this.listData.concat(res.data)
          }
          this.hasMore = res.meta.current_page < res.meta.last_page
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  $tabHeight = 50px

  .invite-info
    width: 100%
    min-height: 100vh
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
    width: 100vw
    height: 100%
    overflow: hidden
    .container
      width: 200vw
      height: 100%
      margin-top: $tabHeight
      border-top: 10px solid $color-background
      layout(row)
      transition: all 0.3s
  .list
    box-sizing: border-box
    width: 100vw
    height: 100%
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
        flex: 1
        no-wrap()
        layout(row)
        align-items: center
        font-size: 14px
        color: #3F454B
        .name-box
          flex: 1
          layout()
          no-wrap()
          .name
            width: 100%
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .status-box
            box-sizing: border-box
            width: auto
            max-width: 40px
            height: 14px
            line-height: 1
            padding: 2px 5px
            font-family: $font-family-regular
            color: #d2d2d2
            font-size: 10px
            text-align: center
            border-1px(#d2d2d2,7px)
            &.ed
              background: #FFF8F3
              color: #FF802F
              border-1px(#FF802F,7px)
      .right-box
        padding-left: 10px
        font-size: 12px
        color: #999999
      .item-img
        width: 36px
        height: @width
        margin-right: 10px
        border-radius: 100%
    .list-header
      height: 40px
      .left-box,.right-box
        font-size: 14px
        color: #d2d2d2
</style>
