<template>
  <div class="my-meeting">
    <navigation-bar title="我的会议"></navigation-bar>
    <div class="header-tab">
      <div class="tab-box">
        <div class="tab-item" :class="tabIdx === index ? 'active' : ''" v-for="(item, index) in tabList" :key="index" @click="changeTab(index, item)">
          {{item.txt}}
        </div>
      </div>
      <div class="underline-box" :style="'transform: translate(' + tabIdx*100 + '%,0)'">
        <div class="underline"></div>
      </div>
    </div>

    <div class="container">
      <div class="big-container" :style="'transform: translate(-' + tabIdx*50 + '%,0)'">
        <div class="container-item">
          <div class="list-container">
            <div class="list-item" v-for="(item, index) in willList" :key="item.id">
              <div class="item-detail" @click="goMeetingDetail(item)">
                <img :src="item.detail[0].meeting_cover_image" alt="" class="meeting-image">
                <div class="meeting-right">
                  <p class="meeting-title">{{item.detail[0].meeting_name}}</p>
                  <p class="meeting-time">时间: {{item.detail[0].meeting_time}}</p>
                  <p class="meeting-addr">地点: {{item.detail[0].meeting_description}}</p>
                </div>
              </div>
              <div class="bottom-space">
                <span class="see-btn" @click="goCodePage(item)">查看凭证</span>
              </div>
            </div>
            <empty v-if="!willList.length && loaded" :image="empty" :imgWidth="100" :paddingTop="100" tip="暂无会议"></empty>
          </div>
        </div>
        <div class="container-item">
          <div class="list-container">
            <div class="list-item" v-for="(item, index) in completeList" :key="item.id" @click="goMeetingDetail(item)">
              <div class="item-detail complete-detail">
                <img :src="item.detail[0].meeting_cover_image" alt="" class="meeting-image">
                <div class="meeting-right">
                  <p class="meeting-title">{{item.detail[0].meeting_name}}</p>
                  <p class="meeting-time">时间: {{item.detail[0].meeting_time}}</p>
                  <p class="meeting-addr">地点: {{item.detail[0].meeting_description}}</p>
                </div>
              </div>
            </div>

            <empty v-if="!completeList.length && loaded" :image="empty" :imgWidth="100" :paddingTop="100" tip="暂无会议"></empty>
          </div>
        </div>
      </div>
    </div>
    <loading-more v-if="isLoading"></loading-more>
    <isEnd v-if="isEnd && (willList.length || completeList.length)"></isEnd>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import Empty from '@components/empty/empty'
  import LoadingMore from '@components/loading-more/loading-more'
  import IsEnd from '@components/is-end/is-end'

  const PAGE_NAME = 'MY_MEETING'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar,
      Empty,
      LoadingMore,
      IsEnd
    },
    data() {
      return {
        tabList: [
          {txt: '待使用', id: 0, list: 'willList', status: 10},
          {txt: '已完成', id: 1, list: 'completeList', status: 100}
        ],
        tabIdx: 0,
        willList: [],
        completeList: [],
        meetingList: {},
        loaded: false,
        page: 1,
        status: 10,
        listType: 'willList',
        isLoading: false,
        isEnd: false
      }
    },
    computed: {
      // ...Helpers.computed,
    },
    onLoad() {
      this.getMeetingList(true)
    },
    onShow() {
    },
    onReachBottom() {
      if (this.isEnd) return
      this.page++
      this.getMeetingList()
    },
    methods: {
      getMeetingList(loading = false) {
        if (this.page > 1) this.isLoading = true
        API.Meeting.getMyMeetingList({
          data: {
            page: this.page,
            status: this.status
          },
          loading
        })
          .then(res => {
            this.isLoading = false
            if (this.page === 1) {
              this.willList = []
              this.completeList = []
            }
            this.loaded = true
            if (+this.page === +res.meta.last_page) {
              this.isEnd = true
            }
            this[this.listType] = [...this[this.listType], ...res.data]
          })
          .catch(() => {
            this.isLoading = false
          })
      },
      changeTab(idx, item) {
        this.tabIdx = idx * 1
        this.status = item.status
        this.page = 1
        this.listType = item.list
        this.isEnd = false
        this.getMeetingList()
      },
      goMeetingDetail(item) {
        let url = `${this.$routes.main.MY_MEETING_DETAIL}?id=${item.id}`
        this.$checkIsTabPage(url) ? wx.switchTab({ url }) : wx.navigateTo({ url })
      },
      goCodePage(item) {
        this.$store.dispatch('myMeeting/setCode', item.coupon_list)
        let url = `${this.$routes.main.MEETING_CODE}`
        this.$checkIsTabPage(url) ? wx.switchTab({ url }) : wx.navigateTo({ url })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .my-meeting
    width: 100%
    min-height: 100vh
    background: $color-background
    display: flex
    flex-direction: column
    .header-tab
      height: 50px
      background: $color-white
      position: relative
      border-bottom-1px($color-line)
      .tab-box
        width: 100%
        height: 50px
        display: flex
        .tab-item
          flex: 1
          height: 50px
          line-height: 50px
          text-align: center
          font-size: $font-size-16
          color: $color-text-main
          font-family: $font-family-regular
          letter-spacing: 0.8px
          transition: all 0.2s
        .tab-item.active
          color: $color-text-main
          font-family: $font-family-medium
          font-bold()
      .underline-box
        height: 3px
        position: absolute
        bottom: 0
        width: 50%
        display: flex
        justify-content: center
        transform: translate(0, 0)
        transition: all 0.3s
        z-index: 1
        .underline
          width: 30px
          height: 3px
          background: #FC3E3E
          border-radius: 3px

    .container
      width: 100vw
      height: 100%
      overflow: hidden
      flex: 1
      .big-container
        width: 200vw
        height: 100%
        display: flex
        transition: all 0.3s
        .container-item
          width: 100vw
          height: 100%
          box-sizing: border-box
          background: $color-background
        .list-item
          margin-top: 10px
          border-radius: 2px
          border-1px($color-line, 2px)
          background: #FFF
          padding: 0 15px
          box-sizing: border-box
        .item-detail
          height: 120px
          display: flex
          align-items: center
          justify-content: space-between
        .meeting-image
          background: #CCC
          width: 90px
          height: 90px
          border-radius: 4px
          flex: 0 0 auto
        .meeting-right
          padding: 2px 0 2px 10px
          height: 90px
          flex: 1
          overflow: hidden
          box-sizing: border-box
        .meeting-title
          color: $color-text-main
          font-family: $font-family-medium
          font-bold()
          font-size: $font-size-15
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
        .meeting-time,.meeting-addr
          margin-top: 12px
          color: #999
          font-family: $font-family-medium
          font-bold()
          font-size: $font-size-14
        .meeting-addr
          margin-top: 0
          display: -webkit-box
          overflow: hidden
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
          word-break: break-all
        .bottom-space
          border-top-1px($color-line)
          height: 45px
          display: flex
          align-items: center
          justify-content: flex-end
        .see-btn
          width: 76px
          height: 26px
          line-height: 26px
          borde-radius: 26px
          text-align: center
          font-size: $font-size-14
          color: #FC3E3E
          border-1px(#FC3E3E, 26px)
          font-family: $font-family-regular
        .complete-detail
          .meeting-image
            opacity: 0.8
          .meeting-title
            color: #999


  .bottom
    padding-bottom: 40px


</style>
