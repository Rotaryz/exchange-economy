<template>
  <div class="course-detail">
    <navigation-bar title="课程详情"></navigation-bar>
    <div v-if="bannerArray.length" class="banner-box">
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
            <div class="b-item-wrapper">
              <img
                v-if="item.image_url"
                class="item-img"
                lazy-load
                mode="aspectFill"
                :src="item.image_url"
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

    <div class="course-msg">
      <div class="left-msg">
        <p class="title">{{courseDetail.name}}</p>
        <p class="describtion">{{courseDetail.description}}</p>
      </div>
      <button open-type="share" class="right-share">
        <img src="./icon-share_details@2x.png" class="share-icon" alt="" mode="aspectFill">
        <p class="text">推荐好友</p>
      </button>
    </div>

    <div class="padding"></div>

    <div class="course-content">
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
    </div>

    <div class="container">
      <div class="big-container" :style="'transform: translate(-' + tabIdx*50 + '%,0)'">
        <div class="container-item">
          <div class="list-container">
            <div class="list-item" v-for="(item, index) in courseList" :key="item.id">
              <p class="course-title">{{item.video_name}}</p>
              <div class="right-btn" @click="playVideo(item)">
                <img src="./icon-play@2x.png" alt="" class="play-icon">
                <span class="play-text">播放</span>
              </div>
            </div>
            <empty v-if="!courseList.length && loaded" :image="empty" :imgWidth="100" :paddingTop="100" tip="暂无课程"></empty>
          </div>
        </div>
        <div class="container-item">
          <div class="list-container">
            <img v-for="(item, index) in courseImage" :key="index" :src="item.image_url" alt="" mode="widthFix" class="course-image">
          </div>
        </div>
      </div>
    </div>
    <div class="footer-btn">
      <div class="btn" @click="goGuide">课程咨询</div>
    </div>
    <popup :showPopup.sync="showPopup" :video="video"></popup>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import Empty from '@components/empty/empty'
  import Popup from './popup/popup'
  import AppPromise from '@utils/app-promise'
  import storage from '@utils/storage'
  import { resolveQueryScene } from '@utils/common'

  const PAGE_NAME = 'COURSE_DETAIL'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar,
      Empty,
      Popup
    },
    data() {
      return {
        bannerArray: [],
        bannerIndex: 0,
        tabIdx: 0,
        courseDetail: {},
        tabList: [
          {txt: '课程内容', id: 0},
          {txt: '课程介绍', id: 1}
        ],
        courseList: [],
        courseImage: [],
        loaded: false,
        id: '',
        showPopup: false,
        video: '',
        shareId: ''
      }
    },
    onLoad(options) {
      AppPromise.getInstance().then(res => {
        if (options.scene) {
          // 小程序扫码进来
          console.log(options.scene, 'options.scene')
          let query = resolveQueryScene(options.scene)
          this.id = query.id
          this.shareId = query.shareId
        } else {
          // 普通参数进来
          this.id = options.id
          this.shareId = options.shareId
        }
        this.getCourseDetail()
      })
      if (this.shareId && this.shareId > 0) {
        storage('shareId', this.shareId)
        if (!storage('token')) return
        this.bindShareAction()
        return
      }
      if (storage('token') && storage('shareId')) {
        this.shareId = storage('shareId')
        this.bindShareAction()
      }
    },
    onShow() {
      this.addReadCount()
    },
    onShareAppMessage() {
      // 分享锁
      // const flag = Date.now()
      let url = ''
      let userId = storage('businessUserInfo').id
      if (userId) {
        url = `${this.$routes.main.COURSE_DETAIL}?id=${this.id}&shareId=${userId}`
      } else {
        url = `${this.$routes.main.COURSE_DETAIL}?id=${this.id}`
      }
      return {
        title: this.courseDetail.name,
        path: url,
        imageUrl: this.bannerArray[0].image_url,
        success: (res) => {
          // 转发成功
        },
        fail: (res) => {
          // 转发失败
        }
      }
    },
    methods: {
      getCourseDetail() {
        API.Course.getCourseDetail({
          data: {
            id: this.id
          }
        })
          .then(res => {
            this.loaded = true
            this.courseDetail = res.data
            this.bannerArray = res.data.banner_images
            this.courseList = res.data.banner_videos
            // this.courseImage = res.data.detail_images
          })
      },
      addReadCount() {
        API.Course.addReadCount({
          data: {
            course_id: this.id
          }
        })
      },
      handleSetBannerIndex(e) {
        this.bannerIndex = e.target.current
      },
      changeTab(idx) {
        this.tabIdx = idx * 1
        if (idx === 0) {
          this.courseList = this.courseDetail.banner_videos
          this.courseImage = []
        } else {
          this.courseList = []
          this.courseImage = this.courseDetail.detail_images
        }
      },
      playVideo(item) {
        this.showPopup = true
        this.video = item.video_url
      },
      goGuide() {
        let url = `${this.$routes.main.COURSE_GUIDE}?wechat=${this.courseDetail.wechat}`
        this.$checkIsTabPage(url) ? wx.switchTab({ url }) : wx.navigateTo({ url })
      },
      // 绑定关系
      bindShareAction() {
        let data = {
          share_manager_id: this.shareId,
          object_id: storage('userInfo').id,
          object_type: 1
        }
        API.Goods.bindShare({data}).then(res => {
          wx.removeStorageSync('shareId')
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  $bannerWidth = 375
  .course-detail
    width: 100%
    padding-bottom: 60px
    .banner-box
      position: relative
      .banner
        height: px2vw(211)
        .banner-item
          width: px2vw($bannerWidth)
          background: #ccc
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


    .course-msg
      padding: 20px 15px 25px
      display: flex
      align-items: center
      justify-content: space-between
      .title
        font-size: $font-size-18
        color: #1D2023
        font-family: $font-family-medium
        font-bold()
      .describtion
        margin-top: 12px
        font-family: $font-family-regular
        color: #999
        font-size: $font-size-15
      .right-share
        reset-button()
        flex: 0 0 auto
        width: 100px
        height: 76px
        padding: 5px 0 5px 40px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: space-between
      .share-icon
        width: 32px
        height: 32px
      .text
        font-size: $font-size-12
        color: #333
        font-family: $font-family-regular
        width: 50px
        text-align: center


    .padding
      height: 12px
      background: #F2F3F6
    .header-tab
      height: 56px
      background: $color-white
      position: relative
      border-bottom-1px($color-line)
      .tab-box
        width: 100%
        height: 56px
        display: flex
        .tab-item
          flex: 1
          height: 56px
          line-height: 56px
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
      .big-container
        width: 200vw
        height: 100%
        display: flex
        transition: all 0.3s
        .container-item
          width: 100vw
          height: 100%
          box-sizing: border-box
        .list-container
          padding: 15px 15px
          font-size: 0
        .course-image
          width: 100%
        .list-item
          margin-bottom: 10px
          border-radius: 2px
          border-1px($color-line, 2px)
          background: #F9F9F9
          height: 55px
          display: flex
          align-items: center
          justify-content: space-between
          padding: 0 15px
        .course-title
          font-size: $font-size-16
          color: $color-text-main
          font-family: $font-family-regular
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
        .right-btn
          display: flex
          align-items: center
        .play-icon
          width: 20px
          height: 20px
          margin-right: 5px
        .play-text
          color: #999
          font-size: $font-size-15
          font-family: $font-family-regular


    .footer-btn
      height: 60px
      padding: 10px 15px
      position: fixed
      bottom: 0
      left: 0
      width: 100vw
      box-sizing: border-box
      .btn
        height: 40px
        border-radius: 40px
        background: #FC3E3E
        text-align: center
        line-height: 40px
        color: $color-white
        font-size: $font-size-16
        font-family: $font-family-medium
        font-bold()

  .bottom
    padding-bottom: 20px

</style>
