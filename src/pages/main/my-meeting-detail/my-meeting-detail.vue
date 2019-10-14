<template>
  <div class="my-meeting-detail">
    <navigation-bar title="我的会议"></navigation-bar>
    <div class="meeting-detail">
      <img :src="meetingDetail.meeting_cover_image" alt="" class="meeting-image">
      <div class="meeting-right">
        <p class="meeting-title">{{meetingDetail.meeting_name}}</p>
        <p class="meeting-time">时间: {{meetingDetail.meeting_time}}</p>
        <p class="meeting-addr">地点: {{meetingDetail.meeting_description}}</p>
      </div>
    </div>

    <div class="padding"></div>

    <div class="ticket-list">
      <p class="ticket-title">
        参会凭证(<span class="ticket-number">{{ticketList.length}}</span>张可用)
      </p>
      <div v-for="(item, index) in ticketList" :key="index" class="ticket-item">
        <p class="ticket-msg">
          <img :src="item.usable ? usableTicket : unusableTicket" class="ticket-icon" mode="aspectFill">
          <span class="ticket-num" :class="{'ticket-grey': item.status}">{{item.code}}</span>
        </p>
        <p class="right-btn" :class="{'ticket-usable': !item.status}" @click="goCodePage(item)">{{ item.status ? '已使用' : '查看凭证'}}</p>
      </div>
    </div>

    <div class="padding"></div>

    <div class="msg">
      <p class="msg-title">报名信息</p>
      <p class="code"><span>报名编号: {{meetingMsg.order_sn}}</span><span class="copy" @click="copyNumber">复制</span></p>
      <p class="time">报名时间: {{meetingMsg.created_at}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'MY_MEETING_DETAIL'

  const USABLE_TICKET = require('./icon-piao1@2x.png')
  const UNUSABLE_TICKET = require('./icon-piao2@2x.png')

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        ticketList: [
          {usable: true},
          {usable: false}
        ],
        usableTicket: USABLE_TICKET,
        unusableTicket: UNUSABLE_TICKET,
        id: '',
        meetingDetail: {},
        meetingMsg: {}
      }
    },
    computed: {
      // ...Helpers.computed,
    },
    onLoad(options) {
      this.id = options.id || ''
    },
    onShow() {
      this.getMyMeetingDetail()
    },
    methods: {
      getMyMeetingDetail() {
        API.Meeting.getMyMeetingDetail({
          data: {
            id: this.id
          }
        })
          .then(res => {
            this.meetingMsg = res.data
            this.meetingDetail = res.data.detail[0]
            this.ticketList = res.data.coupon_list
          })
      },
      copyNumber() {
        wx.setClipboardData({
          data: this.meetingMsg.order_sn,
          success: () => {
          }
        })
      },
      goCodePage(item) {
        if (item.status) return
        // 保存核销码
        this.$store.dispatch('myMeeting/setCode', [item])
        let url = `${this.$routes.main.MEETING_CODE}`
        this.$checkIsTabPage(url) ? wx.switchTab({ url }) : wx.navigateTo({ url })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .my-meeting-detail
    width: 100%
    min-height: 100vh
    background: $color-background
    .meeting-detail
      padding: 0 15px
      height: 120px
      display: flex
      align-items: center
      justify-content: space-between
      background: $color-white
      .meeting-image
        background: #CCC
        width: 90px
        height: 90px
        border-radius: 4px
        flex: 0 0 auto
      .meeting-right
        padding: 2px 0 2px 10px
        flex: 1
        overflow: hidden
        box-sizing: border-box
      .meeting-title
        color: $color-text-main
        font-family: $font-family-medium
        font-bold()
        font-size: $font-size-15
        line-height: 26px
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
      .meeting-time,.meeting-addr
        margin-top: 12px
        color: #999
        font-family: $font-family-medium
        font-bold()
        line-height: 18px
        font-size: $font-size-14
      .meeting-addr
        margin-top: 0
        display: -webkit-box
        overflow: hidden
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
    .padding
      height: 10px
      background: #F2F3F6
    .ticket-list
      background: $color-white
      padding: 0 15px
      .ticket-title
        font-size: $font-size-16
        font-family: $font-family-medium
        font-bold()
        color: $color-text-main
        padding: 15px 0 6px
      .ticket-number
        color: #FC3E3E
      .ticket-item
        display: flex
        align-items: center
        justify-content: space-between
        border-bottom-1px($color-line)
        &:last-child:after
          border-bottom: 0
      .ticket-msg
        height: 54px
        display: flex
        align-items: center

      .ticket-icon
        width: 20px
        height: 17px
        margin-right: 10px
      .ticket-num
        color: $color-text-main
        font-size: $font-size-18
        font-family: $font-family-medium
        font-bold()
      .ticket-grey
        color: #999
        text-decoration: line-through
      .right-btn
        color: #999
        font-size: $font-size-14
        font-family: $font-family-regular
      .ticket-usable
        width: 76px
        height: 26px
        text-align: center
        line-height: 26px
        border-1px(#FC3E3E, 26px)
        border-radius: 26px
        color: #FC3E3E

    .msg
      padding: 15px 15px
      background: $color-white
      .msg-title
        font-size: $font-size-16
        font-family: $font-family-medium
        font-bold()
        color: $color-text-main
        margin-bottom: 8px
      .code,.time
        display: flex
        align-items: center
        justify-content: space-between
        color: $color-text-main
        font-size: $font-size-14
        font-family: $font-family-regular
        margin-top: 15px
      .copy
        width: 60px
        height: 22px
        border-1px(#D2D2D2, 22px)
        border-radius: 22px
        text-align: center
        line-height: 22px
        color: $color-text-main
        font-size: $font-size-14
        font-family: $font-family-regular


  .bottom
    padding-bottom: 40px
</style>
