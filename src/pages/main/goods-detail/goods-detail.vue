<template>
  <div class="goods-detail">
    <navigation-bar title="课程详情"></navigation-bar>
    <!--轮播图-->
    <section class="banner-box">
      <div class="header-swiper">
        <swiper v-if="goodsBanner && goodsBanner.length" :current="swiperIdx" class="banner" @change="bannerChange" interval="5000">
          <block v-if="hasVideo">
            <swiper-item class="banner-item">
              <video class="item-img" id="goodsVideo" :src="goodsMsg.banner_videos[0].video_url" :poster="videoPoster" :muted="true" :show-mute-btn="true" :show-center-play-btn="false" :enable-progress-gesture="false" @ended='videoEnd' @waiting="videoWaiting" @progress="videoLoaded"></video>
              <img v-if="goodsBanner[0].image_url" :class="!playBefore?'hide':''" :src="goodsBanner[0].image_url" mode="aspectFill" class="item-img video-img">
              <div class="play-btn" @click="playVideo && playVideo(false)">
                <img v-if="imageUrl&&!videoPlaying" :src="imageUrl + '/yx-image/2.6.5/icon-play_big@2x.png'" mode="aspectFill" class="play-btn-icon" @click.stop="playVideo && playVideo(true)">
              </div>
            </swiper-item>
          </block>
          <block v-for="(item, index) in goodsBanner" :key="index">
            <swiper-item class="banner-item">
              <img :src="item.image_url + '?' + goodsMsg.image_view" class="item-img item-img-one" mode="aspectFill">
              <img :src="item.image_url" class="item-img item-img-two" mode="aspectFill">
            </swiper-item>
          </block>
        </swiper>
        <article class="banner-number" v-if="goodsBannerLength !== 0">
          <div></div>
          <div v-if="hasVideo" class="banner-btn-con">
            <div :class="currentNum===0?'active':''" class="banner-number-box banner-btn" @click="changeCurrentNum(0)">
              <img v-if="imageUrl&&currentNum===0" :src="imageUrl + '/yx-image/2.6.5/icon-play_white@2x.png'" mode="aspectFill" class="banner-btn-icon">
              <img v-if="imageUrl&&currentNum!==0" :src="imageUrl + '/yx-image/2.6.5/icon-play_black@2x.png'" mode="aspectFill" class="banner-btn-icon">
              视频
            </div>
            <div :class="currentNum!==0?'active':''" class="banner-number-box banner-btn" @click="changeCurrentNum(1)">图片</div>
          </div>
          <div :style="{opacity: currentNum!==0?'1':'0'}" class="banner-number-box">{{currentNum}}/{{goodsBannerLength}}</div>
        </article>
      </div>
    </section>
    <!--商品信息-->
    <section class="goods-info">
      <div class="title has-title"><span class="title-label">报名中</span>{{goodsMsg.name}}</div>
      <div class="goods-text-box">
        <text class="goods-text">{{goodsMsg.description}}</text>
      </div>
      <div class="goods-share">
        <div class="goods-share-title">他们已经报名</div>
        <div class="goods-share-box">
          <div class="share-box-left">
            <img v-for="(item, index) in goodsMsg.appointment_numbers" :key="index" :src="item" alt="" class="share-box-img">
          </div>
          <div class="share-box-right">邀请好友报名</div>
        </div>
      </div>
    </section>
    <!--商品详情-->
    <section class="goods-detail-box">
      <div class="goods-detail-title">
        <div class="goods-detail-icon"></div>
        <div class="goods-detail-text">课程介绍</div>
      </div>
      <img v-for="(item, index) in goodsMsg.detail_images" v-if="item.image_url" :src="item.image_url" lazy-load="true" class="detail-img" mode="widthFix" :key="index">
    </section>
    <div class="fixed-btn">
      <div class="fixed-btn-phone">
        <img src="./icon-tel@2x.png" alt="" class="btn-phone-img">
        <div class="btn-phone-text">打电话</div>
      </div>
      <div class="fixed-btn-btn">马上进群</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'GOODS_DETAIL'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        goodsMsg: {},
        swiperIdx: 0,
        videoPlaying: false,
        currentNum: 1
      }
    },
    computed: {
      goodsBanner() {
        return this.goodsMsg.banner_images || []
      },
      goodsBannerLength() {
        return this.goodsBanner.length || 0
      },
      hasVideo() {
        return (this.goodsMsg.banner_videos && this.goodsMsg.banner_videos[0] && this.goodsMsg.banner_videos[0].video_url) || false
      }
      // ...Helpers.computed,
    },
    onShow() {
      this.goodsMsg = {
        'id': 4,
        'name': '如何布局短视频矩阵30天吸粉',
        'description': '开课时间：2019.09.22 9:00\n开课地点：微信群\n报名人数：390',
        'wechat': 'jason',
        'banner_images': [
          {
            'id': 5,
            'image_id': 1,
            'image_url': 'https://exchange-platform-1254297111.picgz.myqcloud.com/dev/2019/08/29/1567070867535-109527.png?imageMogr2/thumbnail/750x750'
          },
          {
            'id': 5,
            'image_id': 1,
            'image_url': 'https://exchange-platform-1254297111.picgz.myqcloud.com/dev/2019/08/29/1567070867535-109527.png?imageMogr2/thumbnail/750x750'
          }
        ],
        'detail_images': [
          {
            'id': 6,
            'image_id': 1,
            'image_url': 'https://exchange-platform-1254297111.picgz.myqcloud.com/dev/2019/08/29/1567070867535-109527.png?imageMogr2/thumbnail/750x750'
          },
          {
            'id': 6,
            'image_id': 1,
            'image_url': 'https://exchange-platform-1254297111.picgz.myqcloud.com/dev/2019/08/29/1567070867535-109527.png?imageMogr2/thumbnail/750x750'
          }
        ],
        'cover_image': '',
        'cover_image_id': 5,
        'banner_videos': [
          {
            'id': 3,
            'video_id': 1,
            'video_cover_image': '',
            'video_url': ''
          }
        ],
        'mobile': '13800138000',
        'appointment_numbers': [
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3uPoSTpdozKgSGLicLQQnrTHvgQjrefo5ZDvKicVSf3IkMnibnDWTpVT5SpSk0ZN43oSLEgsM54szg/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3uPoSTpdozKgSGLicLQQnrTHvgQjrefo5ZDvKicVSf3IkMnibnDWTpVT5SpSk0ZN43oSLEgsM54szg/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3uPoSTpdozKgSGLicLQQnrTHvgQjrefo5ZDvKicVSf3IkMnibnDWTpVT5SpSk0ZN43oSLEgsM54szg/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3uPoSTpdozKgSGLicLQQnrTHvgQjrefo5ZDvKicVSf3IkMnibnDWTpVT5SpSk0ZN43oSLEgsM54szg/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3uPoSTpdozKgSGLicLQQnrTHvgQjrefo5ZDvKicVSf3IkMnibnDWTpVT5SpSk0ZN43oSLEgsM54szg/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3uPoSTpdozKgSGLicLQQnrTHvgQjrefo5ZDvKicVSf3IkMnibnDWTpVT5SpSk0ZN43oSLEgsM54szg/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3uPoSTpdozKgSGLicLQQnrTHvgQjrefo5ZDvKicVSf3IkMnibnDWTpVT5SpSk0ZN43oSLEgsM54szg/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3uPoSTpdozKgSGLicLQQnrTHvgQjrefo5ZDvKicVSf3IkMnibnDWTpVT5SpSk0ZN43oSLEgsM54szg/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3uPoSTpdozKgSGLicLQQnrTHvgQjrefo5ZDvKicVSf3IkMnibnDWTpVT5SpSk0ZN43oSLEgsM54szg/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3uPoSTpdozKgSGLicLQQnrTHvgQjrefo5ZDvKicVSf3IkMnibnDWTpVT5SpSk0ZN43oSLEgsM54szg/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3uPoSTpdozKgSGLicLQQnrTHvgQjrefo5ZDvKicVSf3IkMnibnDWTpVT5SpSk0ZN43oSLEgsM54szg/132',
          'https://wx.qlogo.cn/mmopen/vi_32/g8icwibEDlTklBbfwbH1Qa7Zrj0kbKWibahico3gQr1lia4Yia8MZFAUhUiaUviblTNqsa6sUdiaFxzNWfhhcLMCTuTMicPw/132'
        ]
      }
      // this._getCourseInfo()
    },
    methods: {
      // ...Helpers.methods,
      changeCurrentNum() {},
      _getCourseInfo() {
        API.Course.getCourseInfo({data: {id: 13}}).then(res => {
          this.goodsMsg = res.data
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .goods-detail
    min-height: 100vh
    background: $color-background
    overflow-x: hidden
    padding-bottom: 60px
    box-sizing: border-box
  .goods-info
    padding: 24px 15px 15px
    background: $color-white
    margin-bottom: 12px
    .title
      width: 100%
      font-family: $font-family-medium
      color: $color-text-main
      font-size: $font-size-18
      min-height: 20px
      line-height: $font-size-20
      no-wrap-plus()
    .has-title
      width: 100%
      no-wrap-plus()
      margin-bottom: 20px
    .title-label
      font-size: $font-size-12
      font-family: $font-family-medium
      display: inline-block
      border-radius: 9.5px
      width: 48px
      height: 17px
      text-align: center
      line-height: 17px
      color: $color-white
      background: $color-main
      margin-right: 5px
      position: relative
      top: -2px
    .goods-text-box
      border-top-1px($color-line)
      padding: 15px 0
      .goods-text
        font-family: $font-family-regular
        color: #333
        font-size: $font-size-14
    .goods-share
      background: $color-background-module
      border-radius: 2px
      padding: 10px
      box-sizing: border-box
      .goods-share-title
        font-family: $font-family-regular
        color: $color-text-sub
        font-size: $font-size-12
        margin-bottom: 6px
      .goods-share-box
        layout(row)
        align-items: center
        justify-content: space-between
        .share-box-left
          layout(row)
          align-items: center
          .share-box-img
            width: 24px
            height: 24px
            border-radius: 50%
            margin-right: 5px
            display: block
        .share-box-right
          font-family: $font-family-regular
          color: $color-white
          font-size: $font-size-14
          width: 104px
          height: 26px
          line-height: 26px
          text-align: center
          background: $color-main
          border-radius: 22.5px
  .goods-detail-box
    background: $color-white
    padding: 0 15px
    box-sizing: border-box
    .goods-detail-title
      padding: 15px 0
      layout(row)
      align-items: center
      .goods-detail-icon
        width: 3px
        height: 14px
        background: $color-main
        margin-right: 5px
      .goods-detail-text
        font-family: $font-family-medium
        color: $color-text-main
        font-size: $font-size-16
        line-height: $font-size-16
    .detail-img
      display: block
      width: 100%
      height: auto
  .fixed-btn
    position: fixed
    left: 0
    bottom: 0
    width: 100vw
    height: 60px
    layout(row)
    align-items: center
    background: $color-white
    padding-right: 15px
    box-sizing: border-box
    .fixed-btn-phone
      width: 90px
      .btn-phone-img
        width: 22px
        height: @width
        display: block
        margin: 0 auto 4px
      .btn-phone-text
        font-family: $font-family-regular
        color: $color-text-main
        font-size: $font-size-12
        text-align: center
    .fixed-btn-btn
      flex: 1
      background: $color-main
      text-align: center
      height: 40px
      line-height: 40px
      font-family: $font-family-medium
      color: $color-white
      font-size: $font-size-16
      border-radius: 22.5px
  // banner图
  .banner-box
    position :relative
    .header-title-wrapper
      position: absolute
      left: 12px
      right :@left
      bottom: 0
      transition: opacity 0.3s
  .header-swiper
    width: 100vw
    height: 100vw
    position: relative
    .banner
      width: 100vw
      height: 100vw
      .banner-item
        width: 100%
        height: 100%
        position: relative
        .item-img
          width: 100%
          height: 100%
          position: absolute
          left: 0
          top: 0
        .video-img
          transition: all 0.3s
          &.hide
            opacity: 0
            z-index: -1
        .play-btn
          width: 100%
          height: 70%
          position: absolute
          left: 0
          top: 15%
          z-index: 9
          layout()
          justify-content: center
          align-items: center
          .play-btn-icon
            width: 50px
            height: @width
        .item-img-one
          z-index: 1
        .item-img-two
          z-index: 2
        .play
          all-center()
          height: 63px
          width: 63px
    .banner-number
      box-sizing: border-box
      width: 100%
      padding: 0 12px
      position: absolute
      bottom: px-change-vw(60.5)
      left: 0
      layout(row)
      align-items: center
      justify-content: space-between
      .banner-number-box
        display: inline-block
        font-size: $font-size-11
        background: rgba(17,17,17,0.2)
        color: $color-white
        box-sizing: border-box
        padding: 2px 8px
        border-radius: 20px
        opacity: .75
        transition: all 0.3s
        &.banner-btn
          min-width: 48px
          padding: 3px 8px
          margin: 0 5px
          background: $color-white
          font-size: $font-size-10
          color: $color-text-main
          font-family: $font-family-regular
          text-align: center
          opacity: .75
          &.active
            background: linear-gradient(90deg, #FD4C46 0%, #FB6C21 73%)
            color: $color-white
            opacity: 1
          .banner-btn-icon
            width: 7px
            height: 7.5px

</style>
