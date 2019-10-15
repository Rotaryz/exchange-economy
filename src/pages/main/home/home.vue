<template>
  <div class="home">
    <navigation-bar headStyle="background: #FFFFFF" title="5G新营销" :showArrow="false" titleColor="#000"></navigation-bar>
    <div class="location-city">
      <img src="./icon-current_city@2x.png" alt="" class="location-img">
      <div class="location-text">当前城市: 广州市</div>
    </div>
    <div v-for="(cms, cmsIndex) in CMS" :key="cms.id" class="cms">
      <!-- 轮播图 -->
      <div v-if="cms.code === 'banner' && bannerArray.length" class="banner-box">
        <swiper
          class="banner"
          autoplay
          interval="5000"
          display-multiple-items="1"
          previous-margin="0px"
          next-margin="0px"
          circular
          :current="bannerIndex"
          @change="handleSetBannerIndex">
          <block
            v-for="(item,index) in bannerArray"
            :key="index"
          >
            <swiper-item
              class="banner-item"
            >
              <div class="b-item-wrapper"
                   @click="handleBannerJump(item)"
              >
                <img
                  v-if="item.detail.image_url"
                  class="item-img"
                  lazy-load
                  mode="aspectFill"
                  :src="item.detail.image_url"
                >
              </div>
            </swiper-item>
          </block>
        </swiper>
        <div class="dot-wrapper">
          <p class="dot-item">{{bannerIndex+1}}</p>
          <p class="dot-item">/</p>
          <p class="dot-item">{{bannerArray.length}}</p>
        </div>
      </div>
    </div>
    <!-- 最新会议 -->
    <div class="goods-box">
      <div class="new-goods-title">
        <div class="new-goods-left">
          <img src="./icon-news@2x.png" alt="" class="new-goods-img">
          <div class="new-goods-text">最新会议</div>
        </div>
        <div class="new-goods-right" @click="jumpAllMeeting">
          <div class="new-right-text">全部</div>
          <img src="/static/images/icon-right_arrow.png" alt="" class="new-right-img">
        </div>
      </div>
      <ul class="goods-list" v-if="goodsList.length && totalPage > 0">
        <li class="goods-item-wrap" v-for="item in goodsList" :key="item.id" @click="goodsJump(item)">
          <image :src="item.goods_cover_image" lazy-load mode="aspectFill" alt="" class="goods-item-top">
            <img v-if="item.video.id" src="./icon-play_big@2x.png" lazy-load mode="widthFix" alt="" class="goods-play-auto">
          </image>
          <div class="goods-item-content">
            <div class="goods-item-title">
              <span class="goods-label">报名中</span><p class="goods-title-text">{{item.name}}</p>
            </div>
            <div v-if="item.meeting_time || item.description" class="goods-item-content-box">
              <div v-if="item.meeting_time" class="describe-goods-time">时间：{{item.meeting_time}}</div>
              <div v-if="item.description" class="describe-goods-time">地点：{{item.description}}</div>
            </div>
          </div>
        </li>
      </ul>
      <empty v-else :imgWidth="109" :paddingTop="2.4" tip="会议排期中，敬请期待"></empty>
    </div>
    <!-- 热门课程 -->
    <div class="course-box">
      <div class="new-goods-title">
        <div class="new-goods-left">
          <img src="./icon-hot@2x.png" alt="" class="new-goods-img">
          <div class="new-goods-text">热门课程</div>
        </div>
        <div class="new-goods-right"@click="jumpAllCourse">
          <div class="new-right-text">全部</div>
          <img src="/static/images/icon-right_arrow.png" alt="" class="new-right-img">
        </div>
      </div>
      <ul class="course-list" v-if="courseList.length">
        <li class="course-item" v-for="item in courseList" :key="item.id" @click="courseJump(item)">
          <image class="course-img" :src="item.cover_image"></image>
          <div class="course-info">
            <div class="course-info-top">{{item.name}}</div>
            <div class="course-info-bottom">{{item.read_count}}人已观看</div>
          </div>
        </li>
      </ul>
      <empty v-else :imgWidth="109" :paddingTop="2.4" tip="课程排期中，敬请期待"></empty>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  // import storage from '@utils/storage'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import Empty from '@components/empty/empty'

  const PAGE_NAME = 'HOME'

  function formatArray(arr = [], codeName) {
    const list = arr.find(val => val.code === codeName) || {}
    return list.children || []
  }

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar,
      Empty
    },
    data() {
      this.isFirstLoad = true
      return {
        bannerIndex: 0,
        CMS: [],
        params: {
          limit: 1,
          page: 1
        },
        courseParams: {
          limit: 10,
          page: 1
        },
        loading: false,
        totalPage: 0,
        goodsList: [],
        courseList: []
      }
    },
    computed: {
      // banner图
      bannerArray() {
        return formatArray(this.CMS, 'banner')
      }
    },
    async onLoad() {},
    onShow() {
      this.pageDetail()
      this.getCourseList()
    },
    // 下拉加载
    onReachBottom() {
      if (this.params.page + 1 > this.totalPage || this.loading) return
      this.params.page++
      // this.getMeetingList()
    },
    methods: {
      handleSetBannerIndex(e) {
        this.bannerIndex = e.target.current
      },
      // CMS模块
      pageDetail() {
        const code = 'market_index'
        const data = { code }
        API.Goods.pageDetail({ data, loading: this.isFirstLoad })
          .then((res) => {
            if (res.data.code === code) {
              this.CMS = res.data.children
              this.CMS.forEach((item) => {
                if (item.code === 'latest_meeting') {
                  this.params.page = 1
                  this.getMeetingList()
                }
              })
            }
          })
        this.isFirstLoad = false
      },
      // 会议列表
      getMeetingList() {
        this.loading = true
        API.Goods.meetingList({ data: this.params, loading: false }).then(res => {
          if (this.params.page === 1) this.goodsList = []
          this.goodsList = [...this.goodsList, ...res.data]
          this.totalPage = res.meta.last_page
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      // 课程列表
      getCourseList() {
        API.Goods.getCourseList({ data: this.courseParams, loading: false }).then(res => {
          if (this.courseParams.page === 1) this.courseList = []
          this.courseList = [...this.courseList, ...res.data]
        }).catch(() => {
        })
      },
      handleBannerJump(item) {
        let url = ''
        switch (item.style) {
          case 3004:// out-html外链
            const link = item.detail.url.split('?')
            const type = /webview/i.test(link[1]) ? '&webview=true' : ''
            url = `${this.$routes.main.OUT_HTML}?url=${link[0]}` + type
            break
          case 3005:// 小程序链接
            url = `${item.detail.url}`
            break
          case 3013:// 商品
            url = `${this.$routes.main.GOODS_DETAIL}?id=${item.detail.object_id}`
            break
          default:
            break
        }
        if (url) {
          this.$checkIsTabPage(url) ? wx.switchTab({ url }) : wx.navigateTo({ url })
        }
      },
      goodsJump(item) {
        let url = `${this.$routes.main.GOODS_DETAIL}?id=${item.id}`
        this.$checkIsTabPage(url) ? wx.switchTab({ url }) : wx.navigateTo({ url })
      },
      courseJump(item) {
        let url = `${this.$routes.main.COURSE_DETAIL}?id=${item.id}`
        this.$checkIsTabPage(url) ? wx.switchTab({ url }) : wx.navigateTo({ url })
      },
      jumpAllMeeting() {
        let url = `${this.$routes.main.MEETING_LIST}`
        wx.navigateTo({url})
      },
      jumpAllCourse() {
        let url = `${this.$routes.main.COURSE_LIST}`
        wx.navigateTo({url})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $bannerWidth = 375
  @import "~@design"
  .home
    min-height: 100vh
    background: $color-white
    overflow-x: hidden
    box-sizing: border-box
  .location-city
    padding: 13.5px 15px
    box-sizing: border-box
    layout(row)
    align-items: center
    .location-img
      display: block
      width: 14px
      height: 16.5px
      margin-right: 5px
    .location-text
      font-family: $font-family-regular
      color: #888888
      font-size: $font-size-16
  .banner-box
    position: relative
    .banner
      height: px2vw(211)
      .banner-item
        width: px2vw($bannerWidth)
        height: 100%
        margin: 0 atuo
        .b-item-wrapper
          margin: 0 auto
          position: relative
          width: px2vw($bannerWidth)
          height: px2vw(211)
          .item-img
            background: $image-color
            width: px2vw($bannerWidth)
            height: px2vw(211)
    .dot-wrapper
      position: absolute
      right: px2vw(12)
      bottom: px2vw(12)
      display: flex
      width: 35px
      height: 17.5px
      background-image url("./pic-switch.png")
      background-size: 100% 100%
      layout(row, block, nowrap)
      align-items: center
      justify-content space-around
      box-sizing: border-box
      padding: 0 3px
      .dot-item
        font-family: $font-family-regular
        font-size: $font-size-10;
        color: #F1F5EB;
        line-height: 1

  .goods-box
    padding: 0 15px
    box-sizing: border-box
    .goods-item-wrap
      border-radius: 4px
      overflow: hidden
      border-1px($color-line, 4px)
      box-shadow: 0 2px 6px 0 rgba(0,0,0,0.06)
      .goods-item-top
        width: 100%
        display: block
        position: relative
        height: px2vw(194)
      .goods-play-auto
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto
        width: 40px
        height: @width
        display: block
      .goods-item-content
        background: $color-white
        padding: 13px 10px 13px 13px
        box-sizing: border-box
        .goods-item-title
          font-bold()
          color: $color-text-main
          font-size: $font-size-16
          layout(row)
          align-items: center
          .goods-label
            width: 48px
            height: 17px
            text-align: center
            line-height: 18px
            border-radius: 9px
            margin-right: 5px
            color: $color-white
            background: $color-main
            display: inline-block
            font-size: $font-size-12
          .goods-title-text
            flex: 1
            no-wrap()

        .goods-item-content-box
          margin-top: 10px
        .describe-goods-time
          font-bold()
          color: #999
          font-size: $font-size-14
          word-wrap:break-word
        .goods-time-bottom
          margin-bottom: 4.5px
  .new-goods-title
    layout(row)
    align-items: center
    padding: 29px 0 15px
    justify-content: space-between
    .new-goods-left
      layout(row)
      align-items: center
    .new-goods-right
      layout(row)
      align-items: center
      .new-right-text
        font-family: $font-family-regular
        color: #999
        font-size: $font-size-14
      .new-right-img
        width: 14px
        height: @width
        display: block
    .new-goods-img
      display: block
      width: 19px
      height: @width
      margin-right: 5px
    .new-goods-text
      font-bold()
      color: $color-text-main
      font-size: $font-size-16
  .course-box
    padding: 0 15px
    box-sizing: border-box
    .course-item
      layout(row)
      align-items: center
      margin-bottom: 20px
      .course-img
        width: 160px
        height: 90px
        display: block
        border-radius: 4px
        margin-right: 10px
      .course-info
        height: 90px
        flex: 1
        layout()
        justify-content: space-between
        .course-info-top
          font-bold()
          color: $color-text-main
          font-size: $font-size-15
          no-wrap-plus()
        .course-info-bottom
          font-family: $font-family-regular
          color: $color-999
          font-size: $font-size-14
</style>
